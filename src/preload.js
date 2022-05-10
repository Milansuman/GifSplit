const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openDialog: () => ipcRenderer.invoke("dialog:openFile")
});