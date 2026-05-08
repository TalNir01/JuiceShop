# Solution

## Instruction
First you should find out how the languages are technically changed in the user interface.
Topic: `Brute-Force`

## Solution

It seems that the website uses a configuration `json` for loading the `langauages` and then try `GET /assets/i18n/cs_CZ.json` so let find an language that aren't supposed to be here.


View `osint` i have found mentiondes to a `Klingon` language which the doc site mentionded was a link to `tlh_AA`. So i trie `/assets/i18n/tlh_AA.json` and received a large json with random conent 