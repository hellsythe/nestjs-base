import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, camelCase, processLineByLine } from './utils.js';

export default class CrudUseCase{
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/usecases/';
  outFolder = process.cwd() + '/src/use-cases/';

  async generate(args) {
    this.validate(args);
    this.copyAndReplaceUseCase('create', args[4]);
    this.copyAndReplaceUseCase('update', args[4]);
    this.copyAndReplaceUseCase('delete', args[4]);
    this.copyAndReplaceUseCase('find', args[4]);
    this.copyAndReplaceUseCase('find-one', args[4]);
    this.copyDtos(args[4]);
  }

  async copyAndReplaceUseCase(useCase, entity){
    await promises.cp(`${this.stubFolder}${useCase}.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, '{{modelCamel}}', camelCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, '{{modelFile}}', kebabCase(entity));

    const propierties = await this.loadProperties(entity);
    await promises.cp(`${this.stubFolder}${useCase}.spec.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{modelFile}}', kebabCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{modelCamel}}', camelCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{property}}', propierties[0].split(':')[0].trim());
  }

  async copyDtos(entity){
    await promises.cp(`${this.stubFolder}dtos/create.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`);
    await promises.cp(`${this.stubFolder}dtos/update.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`, '{{modelClass}}', pascalCase(entity));

    const propierties = await this.loadProperties(entity);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`, '{}', '{\n'+propierties.join('\n')+'\n}');
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`, '{}', '{\n'+propierties.join('\n')+'\n}');

  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }

  async loadProperties(entity) {
    const data = await processLineByLine(`${process.cwd()}/src/entities/${kebabCase(entity)}.model.ts`);
    const props = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].includes(':')) {
        props.push(data[index]);
      }
    }

    return props;
  }
}