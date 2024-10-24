import * as fs from 'node:fs/promises';

export class BaseScript {
  settings;
  path = process.cwd() + '/node_modules/@sdkconsultoria/nestjs-base/bin/stubs/';

  constructor(settings) {
    this.settings = settings;
  }

  async remplazeEntityInFile(file, search, replace){
    const contents = await fs.readFile(process.cwd()+'/'+file, 'utf8');
    const regExp = new RegExp(search, 'gi')
    const updated = contents.replace(regExp, replace)

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
}