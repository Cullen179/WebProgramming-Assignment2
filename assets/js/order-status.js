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
const orderStatus = document.querySelectorAll('.status');

orderStatus.forEach((item) => {
    let status = item.innerHTML;
    if (status == 'active') {
        item.classList.add('btn-primary');
    } else if (status == 'canceled') {
        item.classList.add('btn-secondary');
    } else if (status == 'delivered') {
        item.classList.add('btn-success');
    } else {
        item.classList.add('btn-warning');
    }
})