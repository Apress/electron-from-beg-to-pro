// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require('electron').ipcRenderer;

let foobarButton = document.getElementById('foobarButton');

foobarButton.addEventListener('click', () => {
    ipcRenderer.send('foobar', ['hello']);
});

ipcRenderer.on('barfoo', (event, args) => {
    console.log(args);
    foobarButton.innerText = args;
});