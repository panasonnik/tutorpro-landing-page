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
function openSidebar() {
    document.querySelector('.navbar__list--sidebar').style.width = "100%";
    document.querySelector('.navbar__list--sidebar').style.right = "0";
    
    document.querySelector('.navbar__close-menu').style.display="block";
}
function closeSidebar() {
    document.querySelector('.navbar__list--sidebar').style.width = "0";
    document.querySelector('.navbar__list--sidebar').style.right = "-250px";
    document.querySelector('.navbar__close-menu').style.display="none";
}
function handleSidebarClick(event) {
    if (event.target.tagName === 'A') {
        closeSidebar();
    }
}

document.querySelectorAll(".pricing__cta-button").forEach(button=> {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector(".container").classList.toggle("blur");

        document.querySelector(".auth-pop-up").classList.toggle("active");
    });
});

document.querySelector(".pop-up__close-btn").addEventListener('click',function() {
    document.querySelector(".container").classList.toggle("blur");
    document.querySelector(".auth-pop-up").classList.toggle("active");
});

document.querySelector(".pop-up__close-sign-in-btn").addEventListener('click',function() {
    document.querySelector(".sign-in-pop-up").classList.toggle("active");
    document.querySelector(".container").classList.toggle("blur");
});

document.querySelector(".pop-up__link").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".auth-pop-up").classList.toggle("active");
    document.querySelector(".sign-in-pop-up").classList.toggle("active");
});

