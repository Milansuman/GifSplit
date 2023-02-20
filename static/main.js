const fileUploadBtn = document.getElementById("file-upload");
const fileUpload = document.getElementById("file");
const statusText = document.getElementById("status-text");
const root = document.getElementById("root");

fileUpload.addEventListener("change", () => {
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
    }).then(response => {
        if(!response.ok){
            throw Error(response.statusText);
        }
        return response.json();
    }).then(data => {
        displayImages(data);
    }).catch(err => {
        statusText.innerText = "An error occurred";
    });
    
});

function displayImages(data){
    console.log(data);
    root.replaceChildren();
    data.frames.forEach(frame => {
        const img = document.createElement("img");
        img.src = frame;
        root.appendChild(img);
    });
}