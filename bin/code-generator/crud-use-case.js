import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, camelCase } from './utils.js';

export default class CrudUseCase{
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/usecases/';
  outFolder = process.cwd() + '/src/use-cases/';

  async generate(args) {
    this.validate(args);
    this.copyAndReplaceUseCase('create', args[4]);
    this.copyDtos(args[4]);

  }

  async copyAndReplaceUseCase(useCase, entity){
    await promises.cp(`${this.stubFolder}${useCase}.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, '{{modelCamel}}', camelCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, '{{modelFile}}', kebabCase(entity));
  }

  async copyDtos(entity){
    await promises.cp(`${this.stubFolder}dtos/create.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`);
    await promises.cp(`${this.stubFolder}dtos/update.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`, '{{modelClass}}', pascalCase(entity));
  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }
}