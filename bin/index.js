#!/usr/bin/env node

import Settings from './scripts/settings.js';
import DevContainers from './scripts/devcontainers.js';
import Database from './scripts/database.js';
import FeatureFlags from './scripts/feature-flag.js';
import NodeContainer from './scripts/node.js';
import Swagger from './scripts/swagger.js';
import TestContainers from './scripts/testContainers.js';
import Architecture from './scripts/architecture.js';
import Health from './scripts/healthcheck.js'

console.log('Configurando tu proyecto...');

const settings = new Settings();

await new DevContainers(settings).init();
await new NodeContainer(settings).init();
await new Database(settings).init();
await new FeatureFlags(settings).init();
await new Swagger(settings).init();
await new TestContainers(settings).init();
await new Architecture(settings).init();
await new Health(settings).init();