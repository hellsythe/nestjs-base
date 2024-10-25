import { BaseScript } from "./../base-script.js";

export default class Entity extends BaseScript {
  async generate(args) {
    this.validate(args);
    await this.copyFileFromArchitectureFolderAndRename('entities/entity.model.ts', args[4]);
  }
}