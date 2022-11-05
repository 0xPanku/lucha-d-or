# Lucha d'or

---

<img src="./luchad-or.svg" width="256" style="display:block;margin-left: auto;margin-right: auto; width: 50%;" alt="el luchador de oro">

## What the heck ?

This package contains two scripts that allow to :
- Fetch the metadata of [Luchadores](https://luchadores.io/) NFT collection.
- Calculate the number of yield tokens available for a given list of luchadores NFT.


## Install

To run this script you need [Node.js](https://nodejs.org/) and a package manager [yarn](https://yarnpkg.com/) or npm

```sh
git clone git@github.com:0xPanku/lucha-d-or.git
cd lucha-d-or
yarn
```


## Script 1 : Fetch the metadata

### Usage

> npx ts-node src/fetch.ts

### What does it do?

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

> npx ts-node src/app.ts

### Configuration

Before to run the script you need to adapt the parameters in src/config.ts


**1. Add your provider URL**

you can get one on [alchemy.com](https://www.alchemy.com/)

```js
export const PROVIDER_URL: string = 'https://polygon-mainnet.g.alchemy.com/v2/XXXXX'
```

**2. Add the ids of the Luchador you want to scan**

There are two ways to do it. You can add specific IDs into the LUCHADOR_IDS array.
```js
export const LUCHADOR_IDS = []
```

Or you can specify a number of attributes. For example, this will check all Luchadores with 0, 6 and 7 attributes.

```js
export const LUCHADOR_ATTRIBUTES = [0,6,7]
```

// Put number of attributes you want to check. ( 0 to 7)
export const LUCHADOR_ATTRIBUTES = [0,6,7]

**3. adjust the price of the lucha token**

```js
export const TOKEN_PRICE_IN_USD = 0.03192477;
```


### What does it do?

This script will query the smart contract to find out how many lucha tokens are claimable for a given list of Luchadores NFT.

The results will be available in a json file under data/output.

The result is sorted in descending order.


### Comments

You can speed up the result by setting FETCH_RATE at false.
This will result in half the number of requests but you won't get the yield rate.

```js
export const FETCH_RATE: boolean = false;
```