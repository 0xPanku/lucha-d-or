import {ethers} from "ethers";
import fs from 'fs';
import {
    CONTRACT,
    FETCH_RATE,
    LUCHA_ABI, LUCHADOR_ATTRIBUTES, LUCHADOR_IDS,
    OUTPUT_DIRECTORY,
    PROVIDER_URL,
    TOKEN_NAME,
    TOKEN_PRICE_IN_USD
} from './config';
import {getOutputFileName} from "./helpers";

const OUTPUT_PATH: string = process.cwd() + '/' + OUTPUT_DIRECTORY;
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);

type Luchador = {
    id: number;
    usdValue: number;
    yieldRate?: number;
    pendingYield: number;
};

async function main() {

    console.log("Bot - At your service master !");
    console.log('CONTRACT ADDRESS IS : ' + CONTRACT);
    console.log(`> 1 ${TOKEN_NAME} = ${TOKEN_PRICE_IN_USD} $`);

    if (!fs.existsSync(OUTPUT_PATH)) {
        fs.mkdirSync(OUTPUT_PATH);
    }

    const contract = new ethers.Contract(CONTRACT, LUCHA_ABI, provider);
    const luchadores: Luchador[] = [];

    let items = LUCHADOR_IDS;

    for (const fileID of LUCHADOR_ATTRIBUTES) {
        let filePath = process.cwd() + '/data/split/' + fileID + '_attributes.json';
        if (fs.existsSync(filePath)) {
            let fileBuffer = fs.readFileSync(filePath, "utf8");
            items = items.concat(JSON.parse(fileBuffer))
        }
    }

    for (const item of items) {
        try {

            const balance_raw = await contract.pendingYield(item);
            const balance = parseFloat(ethers.utils.formatEther(balance_raw));

            const luchador: Luchador = {
                id: item,
                usdValue: balance * TOKEN_PRICE_IN_USD,
                pendingYield: balance,
            };

            if (FETCH_RATE) {
                const rate_raw = await contract.yieldRate(item);
                luchador.yieldRate = parseInt(ethers.utils.formatEther(rate_raw));
            }

            console.log(item + " --> " + balance + " | " + luchador.usdValue + "$");
            luchadores.push(luchador);

        } catch (error) {
            console.log(item + " --> Error : " + error);
        }
    }

    //sort
    luchadores.sort((a, b) => b.usdValue - a.usdValue);

    // Save data
    fs.writeFileSync(`${OUTPUT_PATH}/${getOutputFileName()}.json`, JSON.stringify(luchadores, null, 4));

    console.log("The job is done master !");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


