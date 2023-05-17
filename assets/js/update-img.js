// Handle upload btn click
const uploadBtn = document.querySelector('#upload-btn');
const imageInput = document.querySelector('#image-input');
const fileNameDOM = document.querySelector('.file-name');
const saveBtn = document.querySelector('#save-btn');
uploadBtn.addEventListener('click', () => {
  imageInput.click();
})

imageInput.onchange = e => { 
  const file = e.target.files[0];
  fileNameDOM.innerHTML = `
    ${file.name}
  `;

  saveBtn.removeAttribute('disabled');
}