import Entity from "./entity.js";

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
        break;
      case 'usecase':
      case 'use-case':
        break;
      case 'controller':
        break;
      case 'crud-use-case':
      case 'crud-usecase':
        break;
      case 'crud-api':
        break;
      default:
        throw new Error(`Parametro invalido: ${args[3]}`);
    }
  }
}