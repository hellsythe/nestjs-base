import { select } from '@inquirer/prompts';
import { exec } from 'child_process';

export default class Swagger {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        if(this.settings.swagger ){
            await exec('npm i swagger-ui-express');
        }
    }

    async question() {
        this.settings.swagger = await select({
            message: '¿Deseas implementar Swagger?',
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