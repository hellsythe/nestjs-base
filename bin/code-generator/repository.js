import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, processLineByLine, camelCase } from './utils.js';

export default class Repository {
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/';
  outFolder = process.cwd() + '/src/infrastructure/db/mongo';
  outFolderRepository = process.cwd() + '/src/infrastructure/db/mongo/repositories/';

  async generate(args) {
    this.validate(args);
    await this.writteSchema(args);
    await this.writteRepository(args);
    await this.writteFactory(args);
  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('La entidad no existe');
    }
  }

  async writteSchema(args) {
    const outFile = `${this.outFolder}/schemas/${kebabCase(args[4])}.schema.ts`;
    await promises.cp(`${this.stubFolder}/schema.mongo.ts.stub`, outFile);
    await remplazeInFile(outFile, '{{entityClass}}', pascalCase(args[4]));
    const propierties = await this.loadProperties(args);
    await remplazeInFile(outFile, '{}', `{${propierties.join('\n')}\n}`);

  }

  async writteRepository(args){
    const repositoryInterface = `${process.cwd() + '/src/use-cases/'}${kebabCase(args[4])}/repository.interface.ts`;
    await promises.cp(`${this.stubFolder}usecases/model.repository.interface.ts.stub`, repositoryInterface);
    await remplazeInFile(repositoryInterface, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(repositoryInterface, '{{modelFile}}', kebabCase(args[4]));

    await promises.cp(`${this.stubFolder}usecases/model.repository.ts.stub`, `${this.outFolderRepository}${kebabCase(args[4])}.repository.ts`);
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.ts`, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.ts`, '{{modelFile}}', kebabCase(args[4]));

    await promises.cp(`${this.stubFolder}usecases/model.repository.spec.ts.stub`, `${this.outFolderRepository}${kebabCase(args[4])}.repository.spec.ts`);
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.spec.ts`, '{{modelFile}}', kebabCase(args[4]));
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.spec.ts`, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(`${this.outFolderRepository}${kebabCase(args[4])}.repository.spec.ts`, '{{modelCamelCase}}', camelCase(args[4]));

  }

  async writteFactory(args) {
    const propierties = await this.loadPropertiesFactory(args);
    await promises.cp(`${this.stubFolder}model.factory.ts.stub`, `${process.cwd()}/test/factory/${kebabCase(args[4])}.factory.ts`);
    await remplazeInFile(`${process.cwd()}/test/factory/${kebabCase(args[4])}.factory.ts`, '{{modelClass}}', pascalCase(args[4]));
    await remplazeInFile(`${process.cwd()}/test/factory/${kebabCase(args[4])}.factory.ts`, '{}', `{\n${propierties.join('\n')}\n  }`);
  }

  async loadProperties(args) {
    const data = await processLineByLine(`${process.cwd()}/src/entities/${kebabCase(args[4])}.model.ts`);
    const props = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].includes(':')) {
        props.push('\n  @Prop({ required: true })\n'+data[index]);
      }
    }

    props.push('\n  @Prop({ index: true })\n  deletedAt: Date;');

    return props;
  }

  async loadPropertiesFactory(args) {
    const data = await processLineByLine(`${process.cwd()}/src/entities/${kebabCase(args[4])}.model.ts`);
    const props = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].includes(':')) {
        const type = data[index].split(':');

        switch (type[1].trim()) {
          case 'string;':
            props.push(`  ${type[0]}: faker.word.adjective(),`);
            break;
          case 'number;':
            props.push(`  ${type[0]}: faker.number.bigInt(),`);
          break;
          default:
            props.push(`  ${type[0]}: null,`);
            break;
        }
      }
    }

    return props;
  }
}