/**
 * Shared layout behavior management modules
 */
document.addEventListener("DOMContentLoaded", () => {
    initResponsiveNavigation();
    initVisitorMetricsBanner();
});

function initResponsiveNavigation() {
    const menuButton = document.querySelector("#menuToggleButton");
    const navigationMenu = document.querySelector("#primaryNavigationMenu");

    if (!menuButton || !navigationMenu) return;

    menuButton.addEventListener("click", () => {
        const isMenuExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isMenuExpanded);
        navigationMenu.classList.toggle("open");
    });
}

function initVisitorMetricsBanner() {
    const messageBox = document.querySelector("#visitor-message-box");
    if (!messageBox) return;

    const currentTimestamp = Date.now();
    const lastVisitValue = localStorage.getItem("atlanticLastVisitDate");

    if (!lastVisitValue) {
        messageBox.innerHTML = `
            <div class="visitor-alert-banner">
                Welcome to Atlantic Medical! Explore our services online. 👋
            </div>`;
    } else {
        const previousTimestamp = parseInt(lastVisitValue, 10);
        const timeDifferenceMs = currentTimestamp - previousTimestamp;
        const oneFullDayMs = 24 * 60 * 60 * 1000;

        if (timeDifferenceMs < oneFullDayMs) {
            messageBox.innerHTML = `
                <div class="visitor-alert-banner">
                    Welcome back! Let's get your medical metrics organized today. ⚡
                </div>`;
        } else {
            const calculatedDays = Math.floor(timeDifferenceMs / oneFullDayMs);
            const grammarNoun = calculatedDays === 1 ? "day" : "days";
            messageBox.innerHTML = `
                <div class="visitor-alert-banner">
                    Welcome back. Your last visit was ${calculatedDays} ${grammarNoun} ago.
                </div>`;
        }
    }
    localStorage.setItem("atlanticLastVisitDate", currentTimestamp);
}