import { select } from '@inquirer/prompts';
import { promises } from "fs";

export default class Database {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        await this.dockerizeDatabase();
    }

    async question(){
       this.settings.database  = await select({
            message: '¿Deseas utilizar una base de datos?',
            choices: [
                {
                    name: 'MongoDB',
                    value: 'mongo',
                },
                {
                    name: 'No, no necesito base de datos',
                    value: false,
                }
            ],
        });
    }

    async dockerizeDatabase(){
        if(!this.settings.database){
            this.settings.dockerizeDatabase =  false;
            return;
        }

        this.settings.dockerizeDatabase =  true;
        console.log(`Copiando archivos para dockerizar la base de datos ${this.settings.database}...`);

        switch(this.settings.database){
            case 'mongo':
                await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/devcontainer/docker-compose-mongo.yml', process.cwd()+'/docker-compose.yml', { recursive: true });
                await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/.env', process.cwd()+'/.env', { recursive: true });
                break;
            default:
                break;
        }
    }
}