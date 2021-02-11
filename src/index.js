const isDevMode = false;
const { app, BrowserWindow } = require('electron');
const Store = require('electron-store');
const path = require('path');
const url = require('url');
Store.initRenderer();

if (require('electron-squirrel-startup')) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create the main Browser Window instance for the app
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    minWidth: 800,
    minHeight: 700,
    frame: isDevMode,
    titleBarStyle: 'hidden',
    backgroundColor: '#2e2c29',
    icon: path.join(__dirname, 'img/lock.png'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'js/preload.js')
    },
    show: false,
  });
  // Once the window is fully loaded, actually show it to the user
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  // and load the index.html of the app.
  //mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Some crappy workaround to make the window controls work
  // without having to show the window before its ready
  mainWindow.unmaximize();

  //Config
  // const Store = require('electron-store');
  // const store = new Store();
  // store.set('firstRun', false);
  // store.set('devMode', true);
  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
