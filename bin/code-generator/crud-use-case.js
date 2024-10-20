import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, camelCase } from './utils.js';

export default class CrudUseCase{
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/usecases/';
  outFolder = process.cwd() + '/src/use-cases/';
  outFolderRepository = process.cwd() + '/src/infrastructure/db/mongo/repositories/';

  async generate(args) {
    this.validate(args);
    const repositoryInterface = `${this.outFolder}${kebabCase(args[4])}/repository.interface.ts`;
    await promises.cp(`${this.stubFolder}model.repository.interface.ts.stub`, repositoryInterface);
    await remplazeInFile(repositoryInterface, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(repositoryInterface, '{{modelFile}}', kebabCase(args[4]));

    await promises.cp(`${this.stubFolder}model.repository.ts.stub`, `${this.outFolderRepository}${kebabCase(args[4])}.repository.ts`);
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.ts`, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.ts`, '{{modelFile}}', kebabCase(args[4]));
  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }
}