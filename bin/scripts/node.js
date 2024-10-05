import { promises } from "fs";
import { select } from '@inquirer/prompts';

export default class NodeContainer {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        if(this.settings.devcontainer){
            return;
        }
        await this.question();
        await this.CopyFiles();
    }

    async question(){
       this.settings.dockerizeNode = await select({
            message: '¿Deseas utilizar un contenedor para nodeJS?',
            choices: [
                {
                    name: 'Si',
                    value: true,
                },
                {
                    name: 'No, usaré nodeJS localmente',
                    value: false,
                }
            ],
        });
    }

    async CopyFiles() {
        if(this.settings.dockerizeNode){
            console.log('Habilitando contenedor de nodeJS...');
            await promises.cp( process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/devcontainer/docker-compose.yml', process.cwd()+'/docker-compose.yml', { recursive: true });
        }
    }
}