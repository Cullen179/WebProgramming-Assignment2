
let fileInput = document.getElementById('picture');
let img = document.querySelector('.account-img');

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        img.src = reader.result;
    });
    reader.readAsDataURL(file);
});