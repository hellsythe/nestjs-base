import { select } from '@inquirer/prompts';

export default class Architecture {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
    }

    async question() {
        this.settings.dockerizeNode = await select({
            message: '¿Deseas implementar una plantilla de arquitectura?',
            choices: [
                {
                    name: 'Arquitectura Limpia',
                    value: false,
                },
                {
                    name: 'no utilizar plantilla',
                    value: false,
                }
            ],
        });
    }

}