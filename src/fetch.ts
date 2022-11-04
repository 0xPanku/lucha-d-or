import axios from 'axios';
import fs from 'fs';

const BASE_URL: string = 'https://storageapi.fleek.co/luchadores-io-team-bucket/';
const BASE_PATH: string = process.cwd();
const BUILD_PATH: string = `${BASE_PATH}/data`;

const axios_config = {
    headers: {
        Accept: 'application/json',
    },
}

// Group the Luchadores by number of attributes.
let attributes: number[][] = [];

// tracks the IDs of failed axios requests.
let at_the_anti_doping_test: number[] = [];

async function main() {

    console.log("Bot - At your service master !");
    console.log('BASE_URL is : ' + BASE_URL);
    console.log('Output directory is  : ' + BUILD_PATH);

    buildSetup();
    await fetchLuchadores();
    processSplitCategory();

    console.log("The job is done master !");
}

/*
* Creation of the output directory where the luchadores.json files are saved.
*/
function buildSetup() {
    if (fs.existsSync(BUILD_PATH)) {
        fs.rmdirSync(BUILD_PATH, {recursive: true});
    }
    fs.mkdirSync(BUILD_PATH);
    fs.mkdirSync(`${BUILD_PATH}/luchadores`);
    fs.mkdirSync(`${BUILD_PATH}/split`);
}

/*
* Fetch the metadata for each Luchadores and save it into a json file.
*/
async function fetchLuchadores() {

    for (let i = 1; i < 10000; i++) {

        const url = BASE_URL + i + '.json';

        try {

            // Fetch data
            const {data, status} = await axios.get(url, axios_config);

            // If success 
            if (status == 200) {

                // Save data
                fs.writeFileSync(`${BUILD_PATH}/luchadores/${i}.json`, JSON.stringify(data, null, 4));

                // Get the number of attributes
                const attributesRow = data.attributes.filter((obj: { trait_type: string; }) => {
                    return obj.trait_type === 'Attributes';
                });

                const nbAttributes = parseInt(attributesRow[0].value);

                // Registration of the Luchador in the right category
                if (attributes[nbAttributes]) {
                    attributes[nbAttributes].push(i);
                } else {
                    attributes[nbAttributes] = [i];
                }
                console.log(status, ' | ' + nbAttributes + ' | ' + url);
            } else {
                console.log(status, ' | ERROR | ' + url);
                at_the_anti_doping_test.push(i);
            }
        } catch (error) {
            console.log('error skip item : ', i);
            at_the_anti_doping_test.push(i);
        }
    }
}

/*
* Create the split files
*/
function processSplitCategory() {
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i]) {
            console.log(`${BUILD_PATH}/split/${i}_attributes.json`);
            fs.writeFileSync(`${BUILD_PATH}/split/${i}_attributes.json`, JSON.stringify(attributes[i]));
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});