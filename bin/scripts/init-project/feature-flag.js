import { exec } from 'child_process';
import { BaseScript } from './../base-script.js'

export default class FeatureFlags extends BaseScript {
    async init() {
        if(this.settings.featureFlags){
            const env = await this.loadContenFromFile(this.path + '.env.feature-flag');
            await this.remplazeEntityInFile('.env', '{{feature_flags}}', env);
            // await exec('npm i unleash-client');
        }
    }

}