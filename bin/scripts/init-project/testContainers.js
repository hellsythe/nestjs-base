import { BaseScript } from './../base-script.js'

export default class TestContainers extends BaseScript {
    async init() {
        if(this.settings.testContainers){
            await this.remplazeEntityInFile('.env', 'TESTCONTAINERS=false', 'TESTCONTAINERS=true');
        }
    }
}