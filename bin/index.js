#!/usr/bin/env node

import Settings from './settings.js';
import DevContainers from './devcontainers.js';
import Database from './database.js';
console.log('Configurando tu proyecto...');
const settings = new Settings();

const devContainers = new DevContainers(settings);
await devContainers.init();

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