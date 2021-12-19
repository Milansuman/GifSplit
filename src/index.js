const {app, BrowserWindow, ipcRenderer} = require("electron")

const createWindow = () => {
    const window = new BrowserWindow({width: 800, height: 600, minWidth: 800, minHeight: 600})
    window.loadFile("src/index.html")
};

app.whenReady().then(()=>{
    createWindow()
})

app.on("window-all-closed", ()=>{
    app.quit()
})