import { Config } from 'jest';
import baseCfg from './jest.config';

const config: Config = {
  ...baseCfg,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './result',
        outputName: 'unit-test-result.xml',
        uniqueOutputName: 'false',
      },
    ],
  ],
};

export default config;
