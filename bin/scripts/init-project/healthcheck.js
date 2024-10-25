import { BaseScript } from "./../base-script.js";

export default class Health extends BaseScript {
    async init() {
        if (this.settings.healthPage) {
            console.log('Instalando dependencia @nestjs/terminus...');
            await this.execute('npm install --save @nestjs/terminus');
            await this.execute('npm link  @sdkconsultoria/nestjs-base');//////////////-*****************************
            await this.copyFolderFromArchitectureFolder('interface-adapters/controllers/health/', 'entity');
            this.addModuleToControllerModule();
        }
    }

    async addModuleToControllerModule() {
        const content = await this.getFileContent('src/interface-adapters/controllers/controllers.module.ts');

        if (!content.includes('HealthModule')) {
            await this.insertInNewLineAfter('src/interface-adapters/controllers/controllers.module.ts', "import { Module } from '@nestjs/common';", `import { HealthModule } from './health/health.module';`);
            await this.remplazeEntityInFile('src/interface-adapters/controllers/controllers.module.ts', /\[([\w ,]+)\],/g, `[\$1, HealthModule],`);
            await this.remplazeEntityInFile('src/interface-adapters/controllers/controllers.module.ts', '[]', `[HealthModule]`);
        }
    }
}