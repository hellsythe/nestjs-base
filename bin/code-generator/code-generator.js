import Entity from "./entity.js";
import Repository from "./repository.js";
import CrudUseCase from "./crud-use-case.js";

export class CodeGenerator {
  async run(args) {
    try {
      await this.generate(args);
    } catch (e) {
      console.error(e.message);
    }
  }

  async generate(args) {
    switch (args[3]) {
      case 'entity':
        await new Entity().generate(args);
        break;
      case 'repository':
        await new Repository().generate(args);
        break;
      case 'usecase':
      case 'use-case':
        break;
      case 'controller':
        break;
      case 'crud-use-case':
      case 'crud-usecase':
        await new CrudUseCase().generate(args);
        break;
      case 'crud-api':
        break;
      default:
        throw new Error(`Parametro invalido: ${args[3]}`);
    }
  }
}