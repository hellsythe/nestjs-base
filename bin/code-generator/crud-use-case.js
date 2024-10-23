import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, camelCase, processLineByLine } from './utils.js';

export default class CrudUseCase{
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/usecases/';
  outFolder = process.cwd() + '/src/use-cases/';

  async generate(args) {
    this.validate(args);
    await this.copyAndReplaceUseCase('create', args[4]);
    await this.copyAndReplaceUseCase('update', args[4]);
    await this.copyAndReplaceUseCase('delete', args[4]);
    await this.copyAndReplaceUseCase('find', args[4]);
    await this.copyAndReplaceUseCase('find-one', args[4]);
    await this.copyDtos(args[4]);
  }

  async copyAndReplaceUseCase(useCase, entity){
    await promises.cp(`${this.stubFolder}${useCase}.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.ts`);
    await remplazeClassesInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, entity);

    const propierties = await this.loadProperties(entity);
    await promises.cp(`${this.stubFolder}${useCase}.spec.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`);

    await remplazeClassesInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, entity);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{property}}', propierties[0].split(':')[0].trim());
  }

  async copyDtos(entity){
    const propierties = await this.loadProperties(entity);
    this.copyDto(entity, 'create', propierties);
    this.copyDto(entity, 'update', propierties);
  }

  async copyDto(entity, dto, propierties){
    await promises.cp(`${this.stubFolder}dtos/${dto}.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/${dto}.dto.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/${dto}.dto.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/${dto}.dto.ts`, '{}', '{\n'+propierties.join('\n')+'\n}');
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