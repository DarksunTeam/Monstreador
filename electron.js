const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;

const { ipcMain, dialog } = require("electron");
ipcMain.on("minimize", () => {
  mainWindow.minimize()
});
ipcMain.on("maximize", () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
});
ipcMain.on("close", () => {
  mainWindow.close();
});
ipcMain.on("isDev", (event) => {
  event.returnValue = isDev;
});
ipcMain.on("dialog", (event) => {
  const options = {
    type: 'warning',
    buttons: ['Sim', 'Não'],
    defaultId: 1,
    title: 'Confirmação',
    message: 'Deseja realmente apagar esta informação?',
    detail: 'O arquivo com esses dados será excluído',
    cancelId: 1
  };
  if (dialog.showMessageBoxSync(mainWindow, options) === 0) {
    event.returnValue = true;
  }
  else {
    event.returnValue = false;
  }
});

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Tale Manager',
    width: 800,
    height: 600,
    frame: false,
    icon: `${__dirname}/public/img/electron-logo.png`,
    webPreferences: {
      nodeIntegration: true
    },
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );

  if (isDev) {
    //mainWindow.webContents.openDevTools();
    mainWindow.setIcon(path.join(__dirname, '/public/img/react-logo.png'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});