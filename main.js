const fileUpload = document.getElementById("file-upload");

fileUpload.addEventListener('change', () => {
    const file = fileUpload.files[0];

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
        const data = {
            image: btoa(reader.result)
        };

        fetch("/extract.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data => data.text())
        .then(text => console.log(text));
    };
});