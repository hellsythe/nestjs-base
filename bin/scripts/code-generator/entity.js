import { BaseScript } from "./../base-script.js";

export default class Entity extends BaseScript {
  stubFile = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/entity.model.ts.stub';
  outFolder = process.cwd() + '/src/entities/';

  async generate(args) {
    this.validate(args);
    await this.copyFileFromArchitectureFolderAndRename('entities/entity.model.ts', args[4]);
  }
}