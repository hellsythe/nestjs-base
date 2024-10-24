import { promises } from "fs";
import { exec } from 'child_process';
import { BaseScript } from './../base-script.js'

export default class Database extends BaseScript {
    async init() {
        if (this.settings.db) {
            await this.copyFromArchitectureFolder('use-cases/common/generic.repository.interface.ts');
        }

        switch(this.settings.db){
            case 'mongo':
                const mongoEnv = await this.loadContenFromFile(this.path + '.env.mongo');
                await this.remplazeEntityInFile('.env', '{{mongo}}', mongoEnv);
                await promises.cp(this.path+'test/', process.cwd()+'test', {recursive: true});
                await this.copyFromArchitectureFolder('infrastructure/db/db-mongo.module.ts');
                await this.copyFromArchitectureFolder('infrastructure/db/mongo/repositories/generic.repository.mongo.ts');
                await this.insertInNewLineAfter('src/infrastructure/infrastructure.module.ts', "import { ConfigModule } from '@nestjs/config';", "import { DbMongoModule } from './db/db-mongo.module';");
                await this.insertContentAfter('src/infrastructure/infrastructure.module.ts', 'ConfigModule.forRoot\(\)', ', DbMongoModule');
                // await exec('npm i @nestjs/mongoose mongoose');
                break;
            default:
                break;
        }

        await this.remplazeEntityInFile('.env', '{{mongo}}', '');
    }
}