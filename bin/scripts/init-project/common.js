import { promises } from "fs";
import { BaseScript } from "./../base-script.js";

export default class Common extends BaseScript {
  async init() {
    await this.copyCommonFiles();
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
}