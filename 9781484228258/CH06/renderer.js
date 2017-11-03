const ipc = require('electron').ipcRenderer;
const syncMsgBtn = document.getElementById('sendSyncMsgBtn');
const aSyncMsgBtn = document.getElementById('sendASyncMsgBtn'); 


syncMsgBtn.addEventListener('click', function () {
  const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.');
  console.log(reply);
  const message = `Synchronous message reply: ${reply}`
  document.getElementById('sync-reply').innerHTML = message
});

sendASyncMsgBtn.addEventListener('click', function () {
  ipc.send('asynchronous-message', "That's one small step for man")
})

ipc.on('asynchronous-reply', function (event, arg) {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('async-reply').innerHTML = message
})
