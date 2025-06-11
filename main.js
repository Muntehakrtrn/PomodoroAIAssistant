const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const menuTemplate = [
  {
    label: 'Dosya',
    submenu: [
      { label: 'Çıkış', role: 'quit' }
    ]
  },
  {
    label: 'Düzen',
    submenu: [
      { label: 'Kes', role: 'cut' },
      { label: 'Kopyala', role: 'copy' },
      { label: 'Yapıştır', role: 'paste' }
    ]
  },
  {
    label: 'Görünüm',
    submenu: [
      { label: 'Yenile', role: 'reload' }
    ]
  }
];

function createMainWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  win.loadFile(path.join(__dirname, 'src/presentation/index.html'));
    win.webContents.openDevTools(); 
}

app.whenReady().then(createMainWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
