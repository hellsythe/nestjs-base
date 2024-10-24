import { select } from '@inquirer/prompts';
import {config} from './questions.js'

export class Config {
  async init() {
    const settings = {};

    for (let index = 0; index < config.length; index++) {
      if(config[index].visible === undefined || config[index].visible(settings) ){
        settings[ config[index].value] = await select({
          message: config[index].text,
          choices: config[index].choices,
        });
      }
    }

    return settings;
  }
}
