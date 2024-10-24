import * as fs from 'node:fs/promises';
import * as util  from 'node:util';
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
}