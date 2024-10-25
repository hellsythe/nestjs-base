import * as fs from 'node:fs/promises';
import * as fsb from 'node:fs';
import util from 'util';
import { exec as execNonPromise } from 'child_process';
import * as readline from 'readline';
import * as events from 'events';

export class BaseScript {
  settings;
  path = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/';

  constructor(settings) {
    this.settings = settings;
  }

  async getFileContent(file) {
    return await fs.readFile(process.cwd() + '/' + file, 'utf8');
  }
  async remplazeEntityInFile(file, search, replace) {
    const contents = await fs.readFile(process.cwd() + '/' + file, 'utf8');
    const updated = contents.replaceAll(search, replace);

    await fs.writeFile(process.cwd() + '/' + file, updated, 'utf-8', err2 => {
      if (err2) {
        throw Error(err2);
      }
    })
  }

  async loadContenFromFile(file) {
    return await fs.readFile(file, { encoding: 'utf8' });
  }

  async copyFromArchitectureFolder(origin) {
    await fs.cp(this.path + 'template/clean-code/' + origin + '.stub', process.cwd() + '/src/' + origin);
  }

  async copyFolderFromArchitectureFolder(origin,entity, properties = false, property = false) {
    const files = await fs.readdir(this.path + 'template/clean-code/' + origin);

    for (let index = 0; index < files.length; index++) {
      const filePath = this.path + 'template/clean-code/' + origin + files[index];
      const stat = await fs.lstat(filePath);
      if (stat.isFile()) {
        const newFilePath = process.cwd() + '/src/' + origin + files[index].replace('.stub', '');
        const newFilePathFixed = newFilePath.replaceAll('entity', this.kebabCase(entity));
        await fs.cp(filePath, newFilePathFixed);
        await this.fixCommonVars(newFilePathFixed.replace(process.cwd()+'/', ''), entity, properties, property);
      }
    }
  }

  async insertInNewLineAfter(file, search, newContent) {
    await this.remplazeEntityInFile(file, search, search + '\n' + newContent);
  }

  async insertContentAfter(file, search, newContent) {
    await this.remplazeEntityInFile(file, search, search + newContent);
  }

  async execute(command) {
    const exec = util.promisify(execNonPromise);
    await exec(command);
  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }

  async copyFileFromArchitectureFolderAndRename(origin, entity, propierties = false, property = false) {
    const newFile = origin.replaceAll('entity', this.kebabCase(entity));
    await fs.cp(this.path + 'template/clean-code/' + origin + '.stub', process.cwd() + '/src/' + newFile);
    await this.fixCommonVars('/src/' + newFile, entity, propierties, property);

    return process.cwd() + '/src/' + newFile;
  }

  async fixCommonVars(file, entity, propierties = false, property = false) {
    await this.remplazeEntityInFile(file, '{{pascalCase}}', this.pascalCase(entity));
    await this.remplazeEntityInFile(file, '{{kebabCase}}', this.kebabCase(entity));
    await this.remplazeEntityInFile(file, '{{camelCase}}', this.camelCase(entity));

    if (propierties) {
      await this.remplazeEntityInFile(file, '{{properties}}', propierties.join('\n\n'));
    }

    if (property) {
      await this.remplazeEntityInFile(file, '{{property}}',property);
    }
  }

  kebabCase(string) {
    return string.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  pascalCase(str) {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  }

  async loadEntityProperties(enitty){
    const lines = await this.loadContendFromFileLineByLine(process.cwd()+'/src/entities/'+this.kebabCase(enitty)+'.model.ts')

    return lines.filter(line => line.includes(':'))
  }

  async loadContendFromFileLineByLine(filePath) {
    const lines = [];
    if (!fsb.existsSync(filePath)) {
      throw new Error('La entidad no existe');
    }

    const fileStream = fsb.createReadStream(filePath);

    const file = readline.createInterface({
      input: fileStream,
      output: process.stdout,
      terminal: false
    });

    file.on('line', (line) => {
      lines.push(line);
    });

    await events.once(file, 'close');


    return lines;
  }

  firstPropertie() {
    return this.entityProperties[0].split(':')[0].trim();
  }
}