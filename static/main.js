const fileUploadBtn = document.getElementById("file-upload");
const fileUpload = document.getElementById("file");
const statusText = document.getElementById("status-text");
const root = document.getElementById("root");

fileUploadBtn.addEventListener("click", () => {
    root.replaceChildren();

    const file = fileUpload.files[0];

    const data = new FormData();
    data.append("image", file);

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