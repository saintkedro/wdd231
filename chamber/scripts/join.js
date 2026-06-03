document.addEventListener("DOMContentLoaded", () => {
    // 1. Capture and Inject Native Epoch Lifecycle Timestamp Parameters
    const hiddenTimestampField = document.getElementById("formTimestamp");
    if (hiddenTimestampField) {
        hiddenTimestampField.value = new Date().toISOString();
    }

    // 2. Modal Interface Engine Routing
    const triggerButtons = document.querySelectorAll(".modal-trigger-btn");
    
    triggerButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);
            
            if (targetModal) {
                targetModal.showModal(); // Opens modal natively via focus tracking loop
            }
        });
    });

    // Attach native close loop routine processing to all dialog close actions
    const closeButtons = document.querySelectorAll(".close-modal-btn");
    closeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const activeModal = event.target.closest("dialog");
            if (activeModal) {
                activeModal.close();
            }
        });
    });

    // Close window option if user clicks outside the modal boundary box area
    const modals = document.querySelectorAll(".benefit-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});