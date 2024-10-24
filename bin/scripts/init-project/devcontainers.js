import { promises } from "fs";
import { BaseScript } from "./../base-script.js";

export default class DevContainers extends BaseScript {
    async init() {
        if(this.settings.devcontainer){
            await promises.cp(this.path+'devcontainer/.devcontainer', process.cwd()+'/.devcontainer', { recursive: true });
            await promises.cp(this.path+'devcontainer/docker-compose.yml', process.cwd()+'/docker-compose.yml');
        }
    }
}