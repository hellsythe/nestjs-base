import { BaseScript } from "./../base-script.js";

export default class Health extends BaseScript {
    async init() {
        if(this.settings.healthPage){
            console.log('Instalando dependencia @nestjs/terminus...');
            await this.execute('npm install --save @nestjs/terminus')
        }
    }
}