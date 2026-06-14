/**
 * Asynchronous Data Directory Rendering Framework
 */
let laboratoryCatalogCache = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchDiagnosticMasterCatalog();
    initFilterInteractionListeners();
});

async function fetchDiagnosticMasterCatalog() {
    const catalogDataPath = "data/services.json";
    const contentGrid = document.querySelector("#servicesGridContainer");

    if (!contentGrid) return;

    try {
        const networkResponse = await fetch(catalogDataPath);
        if (!networkResponse.ok) {
            throw new Error(`HTTP Disconnect: ${networkResponse.status}`);
        }
        
        laboratoryCatalogCache = await networkResponse.json();
        generateServiceItemCards(laboratoryCatalogCache);

    } catch (criticalError) {
        console.error("Directory data fetch failure:", criticalError);
        contentGrid.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--accent-red);">
                <p>Unable to retrieve diagnostics directory. Please visit our center or call us directly.</p>
            </div>`;
    }
}

function generateServiceItemCards(servicesList) {
    const contentGrid = document.querySelector("#servicesGridContainer");
    if (!contentGrid) return;

    contentGrid.innerHTML = "";

    servicesList.forEach(serviceItem => {
        const cardElement = document.createElement("div");
        cardElement.className = "service-item-card";
        
        cardElement.innerHTML = `
            <div>
                <span style="font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight:700;">${serviceItem.category}</span>
                <h3>${serviceItem.name}</h3>
                <p class="service-price">${serviceItem.price}</p>
                <p style="font-size: 0.85rem; color: #475569; margin-top: auto;">🕒 Turnaround: ${serviceItem.time}</p>
            </div>
            <button type="button" class="card-view-details-btn" data-id="${serviceItem.id}">
                View Preparation Metrics
            </button>
        `;
        contentGrid.appendChild(cardElement);
    });

    initModalTriggerBindings();
}

function initModalTriggerBindings() {
    const detailButtons = document.querySelectorAll(".card-view-details-btn");
    const structuralModalNode = document.querySelector("#testDetailsModal");

    detailButtons.forEach(buttonElement => {
        buttonElement.addEventListener("click", () => {
            const targetItemId = buttonElement.getAttribute("data-id");
            const isolatedItemDetails = laboratoryCatalogCache.find(item => item.id === targetItemId);

            if (isolatedItemDetails && structuralModalNode) {
                document.querySelector("#modalTestName").textContent = isolatedItemDetails.name;
                document.querySelector("#modalTestCategory").textContent = isolatedItemDetails.category;
                document.querySelector("#modalTestPrice").textContent = isolatedItemDetails.price;
                document.querySelector("#modalTestTime").textContent = isolatedItemDetails.time;
                document.querySelector("#modalTestPrep").textContent = isolatedItemDetails.preparation;

                structuralModalNode.showModal();
            }
        });
    });

    const closeModalBtn = document.querySelector("#closeModalButton");
    if (closeModalBtn && structuralModalNode) {
        closeModalBtn.addEventListener("click", () => {
            structuralModalNode.close();
        });
    }
}

function initFilterInteractionListeners() {
    const actionButtons = document.querySelectorAll(".filter-btn");

    actionButtons.forEach(button => {
        button.addEventListener("click", () => {
            actionButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const targetedGroupKey = button.getAttribute("data-category");

            if (targetedGroupKey === "all") {
                generateServiceItemCards(laboratoryCatalogCache);
            } else {
                const filteredSubset = laboratoryCatalogCache.filter(item => item.category === targetedGroupKey);
                generateServiceItemCards(filteredSubset);
            }
        });
    });
}