const frame = document.getElementById("frame");

frame.addEventListener("click", async () => {
    alert(await window.electronAPI.openDialog());
});