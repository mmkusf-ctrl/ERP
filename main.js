const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: "Stark Premium ERP",
    icon: path.join(__dirname, 'images/stark-logo.png'), // Will fallback if not found
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Allowed for local trusting prototyping
    },
    autoHideMenuBar: true, // Hides the default file menu for a cleaner "app" look
    backgroundColor: '#f3f4f6'
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
