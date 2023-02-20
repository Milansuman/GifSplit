const fileUploadBtn = document.getElementById("file-upload");
const fileUpload = document.getElementById("file");
const statusText = document.getElementById("status-text");
const root = document.getElementById("root");

fileUpload.addEventListener("change", () => {
    root.replaceChildren();

    const file = fileUpload.files[0];
    console.log(fileUpload.files);
    if(file === undefined){
        return
    }

    
    const data = new FormData();
    data.set("image", file);

    statusText.style.display = "block";
    statusText.innerText = "Loading...";

    fetch("/api/split", {
        method: "POST",
        body: data
    }).then(response => response.json()).then(data => {
        statusText.style.display = "none";
        displayImages(data);
    });
    
});

function displayImages(data){
    console.log(data);
    data.frames.forEach(frame => {
        const img = document.createElement("img");
        img.src = frame;
        root.appendChild(img);
    });
}