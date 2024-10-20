import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, camelCase } from './utils.js';

export default class CrudUseCase{
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/usecases/';
  outFolder = process.cwd() + '/src/use-cases/';

  async generate(args) {
    this.validate(args);
    await promises.cp(`${this.stubFolder}create.ts.stub`, `${this.outFolder}${kebabCase(args[4])}/create.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(args[4])}/create.ts`, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(`${this.outFolder}${kebabCase(args[4])}/create.ts`, '{{modelCamel}}', camelCase(args[4]));
    await remplazeInFile(`${this.outFolder}${kebabCase(args[4])}/create.ts`, '{{modelFile}}', kebabCase(args[4]));

  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }
}