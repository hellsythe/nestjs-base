import { BaseScript } from "./../base-script.js";

export default class CrudApi extends BaseScript{
  entityProperties;

  async generate(args) {
    this.validate(args);
    this.entityProperties = await this.loadEntityProperties(args[4]);
    await this.copyFolderFromArchitectureFolder('interface-adapters/controllers/entity/', args[4], this.loadPresenterProperties());
    await this.copyFolderFromArchitectureFolder('interface-adapters/controllers/entity/dtos/', args[4], this.loadDtoProperties());
    await this.addModuleToControllerModule(args[4]);
  }

  async addModuleToControllerModule(entity){
    const content = await this.getFileContent('src/interface-adapters/controllers/controllers.module.ts');

    if (!content.includes(this.pascalCase(entity))) {
      await this.insertInNewLineAfter('src/interface-adapters/controllers/controllers.module.ts',"import { Module } from '@nestjs/common';", `import { ${this.pascalCase(entity)}Module } from './${this.kebabCase(entity)}/${this.kebabCase(entity)}.module';`);
      await this.remplazeEntityInFile('src/interface-adapters/controllers/controllers.module.ts', /\[([\w ,]+)\],/g, `[\$1, ${this.pascalCase(entity)}Module],`);
      await this.remplazeEntityInFile('src/interface-adapters/controllers/controllers.module.ts', '[]', `[${this.pascalCase(entity)}Module]`);
    }
  }

  loadDtoProperties() {
    return this.entityProperties.map(item => '  @ApiProperty()\n  @IsNotEmpty()\n' + item);
  }

  loadPresenterProperties() {
    return this.entityProperties.map(item => '  @Expose()\n' + item);
  }
}