document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.querySelector('#nav-button');
    const navMenu = document.querySelector('#navMenu');

    // Toggle interaction event handler tracking panel loop state
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navMenu.classList.toggle('open');
    });
});