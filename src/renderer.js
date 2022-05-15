const frame = document.getElementById("frame");
const forwardArrow = document.getElementById("forward-arrow");
const backArrow = document.getElementById("back-arrow");
let frames = [];
let counter = 0; //keeping track of which frame is to be viewed

frame.addEventListener("click", async () => {
    let fileName = await window.electronAPI.openDialog(); //function exposed by preload.js

    //incase the user cancells the dialog or doesn't select a file
    if (fileName[0] != undefined){
        frames = await window.electronAPI.getFrames(fileName[0]);
        frame.innerHTML = "<img src=\"" + frames[0] + "\"/>";
        forwardArrow.style.display = "flex";
        backArrow.style.display = "flex";
        counter = 0;
    }
});

forwardArrow.addEventListener("click", () => {
    if(counter < frames.length-1){
        counter++;
    }
    frame.innerHTML = "<img src=\"" + frames[counter] + "\"/>";
});

backArrow.addEventListener("click", () => {
    if(counter > 0){
        counter--;
    }
    frame.innerHTML = "<img src=\"" + frames[counter] + "\"/>";
});