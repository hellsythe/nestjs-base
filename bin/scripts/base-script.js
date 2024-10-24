import * as fs from 'node:fs/promises';
import util from 'util';
import { exec as execNonPromise } from 'child_process';

export class BaseScript {
  settings;
  path = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/';

  constructor(settings) {
    this.settings = settings;
  }

  async remplazeEntityInFile(file, search, replace){
    const contents = await fs.readFile(process.cwd()+'/'+file, 'utf8');
    const updated = contents.replace(search, replace)

    await fs.writeFile(process.cwd()+'/'+file, updated, 'utf-8', err2 => {
      if (err2) {
        throw Error(err2);
      }
    })
  }

  async loadContenFromFile(file) {
    return await fs.readFile(file,  { encoding: 'utf8' });
  }

  async copyFromArchitectureFolder(origin)
  {
    await fs.cp(this.path+'template/'+this.settings.codeTemplate+'/'+origin+'.stub', process.cwd()+'/src/'+origin);
  }

  async copyFolderFromArchitectureFolder(origin)
  {
    const files = await fs.readdir(this.path+'template/'+this.settings.codeTemplate+'/'+origin);

    for (let index = 0; index < files.length; index++) {
      await fs.cp(this.path+'template/'+this.settings.codeTemplate+'/'+origin+files[index], process.cwd()+'/src/'+origin+files[index].replace('.stub', ''));
    }
  }

  async insertInNewLineAfter(file, search, newContent){
    await this.remplazeEntityInFile(file, search, search+'\n'+newContent);
  }

  async insertContentAfter(file, search, newContent){
    await this.remplazeEntityInFile(file, search, search+newContent);
  }

  async execute(command){
    const exec = util.promisify(execNonPromise);
    await exec(command);
  }

  validate(args) {
    if (args[4] == undefined) {
      throw new Error('El nombre de la entidad no puede estar vacio');
    }
  }

  async copyFileFromArchitectureFolderAndRename(origin, entity)
  {
    const newFilename = origin.replace('entity', this.kebabCase(entity));
    await fs.cp(this.path+'template/clean-code/'+origin+'.stub', process.cwd()+'/src/'+newFilename);
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
}