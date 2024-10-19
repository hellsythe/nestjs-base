import { promises } from "fs";
import { kebabCase, remplazeInFile, pascalCase, processLineByLine } from './utils.js';

export default class Repository {
  stubFolder = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/code-generator/stubs/';
  outFolder = process.cwd() + '/src/infrastructure/db/mongo';

  async generate(args) {
    this.validate(args);
    await this.writteSchema(args);

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

  async loadProperties(args) {
    const data = await processLineByLine(`${process.cwd()}/src/entities/${kebabCase(args[4])}.ts`);
    const props = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].includes(':')) {
        props.push('\n  @Prop({ required: true })\n'+data[index]);
      }
    }

    return props;
  }
}