import { BaseScript } from "./../base-script.js";

export default class CrudApi extends BaseScript{
  entityProperties;

  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/controllers/';
  outFolder = process.cwd() + '/src/interface-adapters/controllers/';

  async generate(args) {
    this.validate(args);
    this.entityProperties = await this.loadEntityProperties(args[4]);
    await this.copyFolderFromArchitectureFolder('interface-adapters/controllers/entity/', args[4], this.loadPresenterProperties());
    await this.copyFolderFromArchitectureFolder('interface-adapters/controllers/entity/dtos/', args[4], this.loadDtoProperties());
    // await this.copyAndReplaceUseCase(args[4]);
    // this.copyDtos(args[4]);
  }

  loadDtoProperties() {
    return this.entityProperties.map(item => '  @ApiProperty()\n  @IsNotEmpty()\n' + item);
  }

  loadPresenterProperties() {
    return this.entityProperties.map(item => '  @Expose()\n' + item);
  }
}