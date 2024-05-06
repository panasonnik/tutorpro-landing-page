let sections = document.querySelectorAll('section');
let navbarLinks = document.querySelectorAll('.navbar__item');

window.onscroll = () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 200;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navbarLinks.forEach(link => {
                link.classList.remove('navbar__item--active');
            });
            let matchingLink = document.querySelector(`.navbar__item[href="#${id}"]`);
            if (matchingLink) {
                matchingLink.classList.add('navbar__item--active');
            }
        }
    });
};
