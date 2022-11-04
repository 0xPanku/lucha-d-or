# Lucha d'or

---


## Install

```sh
git clone git@github.com:0xPanku/lucha-d-or.git
cd lucha-d-or
yarn
```


## Script 1 : Fetch the metadata

### Usage

> npx ts-node src/fetch.ts

### What is does 

It will retrieve the metadata of each Luchador and save it under data/luchadores to the json format.

It will also create split files, that are simple list of Luchador ID grouped by number of attributes.


### Comments

As there is 10000 Luchadores the script may take a long time to run (30 min or more). In order to save time, you can find the split files under data/split

The metadata are retrieve from the address provided by the smart contract. You can find it here under the base URI section.

https://etherscan.io/address/0x8b4616926705Fb61E9C4eeAc07cd946a5D4b0760#readContract

You could easily use this script with any NFT collection by removing all the code about the attributes.

<br>

---


## Script 2 : Find the Luchad'or

### Configuration

### Usage

> WIP

### What is does

### Comments