// Put specific IDs you want to check here.
export const LUCHADOR_IDS = []

// Put number of attributes you want to check. ( 0 to 7)
export const LUCHADOR_ATTRIBUTES = [0,6,7]

export const PROVIDER_URL: string = 'https://polygon-mainnet.g.alchemy.com/v2/-ADD-KEY-HERE'

// If you want the price in USD
// https://es.beincrypto.com/convertir/lucha-to-usd?amount=1
export const TOKEN_PRICE_IN_USD = 0.03192477;

// Fetch how many lucha token the Luchador is generating each day.
// Double the time of execution.
export const FETCH_RATE: boolean = true;

export const OUTPUT_DIRECTORY = 'data/output';

export const TOKEN_NAME = 'Lucha';
export const CONTRACT: string = '0xE8B73c064BD3B8c5DB438118543ACd6AAb18F108'
export const LUCHA_ABI = [
    {
        "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
        "name": "pendingYield",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
        "name": "yieldRate",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];