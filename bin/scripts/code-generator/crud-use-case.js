import { BaseScript } from "./../base-script.js";

export default class CrudUseCase extends BaseScript{
  entityProperties;

  async generate(args) {
    this.validate(args);
    this.entityProperties = await this.loadEntityProperties(args[4]);
    await this.copyFolderFromArchitectureFolder('use-cases/entity/', args[4], false, this.firstPropertie());
    await this.copyDtos(args[4]);
  }

  async copyDtos(entity){
    await this.copyFolderFromArchitectureFolder('use-cases/entity/dtos/', entity, this.entityProperties);
  }
}