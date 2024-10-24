import { select } from '@inquirer/prompts';
import { exec } from 'child_process';

export default class Health {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        if(this.settings.healthCheck){
            await exec('npm install --save @nestjs/terminus');
        }
    }

    async question() {
        this.settings.healthCheck = await select({
            message: '¿Deseas implementar una página de health?',
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

}