const Store = require('electron-store');
const schema = {
  clearInvalidConfig: {
    default: true
  },
  firstRun: {
    type: 'boolean',
    default: false
  },
  devMode: {
    type: 'boolean',
    default: false
  },
  theme: {
    type: 'object',
    default: {
      themeFile: {
        type: 'string',
        default: 'style.css'
      },
      themeColor: {
        type: 'string',
        default: '#b1bed6'
      }
    }
  }
};
//todo Fix the damn menu!
const store = new Store({ schema });
