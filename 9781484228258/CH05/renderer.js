// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

////
//Contextual Menu Option 1
// const { remote } = require('electron');
// const { Menu } = remote;

// const myContextMenu = Menu.buildFromTemplate ([
//     { label: 'Cut', role: 'cut' },
//     { label: 'Copy', role: 'copy' },
//     { label: 'Paste', role: 'paste' },
//     { label: 'Select All', role: 'selectall' },
//     { type: 'separator' },
//     { label: 'Custom', click() { console.log('Custom Menu') } }
// ])

// window.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
//     myContextMenu.popup();
// } )

///////
//Contextual Menu Option 2
const { remote, ipcRenderer } = require('electron');
const  ipc = ipcRenderer

window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    ipc.send('show-context-menu')
} )
