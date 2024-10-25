import { BaseScript } from "./../base-script.js";

export default class CrudUseCase extends BaseScript{
  entityProperties;

  async generate(args) {
    this.validate(args);
    this.entityProperties = await this.loadEntityProperties(args[4]);
    await this.copyFolderFromArchitectureFolder('use-cases/entity/', args[4], false, this.firstPropertie());
    await this.copyDtos(args[4]);
  }

  firstPropertie() {
    return this.entityProperties[0].split(':')[0].trim();
  }

  // async copyAndReplaceUseCase(useCase, entity){
  //   await promises.cp(`${this.stubFolder}${useCase}.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.ts`);
  //   await remplazeClassesInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.ts`, entity);

  //   const propierties = await this.loadProperties(entity);
  //   await promises.cp(`${this.stubFolder}${useCase}.spec.ts.stub`, `${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`);

  //   await remplazeClassesInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, entity);
  //   await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/${useCase}.spec.ts`, '{{property}}', propierties[0].split(':')[0].trim());
  // }

  async copyDtos(entity){
    await this.copyFolderFromArchitectureFolder('use-cases/entity/dtos/', entity, this.entityProperties);

  }

  // async copyDto(entity, dto, propierties){
  //   await promises.cp(`${this.stubFolder}dtos/${dto}.dto.ts.stub`, `${this.outFolder}${kebabCase(entity)}/dtos/${dto}.dto.ts`);
  //   await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/${dto}.dto.ts`, '{{pascalCase}}', pascalCase(entity));
  //   await remplazeInFile(`${this.outFolder}${kebabCase(entity)}/dtos/${dto}.dto.ts`, '{}', '{\n'+propierties.join('\n')+'\n}');
  // }
}