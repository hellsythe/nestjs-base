import { BaseScript } from "./../base-script.js";

export default class Repository extends BaseScript {
  entityProperties;

  async generate(args) {
    this.validate(args);
    this.entityProperties = await this.loadEntityProperties(args[4]);

    await this.writteSchema(args);
    await this.writteFactory(args);
    await this.writteRepository(args);
  }

  async writteSchema(args) {
    await this.copyFileFromArchitectureFolderAndRename('infrastructure/db/mongo/schemas/entity.schema.mongo.ts', args[4], this.loadSchemaProperties());
  }

  loadSchemaProperties() {
    const newProperties = this.entityProperties.map(item => '  @Prop({ required: true })\n' + item);
    newProperties.push('  @Prop({ index: true })\n  deletedAt: Date;');

    return newProperties;
  }

  async writteRepository(args) {
    await this.copyFileFromArchitectureFolderAndRename('use-cases/entity/entity.repository.interface.ts', args[4]);
    await this.copyFileFromArchitectureFolderAndRename('infrastructure/db/mongo/repositories/entity.repository.spec.ts', args[4]);
    await this.copyFileFromArchitectureFolderAndRename('infrastructure/db/mongo/repositories/entity.repository.ts', args[4]);
  }

  async writteFactory(args) {
    const filePath = await this.copyFileFromArchitectureFolderAndRename('test/factory/entity.factory.ts', args[4], this.loadFactoryProperties());
    await this.execute(`mv ${filePath} test/factory/`)
    await this.execute(`rm src/test -rf`)
  }

  loadFactoryProperties() {
    return this.entityProperties.map(item => {
      const type = item.split(':');
      switch (type[1].trim()) {
        case 'string;':
          return `  ${type[0]}: faker.word.adjective(),`;
        case 'number;':
          return `  ${type[0]}: faker.number.bigInt(),`;
        default:
          return `  ${type[0]}: null,`;
      }
    });
  }
}