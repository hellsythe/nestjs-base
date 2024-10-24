import { promises } from "fs";
import { BaseScript } from "./base-script.js";

export default class Dockerize extends BaseScript {
    async init() {

        if(this.settings.dockerizeNode || this.settings.dockerizeDb){
            await promises.cp(this.path + '/stubs/devcontainer/docker-compose.yml', process.cwd() + '/docker-compose.yml');
        }

        if (this.settings.dockerizeNode) {
            const nodeDocker = await this.loadContenFromFile(this.path + 'stubs/devcontainer/docker-compose-node.yml');
            await this.remplazeEntityInFile('docker-compose.yml', '{{node}}', nodeDocker);
        }

        if(this.settings.dockerizeNode){
            await this.dockerizeDb();
        }

        await this.remplazeEntityInFile('docker-compose.yml', '{{node}}', '');
        await this.remplazeEntityInFile('docker-compose.yml', '{{mongo}}', '');
    }

    async dockerizeDb(){
        switch (this.settings.db) {
            case 'mongo':
                const mongoDocker = await this.loadContenFromFile(this.path + 'stubs/devcontainer/docker-compose-mongo.yml');
                await this.remplazeEntityInFile('docker-compose.yml', '{{mongo}}', mongoDocker);
                break;

        }
    }
}