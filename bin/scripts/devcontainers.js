import { promises } from "fs";
import { select } from '@inquirer/prompts';

export default class DevContainers {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        await this.CopyFiles();
    }

    async question(){
       this.settings.devcontainer = await select({
            message: '¿Deseas utilizar Devcontainer para VS Code?',
            choices: [
                {
                    name: 'Si',
                    value: true,
                },
                {
                    name: 'No',
                    value: false,
                }
            ],
        });
    }

    async CopyFiles() {
        if(this.settings.devcontainer){
            console.log('Copiando archivos para devcontainers...');
            await promises.cp( process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/devcontainer/.devcontainer', process.cwd()+'/.devcontainer', { recursive: true });
            await promises.cp( process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/devcontainer/docker-compose.yml', process.cwd()+'/docker-compose.yml', { recursive: true });
        }
    }
}