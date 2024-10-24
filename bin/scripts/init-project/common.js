import { promises } from "fs";
import { BaseScript } from "./../base-script.js";
import { exec } from 'child_process';

export default class Common extends BaseScript {
  async init() {
    await this.copyCommonFiles();
    await this.installCommonLibraries();
  }

  async copyCommonFiles(){
    await promises.cp(this.path+'tsconfig.json', process.cwd()+'/tsconfig.json');
    await promises.cp(this.path+'.env', process.cwd()+'/.env');
  }

  async installCommonLibraries(){
    // await exec('npm i dotenv --save-dev');
    // await exec('npm i @faker-js/faker --save-dev');
    // await exec('npm i @automock/jest --save-dev');
    // await exec('npm i @automock/adapters.nestjs --save-dev');
    // await exec('npm i --save @nestjs/config');
    // await exec('npm install --save @nestjs/swagger');
    // await exec('npm i --save class-validator class-transformer');
    // await exec('npm link @sdkconsultoria/nestjs-base');
  }
}