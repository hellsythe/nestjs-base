import { select } from '@inquirer/prompts';

export default class Swagger {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
    }

    async question() {
        this.settings.dockerizeNode = await select({
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