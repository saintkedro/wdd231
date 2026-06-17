document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get("fullName");
    const phone = urlParams.get("phoneNumber");
    const email = urlParams.get("emailAddress");
    const date = urlParams.get("appointmentDate");
    const dept = urlParams.get("department");
    const notes = urlParams.get("clinicalNotes");

    // Check if form data exists
    if (name) {
        document.getElementById("displayFullName").textContent = name;
        document.getElementById("displayPhone").textContent = phone;
        document.getElementById("displayEmail").textContent = email ? email : "Not provided";
        document.getElementById("displayDate").textContent = date;
        document.getElementById("displayDepartment").textContent = dept;
        
        if (notes && notes.trim() !== "") {
            document.getElementById("displayNotes").textContent = notes;
        }
    } else {
        // Display fallback error text
        const container = document.querySelector(".receipt-data-payload");
        if (container) {
            container.innerHTML = `<p class="error-payload-message">⚠️ No appointment data found. Please schedule using our form.</p>`;
        }
    }
});