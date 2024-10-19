import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase } from './utils.js';

export default class CrudUseCase{
  stubFile = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/entity.ts.stub';
  outFolder = process.cwd() + '/src/entities/';

  async generate(args) {
    this.validate(args);
    // await promises.cp(this.stubFile, this.getOutfile(args));
    // await remplazeInFile(this.getOutfile(args), '{{name}}', pascalCase(args[4]));

  }

  getOutfile(args) {
    return `${this.outFolder}${kebabCase(args[4])}.ts`;
  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }
}