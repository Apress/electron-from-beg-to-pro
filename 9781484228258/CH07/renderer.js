const ipc = require('electron').ipcRenderer
const selectDirBtn = document.getElementById('select-directory')
const selectFileBtn = document.getElementById('select-file')
const saveFileBtn = document.getElementById('save-file');
const infoDialogBtn = document.getElementById('info');
const errorDialogBtn = document.getElementById('error');
const questionDialogBtn = document.getElementById('question');
const noneDialogBtn = document.getElementById('none');

selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-directory-dialog')
})

selectFileBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
})

saveFileBtn.addEventListener('click', function (event) {
  ipc.send('save-file-dialog')
})

ipc.on('selected-item', function (event, path) {
  document.getElementById('selected-item').innerHTML = `You selected: ${path}`
})

infoDialogBtn.addEventListener('click', function (event) {
  ipc.send('display-dialog', 'info')
})

errorDialogBtn.addEventListener('click', function (event) {
  ipc.send('display-dialog', 'error')
})

questionDialogBtn.addEventListener('click', function (event) {
  ipc.send('display-dialog', 'question')
})

noneDialogBtn.addEventListener('click', function (event) {
  ipc.send('display-dialog', 'none')
})
