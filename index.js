// Select all elements that should animate
const reveals = document.querySelectorAll(".reveal");

// Scroll reveal function
function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

// Run on scroll + page load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// Scroll-to-top button
const topBtn = document.querySelector(".topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    });
});