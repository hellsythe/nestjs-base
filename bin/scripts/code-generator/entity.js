import { BaseScript } from "./../base-script.js";

export default class Entity extends BaseScript {
  stubFile = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/entity.model.ts.stub';
  outFolder = process.cwd() + '/src/entities/';

  async generate(args) {
    this.validate(args);
    await this.copyFileFromArchitectureFolderAndRename('entities/entity.model.ts', args[4]);
    await this.remplazeEntityInFile(`src/entities/${this.kebabCase(args[4])}.model.ts`, '{{pascalCase}}',  this.pascalCase(args[4]));
  }
}