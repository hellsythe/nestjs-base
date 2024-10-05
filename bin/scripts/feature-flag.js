import { select } from '@inquirer/prompts';

export default class FeatureFlags {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
    }

    async question() {
        this.settings.dockerizeNode = await select({
            message: '¿Deseas implementar feature flags?',
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