const electron = require('electron')
const FS = require('fs')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const dialog = electron.dialog
const nativeImage = electron.nativeImage

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let warningIcon = nativeImage.createFromPath('images/warning.png')

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipc.on('open-file-dialog', function (event) {
  let startPath = '';

  if (process.platform === 'darwin') {
    startPath = '/Users/chrisgriffith/Documents/'
  }

  dialog.showOpenDialog({
    title: 'Select a file...',
    properties: ['openFile'],
    defaultPath: startPath,
    buttonLabel: "Select…",
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }, function (files) {
    if (files) event.sender.send('selected-item', files)
  })
})

ipc.on('open-directory-dialog', function (event) {
  dialog.showOpenDialog({
    title: 'Select a workspace...',
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-item', files)
  })
})

ipc.on('save-file-dialog', function (event) {
  let startPath = '';

  if (process.platform === 'darwin') {
    startPath = '/Users/chrisgriffith/Documents/'
  }

  dialog.showSaveDialog({
    title: 'Save file...',
    defaultPath: '/Users/chrisgriffith/Documents/highscores.txt',
    buttonLabel: "Save",
    filters: [
      { name: 'Text', extensions: ['txt'] }
    ]
  }, function (file) {
    console.log(file);

    if (file) {
      let theData = "Chris,10000"
      FS.writeFile(file, theData, function (err) {
        if (err === null) {
          console.log('It\'s saved!');
        } else {
          //ERROR OCCURRED
          console.log(err);
        }
      });
    }
  })
})

ipc.on('display-dialog', function (event, dialogType) {
  dialog.showMessageBox({
    type: dialogType,
    buttons: ['Save', 'Cancel', 'Don\'t Save'],
    defaultId: 0,
    cancelId: 1,
    title: 'Save Score',
    message: 'Backup your score file?',
    detail: 'Message detail',
    icon: warningIcon
  }, function (index) {
    console.log(index)
  });
})