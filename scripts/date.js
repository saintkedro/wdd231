document.addEventListener("DOMContentLoaded", () => {
    // Inject Year parameter dynamically using the exact matching element ID placeholder
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    
    // Inject explicit unmodified last modification metadata parameters string
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
});