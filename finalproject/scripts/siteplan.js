/**
 * Atlantic Medical Diagnostics - Site Plan Interactive Module
 * Controls rendering toggle switches between viewport layout wireframes.
 */

document.addEventListener("DOMContentLoaded", () => {
    const mobileButton = document.getElementById("showMobileBtn");
    const desktopButton = document.getElementById("showDesktopBtn");
    
    const mobileBlock = document.getElementById("wireframeMobileBlock");
    const desktopBlock = document.getElementById("wireframeDesktopBlock");

    if (!mobileButton || !desktopButton || !mobileBlock || !desktopBlock) return;

    // Viewport Toggle Engine Execution Block
    mobileButton.addEventListener("click", () => {
        mobileButton.classList.add("active");
        desktopButton.classList.remove("active");
        
        mobileBlock.classList.remove("hidden");
        desktopBlock.classList.add("hidden");
    });

    desktopButton.addEventListener("click", () => {
        desktopButton.classList.add("active");
        mobileButton.classList.remove("active");
        
        desktopBlock.classList.remove("hidden");
        mobileBlock.classList.add("hidden");
    });
});