export const config = [
  {
    text: '¿Deseas implementar devcontainers?',
    value: 'devcontainer',
    choices: [
      {
        name: 'Si, para VS code',
        value: 'vscode',
      },
      {
        name: 'Si, pero yo agregare la configuracion para mi editor de texto',
        value: 'generic',
      },
      {
        name: 'No',
        value: false,
      }
    ],
  },
  {
    text: '¿Deseas implementar un contenedor para nodeJS?',
    value: 'dockerizeNode',
    visible: (configOptions) => {
      if(configOptions.devcontainers){
        configOptions.dockerizeNode = true;
        return false;
      }
      return true;
    },
    choices: [
      {
        name: 'Si',
        value: true,
      },
      {
        name: 'No, usaré nodeJS localmente',
        value: false,
      }
    ],
  },
  {
    text: '¿Deseas implementar una base de datos?',
    value: 'db',
    choices: [
      {
        name: 'MongoDB',
        value: 'mongo',
      },
      {
        name: 'No, no necesito base de datos',
        value: false,
      }
    ],
  },
  {
    text: '¿Deseas implementar un contenedor para tu base de datos?',
    value: 'dockerizeDb',
    visible: (configOptions) => {
      if(configOptions.db && configOptions.devcontainers){
        configOptions.dockerizeDb = true;
        return false;
      }

      if(configOptions.db){
        return true;
      }
    },
    choices: [
      {
        name: 'Si',
        value: true,
      },
      {
        name: 'No, ya tengo una base de datos en mi host',
        value: false,
      }
    ],
  },
  {
    text: '¿Deseas implementar feature flags?',
    value: 'featureFlags',
    choices: [
      {
        name: 'No',
        value: false,
      },
      {
        name: 'Si',
        value: true,
      },
    ],
  },
  {
    text: '¿Deseas implementar TestContainers?',
    value: 'testcontainers',
    choices: [
      {
        name: 'No',
        value: false,
      },
      {
        name: 'Si',
        value: true,
      }
    ],
  },
  {
    text: '¿Deseas implementar una página de health?',
    value: 'healthPage',
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
  },
  {
    text: '¿Deseas implementar una plantilla de arquitectura?',
    value: 'codeTemplate',
    choices: [
      {
        name: 'Arquitectura Limpia',
        value: 'clean-code',
      },
      {
        name: 'no utilizar plantilla',
        value: false,
      }
    ],
  }
];