import { select } from '@inquirer/prompts';
import { promises } from "fs";
import { exec } from 'child_process';

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

        if(this.settings.devcontainer){
            this.settings.dockerizeDatabase =  true;
        } else {
            this.settings.dockerizeDatabase  = await select({
                message: `¿Deseas agregar un contenedor para tu base de datos ${this.settings.database}?`,
                choices: [
                    {
                        name: 'Si',
                        value: true,
                    },
                    {
                        name: 'No, ya tengo una base de datos en mi host',
                        value: false,
                    }
                ],
            });
        }
    }

    async dockerizeDatabase(){
        if(!this.settings.dockerizeDatabase){
            return;
        }

        console.log(`Copiando archivos para dockerizar la base de datos ${this.settings.database}...`);

        switch(this.settings.database){
            case 'mongo':
                await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/devcontainer/docker-compose-mongo.yml', process.cwd()+'/docker-compose.yml', { recursive: true });
                await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/.env', process.cwd()+'/.env', { recursive: true });
                // await exec('npm i @nestjs/mongoose mongoose');
                break;
            default:
                break;
        }
    }
}