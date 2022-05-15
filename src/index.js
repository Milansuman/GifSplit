const {app, BrowserWindow, dialog, ipcMain} = require("electron");
const path = require("path");

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js") //used to expose ipcRender in renderer.js
        }
    });
    window.loadFile("src/index.html");
};

//function to show the file selection dialog for the gif file
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

//dialog to open folder to save gif frames
async function showFolderDialog(){
    const {cancelled, filePaths} = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

    if (cancelled){
        return
    }else{
        return filePaths
    }
}

app.whenReady().then(()=>{
    ipcMain.handle("dialog:openFile", showFileDialog);
    ipcMain.handle("dialog:openFolder", showFolderDialog);
    createWindow();
});

app.on("window-all-closed", ()=>{
    app.quit();
});