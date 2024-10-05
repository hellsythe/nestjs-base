import { select } from '@inquirer/prompts';

export default class TestContainers {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
    }

    async question() {
        this.settings.dockerizeNode = await select({
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