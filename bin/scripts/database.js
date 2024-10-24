import { promises } from "fs";
import { exec } from 'child_process';
import { BaseScript } from './base-script.js'

export default class Database extends BaseScript {
    async init() {
        switch(this.settings.database){
            case 'mongo':
                await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/.env', process.cwd()+'/.env', { recursive: true });
                await exec('npm i @nestjs/mongoose mongoose');
                break;
            default:
                break;
        }
    }

    async question(){
        if (this.settings.database) {
            await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/generic.repository.interface.ts.stub', process.cwd()+'/src/use-cases/common/generic.repository.interface.ts');
            await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/generic.repository.mongo.ts.stub', process.cwd()+'/src/infrastructure/db/mongo/repositories/generic.repository.ts');
            await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/db-mongo.module.ts.stub', process.cwd()+'/src/infrastructure/db/db-mongo.module.ts');
            await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/test', process.cwd()+'/test',  { recursive: true });
        }
    }
}