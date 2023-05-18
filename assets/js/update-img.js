// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Tung Lam 
//         Hoang Nguyen Nhat Minh
//         Loi Gia Long 
//         Ngo Ngoc Thinh
//         Vu Tuan Linh
// ID:     Do Tung Lam (s3963286)
//         Hoang Nguyen Nhat Minh (s3977856)
//         Loi Gia Long (s3758273)
//         Ngo Ngoc Thinh (s3879364)
//         Vu Tuan Linh (s3927502)
// Acknowledgement: 
// Bootstrap documentation: https://getbootstrap.com/ 
// Bootstrap icon: https://icons.getbootstrap.com/
// Google icon: https://fonts.google.com/icons
// Pexels: https://www.pexels.com/
// Canva: https://www.canva.com/

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