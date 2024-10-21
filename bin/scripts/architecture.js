import { select } from '@inquirer/prompts';
import { promises } from "fs";

export default class Architecture {
    settings;

    constructor(settings) {
        this.settings = settings;
    }

    async init() {
        await this.question();
        switch (this.settings.architecture) {
            case 'clean-code':

                break;

            default:
                break;
        }
    }

    async question() {
        this.settings.architecture = await select({
            message: '¿Deseas implementar una plantilla de arquitectura?',
            choices: [
                {
                    name: 'Arquitectura Limpia',
                    value: 'clean-code',
                },
                {
                    name: 'no utilizar plantilla',
                    value: false,
                }
            ],
        });
    }

}