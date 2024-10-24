import { BaseScript } from "./../base-script.js";

export default class Dependencies extends BaseScript {
  async init() {
    console.log('Instalando dependencia testcontainers...');
    await this.execute('npm install --save-dev testcontainers');
    console.log('Instalando dependencia dotenv...');
    await this.execute('npm i dotenv --save-dev');
    console.log('Instalando dependencia @faker-js/faker...');
    await this.execute('npm i @faker-js/faker --save-dev');
    console.log('Instalando dependencia  @automock/jest...');
    await this.execute('npm i @automock/jest --save-dev');
    console.log('Instalando dependencia @automock/adapters.nestjs...');
    await this.execute('npm i @automock/adapters.nestjs --save-dev');
    console.log('Instalando dependencia @nestjs/config...');
    await this.execute('npm i --save @nestjs/config');
    console.log('Instalando dependencia @nestjs/swagger...');
    await this.execute('npm install --save @nestjs/swagger');
    console.log('Instalando dependencia class-validator class-transformer...');
    await this.execute('npm i --save class-validator class-transformer');

    await this.execute('npm link @sdkconsultoria/nestjs-base');
  }
}