import { exec } from 'child_process';
import { BaseScript } from './../base-script.js'

export default class FeatureFlags extends BaseScript {
    async init() {
        if(this.settings.featureFlags){
            const env = await this.loadContenFromFile(this.path + '.env.feature-flag');
            await this.remplazeEntityInFile('.env', '{{feature_flags}}', env);
            await this.copyFolderFromArchitectureFolder('infrastructure/services/unleash/');

            await this.insertInNewLineAfter('src/infrastructure/infrastructure.module.ts', "import { ConfigModule } from '@nestjs/config';", "import { UnleashModule } from './services/unleash/unleash.module';");
            await this.insertContentAfter('src/infrastructure/infrastructure.module.ts', 'ConfigModule.forRoot\(\)', ', UnleashModule');
            await exec('npm i unleash-client');
        }
    }

}