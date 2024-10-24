import { promises } from "fs";
import { BaseScript } from "./../base-script.js";

export default class Common extends BaseScript {
  async init() {
    await this.copyCommonFiles();
    await this.installCommonLibraries();
  }

  async copyCommonFiles(){
    await promises.cp(this.path+'tsconfig.json', process.cwd()+'/tsconfig.json');
    await promises.cp(this.path+'.env', process.cwd()+'/.env');

    await this.copyFromArchitectureFolder('infrastructure/infrastructure.module.ts');
    await this.copyFromArchitectureFolder('infrastructure/setupSwagger.ts');
    await this.copyFromArchitectureFolder('app.module.ts');
    await this.copyFromArchitectureFolder('interface-adapters/controllers/controllers.module.ts');
    await this.copyFromArchitectureFolder('main.ts');
  }

  async installCommonLibraries(){
    await this.execute('npm install --save-dev testcontainers');
    await this.execute('npm i dotenv --save-dev');
    await this.execute('npm i @faker-js/faker --save-dev');
    await this.execute('npm i @automock/jest --save-dev');
    await this.execute('npm i @automock/adapters.nestjs --save-dev');
    await this.execute('npm i --save @nestjs/config');
    await this.execute('npm install --save @nestjs/swagger');
    await this.execute('npm i --save class-validator class-transformer');
    await this.execute('npm link @sdkconsultoria/nestjs-base');
  }
}