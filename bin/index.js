#!/usr/bin/env node
import InitProyect from './scripts/init-project/init.js';
import { CodeGenerator } from './code-generator/code-generator.js';

const args = process.argv;

switch (args[2]?.toUpperCase()) {
  case undefined:
  case 'INIT':
    await new InitProyect().run()
    break;
  case 'MAKE':
    await new CodeGenerator().run(args);
    break;
  case 'MAN':
    console.log('mostrando manual');
    break;
  default:
    console.error('comando invalido');
    break;
}
