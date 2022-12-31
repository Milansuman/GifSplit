const fileUpload = document.getElementById("file-upload");
const fileForm = document.getElementById("file-form")

fileUpload.addEventListener('change', () => {
    fileForm.submit();
});