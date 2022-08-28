// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, Menu, ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");



const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Github',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/datcal/MASM/issues')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    title: "MASM",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      enableremotemodule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setTitle("My App");
  // and load the index.html of the app.
  mainWindow.loadFile("app/screens/main.html");

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("file-request", (event) => {
  // If the platform is 'win32' or 'Linux'
  if (process.platform !== "darwin") {
    // Resolves to a Promise<Object>
    dialog
      .showOpenDialog({
        title: "Select the File to be uploaded",
        buttonLabel: "Upload",
        // Restricting the user to only Text Files.
        filters: [
          {
            name: "Text Files",
            extensions: ["mp3", "wav"],
          },
        ],
        // Specifying the File Selector Property
        properties: ["openFile"],
      })
      .then((file) => {
        // Stating whether dialog operation was
        // cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
          const filepath = file.filePaths[0].toString();
          console.log(filepath);
          event.reply("file", filepath);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // If the platform is 'darwin' (macOS)
    dialog
      .showOpenDialog({
        title: "Select the File to be uploaded",
        buttonLabel: "Upload",
        filters: [
          {
            name: "Text Files",
            extensions: ["mp3", "wav"],
          },
        ],
        // Specifying the File Selector and Directory
        // Selector Property In macOS
        properties: ["openFile", "openDirectory"],
      })
      .then((file) => {
        console.log(file.canceled);
        if (!file.canceled) {
          const filepath = file.filePaths[0].toString();
          console.log(filepath);
          event.sender.send("file", filepath);

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
