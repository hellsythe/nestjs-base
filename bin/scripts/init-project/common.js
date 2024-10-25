import { promises } from "fs";
import { BaseScript } from "./../base-script.js";

export default class Common extends BaseScript {
  async init() {
    await this.copyCommonFiles();
  }

  async copyCommonFiles(){
    await promises.cp(this.path+'tsconfig.json', process.cwd()+'/tsconfig.json');
    await promises.cp(this.path+'.env', process.cwd()+'/.env');

    await this.copyFolderFromArchitectureFolder('infrastructure/errors/', 'entity');
    await this.copyFromArchitectureFolder('infrastructure/infrastructure.module.ts');
    await this.copyFromArchitectureFolder('infrastructure/setup.ts');
    await this.copyFromArchitectureFolder('app.module.ts');
    await this.copyFromArchitectureFolder('interface-adapters/controllers/controllers.module.ts');
    await this.copyFromArchitectureFolder('main.ts');
    await this.execute(`mkdir -p ${process.cwd()}/test/factory`);
    await this.execute(`cp -rvf ${this.path}test ${process.cwd()}`);
  }
}