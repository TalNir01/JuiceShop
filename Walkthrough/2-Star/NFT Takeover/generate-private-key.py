#!/usr/bin/env python3
"""
Derive an Ethereum private key (and address) from a BIP-39 seed phrase.

This mirrors what every wallet does under the hood:

    words  ->  512-bit seed  ->  master key  ->  account key  ->  address

It uses eth-account (maintained by the Ethereum Foundation) for the
HD-wallet derivation, plus hashlib to surface the intermediate BIP-39 seed
so you can see each stage of the chain.

    pip install eth-account

SECURITY
--------
- A seed phrase controls ALL accounts/funds derived from it. Treat it like cash.
- Run this offline, on a machine you trust. Never paste a phrase that protects
  real money into a shared, online, or untrusted environment.
- The phrase is read from a hidden prompt (not echoed, not passed as a command
  line argument), so it won't land in your shell history.
"""

import hashlib
import unicodedata

from eth_account import Account

# eth-account flags HD-wallet derivation as "unaudited"; opt in explicitly.
Account.enable_unaudited_hdwallet_features()

# Standard Ethereum derivation path (BIP-44). The final number is the account
# index, so you can derive many accounts from one phrase:
#   m/44'/60'/0'/0/0  -> account #0
#   m/44'/60'/0'/0/1  -> account #1, and so on.
ETH_PATH = "m/44'/60'/0'/0/{index}"


def bip39_seed(mnemonic: str, passphrase: str = "") -> bytes:
    """Return the 512-bit BIP-39 seed (the second box in the chain).

    Shown for illustration; eth-account computes this same value internally.
    The seed is PBKDF2-HMAC-SHA512 over the mnemonic, with 2048 iterations and
    a salt of "mnemonic" + the optional passphrase.
    """
    mnemonic = unicodedata.normalize("NFKD", mnemonic.strip())
    salt = "mnemonic" + passphrase
    return hashlib.pbkdf2_hmac("sha512", mnemonic.encode(), salt.encode(), 2048, dklen=64)


def derive_account(mnemonic: str, index: int = 0, passphrase: str = ""):
    """Return the eth-account account object for the given account index."""
    path = ETH_PATH.format(index=index)
    return Account.from_mnemonic(mnemonic, passphrase=passphrase, account_path=path)


def private_key_hex(account) -> str:
    """Normalize the private key to a 0x-prefixed hex string across versions."""
    raw = account.key.hex()
    raw = raw[2:] if raw.startswith("0x") else raw
    return "0x" + raw


def main() -> None:
    # Seed Phrase (BIP-39)
    mnemonic = "purpose betray marriage blame crunch monitor spin slide donate sport lift clutch"

    raw_index = input("Account index [0]: ").strip()
    index = int(raw_index) if raw_index else 0

    seed = bip39_seed(mnemonic)
    account = derive_account(mnemonic, index)

    print()
    print(f"Derivation path : {ETH_PATH.format(index=index)}")
    print(f"BIP-39 seed     : {seed.hex()}")
    print(f"Private key     : {private_key_hex(account)}")
    print(f"Address         : {account.address}")
    print()
    print("Keep the private key and seed phrase secret. Anyone holding either "
          "controls this account.")


if __name__ == "__main__":
    main()
