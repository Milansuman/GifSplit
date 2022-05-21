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

        //sorting to make sure frames are accessed in the correct order
        //fixes the bug where some frames appear out of order
        return paths.sort((a, b) => {
            if(parseInt(a.split("-")[2].replace(".png", ""), 10) > parseInt(b.split("-")[2].replace(".png", ""), 10)){
                return 1;
            }else if(parseInt(a.split("-")[2].replace(".png", ""), 10) < parseInt(b.split("-")[2].replace(".png", ""), 10)){
                return -1;
            }else{
                return 0;
            }
        });
    }
});