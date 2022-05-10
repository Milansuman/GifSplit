const {app, BrowserWindow, dialog, ipcMain} = require("electron");
const path = require("path");

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    window.loadFile("src/index.html");
};

async function showFileDialog(){
    const {cancelled, filePaths} = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [
            {
                name: "GIFS",
                extensions: ["gif"]
            }
        ]
    });

    if(cancelled){
        return;
    }else{
        return filePaths;
    }
}

app.whenReady().then(()=>{
    ipcMain.handle("dialog:openFile", showFileDialog);
    createWindow();
});

app.on("window-all-closed", ()=>{
    app.quit();
});