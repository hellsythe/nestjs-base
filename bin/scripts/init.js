import Settings from './settings.js';
import DevContainers from './devcontainers.js';
import Database from './database.js';
import FeatureFlags from './feature-flag.js';
import NodeContainer from './node.js';
import Swagger from './swagger.js';
import TestContainers from './testContainers.js';
import Architecture from './architecture.js';
import Health from './healthcheck.js'
import Common from './common.js'

export default class InitProyect {
  async run(){
    console.info('Configurando tu proyecto...');
    const settings = new Settings();
    await new DevContainers(settings).init();
    await new NodeContainer(settings).init();
    await new Database(settings).init();
    // await new FeatureFlags(settings).init();
    // await new Swagger(settings).init();
    await new TestContainers(settings).init();
    // await new Health(settings).init();
    await new Architecture(settings).init();
    await new Common().init();
  }
}

