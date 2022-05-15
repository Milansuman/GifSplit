const { ipcRenderer, contextBridge } = require("electron");
const extractFrames = require("gif-extract-frames");
const os = require("os");
const path = require("path");
const {mkdtemp, readdir} = require("fs/promises");

contextBridge.exposeInMainWorld("electronAPI", {
    openDialog: () => ipcRenderer.invoke("dialog:openFile"),
    getFrames: async (file) => {
        //making a temporary directory incase user doesn't want to save frames
        let tempPath = await mkdtemp(path.join(os.tmpdir(), "gif-splitter"));

        await extractFrames({
            input: file,
            output: path.join(tempPath, "frame-%d.png")
        });

        let frames =  await readdir(tempPath);
        let paths = []

        frames.forEach(elem => {
            paths.push(path.join(tempPath, elem));
        });

        return paths;
    }
});