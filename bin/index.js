#!/usr/bin/env node

import { select, Separator } from '@inquirer/prompts';

console.log('Configurando tu proyecto...');


const devContainers = await select({
    message: '¿Quieres utilizar Devcontainer para VS Code?',
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

const db = await select({
    message: '¿Deseas utilizar una base de datos?',
    choices: [
        {
            name: 'Mysql',
            value: 'mysql',
        },
        {
            name: 'MongoDB',
            value: 'mongo',
        },
        {
            name: 'No, no necesito base de datos',
            value: false,
        }
    ],
});

if(devContainers) {
    const dbDocker = true;
    const dockerNode = true;
} else
{
    if (db) {
        const dbDocker = await select({
            message: '¿Deseas dockerizar tu DB?',
            choices: [
                {
                    name: 'Si, ayudame a generar un contenedor',
                    value: true,
                },
                {
                    name: 'No, utilizare la DB en mi host directamente',
                    value: false,
                }
            ],
        });
    }
    const dockerNode = await select({
        message: '¿Deseas ejecutar nodeJs sobre un contenedor?',
        choices: [
            {
                name: 'Si, ayudame a generar un contenedor',
                value: true,
            },
            {
                name: 'No, utilizare nodeJs en mi host directamente',
                value: false,
            }
        ],
    });
}

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