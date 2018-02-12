const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win
function createWindow() {
	win = new BrowserWindow({
		show: false,
		width: 1500,
		height: 900,
		webPreferences: {
			webSecurity: false
		}});
	win.maximize();
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocal: 'file:',
		slashes: true
	}));
	win.show();

//win.webContents.openDevTools()

win.on('closed', () => {
	win = null;
});
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
  	app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
  	createWindow()
  }
})
