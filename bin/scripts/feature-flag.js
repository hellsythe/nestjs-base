import { select } from '@inquirer/prompts';
import { exec } from 'child_process';

export default class FeatureFlags {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        if(this.settings.featureFlags){
            // await exec('npm i unleash-client');
        }

    }

    async question() {
        this.settings.featureFlags = await select({
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