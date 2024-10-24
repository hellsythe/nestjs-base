import DevContainers from './devcontainers.js';
import Database from './database.js';
import FeatureFlags from './feature-flag.js';
import Dockerize from './dockerize.js';
import TestContainers from './testContainers.js';
import Health from './healthcheck.js'
import Common from './common.js'
import {Config} from './config.js';

export default class InitProyect {
  async run(){
    const settings = await new Config().init();

    await new Common(settings).init();
    await new DevContainers(settings).init();
    await new Dockerize(settings).init();
    await new Database(settings).init();
    await new FeatureFlags(settings).init();
    await new TestContainers(settings).init();
    await new Health(settings).init();
  }
}

