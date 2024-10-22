import { promises } from "fs";
import { exec } from 'child_process';

export default class Common {
  async init() {
    await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/jest/', process.cwd(), {recursive: true});
    await promises.cp(process.cwd()+'/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/tsconfig.json', process.cwd()+'/tsconfig.json');

    await exec('npm i dotenv --save-dev');
    await exec('npm i @faker-js/faker --save-dev');
    await exec('npm i @automock/jest --save-dev');
    await exec('npm i @automock/adapters.nestjs --save-dev');
    await exec('npm i --save @nestjs/config');
    await exec('npm install --save @nestjs/swagger');
    await exec('npm i --save class-validator class-transformer');
    await exec('npm link @sdkconsultoria/nestjs-base');
  }
}