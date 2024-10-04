#!/usr/bin/env node

import Settings from './scripts/settings.js';
import DevContainers from './scripts/devcontainers.js';
import Database from './scripts/database.js';
import { select } from '@inquirer/prompts';
import NodeContainer from './scripts/node.js';

console.log('Configurando tu proyecto...');
const settings = new Settings();

const devContainers = new DevContainers(settings);
await devContainers.init();

const node = new NodeContainer(settings);
await node.init();

const database = new Database(settings);
await database.init();

const featureFlags = await select({
    message: '¿Habilitar feature flags?',
    choices: [
        {
            name: 'Si',
            value: true,
        },
        {
            name: 'No',
            value: false,
        }
    ],
});

const swagger = await select({
    message: '¿Habilitar swagger?',
    choices: [
        {
            name: 'Si',
            value: true,
        },
        {
            name: 'No',
            value: false,
        }
    ],
});

const testContainers = await select({
    message: '¿Habilitar testcontainers?',
    choices: [
        {
            name: 'Si',
            value: true,
        },
        {
            name: 'No, utilizare los contenedores existentes',
            value: false,
        }
    ],
});



const architecture = await select({
    message: '¿Deseas usar una plantilla de arquitectura?',
    choices: [
        {
            name: 'Arquitectura Hexagonal',
            value: true,
        },
        {
            name: 'Arquitectura Limpia',
            value: false,
        },
        {
            name: 'No usar ninguna plantilla',
            value: false,
        }
    ],
});