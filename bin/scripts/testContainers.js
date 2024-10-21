import { select } from '@inquirer/prompts';
import { exec } from 'child_process';

export default class TestContainers {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        if(this.settings.testContainers){
            // exec('npm install --save-dev testcontainers');
            // exec('npm install @testcontainers/mongodb --save-dev');
        }
    }

    async question() {
        this.settings.testContainers = await select({
            message: '¿Deseas implementar TestContainers?',
            choices: [
                {
                    name: 'No',
                    value: false,
                },
                {
                    name: 'Si',
                    value: true,
                }
            ],
        });
    }

}