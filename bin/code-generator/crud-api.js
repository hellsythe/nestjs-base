import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, camelCase, processLineByLine } from './utils.js';

export default class CrudApi{
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/controllers/';
  outFolder = process.cwd() + '/src/interface-adapters/controllers/';

  async generate(args) {
    this.validate(args);
    await this.copyAndReplaceUseCase(args[4]);
    this.copyDtos(args[4]);
  }

  async copyAndReplaceUseCase(entity){
    await promises.cp(`${this.stubFolder}model.controller.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.controller.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.controller.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.controller.ts`, '{{modelCamel}}', camelCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.controller.ts`, '{{modelFile}}', kebabCase(entity));

    const propierties = await this.loadProperties(entity);
    // await promises.cp(`${this.stubFolder}${useCase}.spec.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`);
    // await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{modelClass}}', pascalCase(entity));
    // await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{modelFile}}', kebabCase(entity));
    // await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{modelCamel}}', camelCase(entity));
    // await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{property}}', propierties[0].split(':')[0].trim());

    await promises.cp(`${this.stubFolder}presenter.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.presenter.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.presenter.ts`, '{{modelFile}}', kebabCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.presenter.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.presenter.ts`, '{{modelCamel}}', camelCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.presenter.ts`, '{{properties}}', propierties.join('\n'));

    console.log( `${this.outFolder}${kebabCase(entity)}/${kebabCase(entity)}.presenter.ts`);

  }

  async copyDtos(entity){
    const propierties = await this.loadProperties(entity);
    await promises.cp(`${this.stubFolder}dtos/create.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`);
    await promises.cp(`${this.stubFolder}dtos/update.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`);
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`, '{{modelClass}}', pascalCase(entity));
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/create.dto.ts`, '{}', '{\n'+propierties.join('\n')+'\n}');
    await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/update.dto.ts`, '{{modelClass}}', pascalCase(entity));
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