document.addEventListener("DOMContentLoaded", () => {
    /* ========================================================================
       1. GLOBAL RUNTIME & INTERACTIVE INTERFACE CONTROLS
       ======================================================================== */
    const navButton = document.getElementById("nav-button");
    const navMenu = document.getElementById("navMenu");

    if (navButton && navMenu) {
        navButton.addEventListener("click", () => {
            navButton.classList.toggle("show");
            navMenu.classList.toggle("open");
        });
    }

    // Dynamic metadata injections
    const yearNode = document.getElementById("currentyear");
    const modNode = document.getElementById("lastModified");
    if (yearNode) yearNode.textContent = new Date().getFullYear();
    if (modNode) modNode.textContent = `Last Modified: ${document.lastModified}`;

    /* ========================================================================
       2. LIVE METEOROLOGICAL API INTEGRATION (WEATHER ENGINE)
       ======================================================================== */
    // OpenWeatherMap Query Parameters (Uyo coordinates applied)
    const lat = "5.0333";
    const lon = "7.9266";
    const apiKey = "506af40b19f27d15ee69a7b9f8f5a46e"; // <-- API key
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function fetchWeatherPipeline() {
        try {
            // Retrieve Current Atmospheric Conditions
            const currentResponse = await fetch(currentWeatherUrl);
            if (!currentResponse.ok) throw new Error("Current weather stream down.");
            const currentData = await currentResponse.json();
            renderCurrentWeather(currentData);

            // Retrieve Extended Forecast Streams
            const forecastResponse = await fetch(forecastWeatherUrl);
            if (!forecastResponse.ok) throw new Error("Forecast weather stream down.");
            const forecastData = await forecastResponse.json();
            renderExtendedForecast(forecastData);

        } catch (error) {
            console.error("Meteorological mapping integration failure:", error);
            const weatherWrap = document.getElementById("weather-wrapper");
            if (weatherWrap) weatherWrap.innerHTML = `<p class="error">Weather feed temporary offline.</p>`;
        }
    }

    function renderCurrentWeather(data) {
        const wrapper = document.getElementById("weather-wrapper");
        if (!wrapper) return;

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        wrapper.innerHTML = `
            <div class="weather-info-box">
                <img src="${iconUrl}" alt="${description}" width="64" height="64">
                <span class="temp-main">${temperature}°C</span>
            </div>
            <p class="weather-desc">${description}</p>
        `;
    }

    function renderExtendedForecast(data) {
        const listContainer = document.getElementById("forecast-list");
        if (!listContainer) return;

        listContainer.innerHTML = ""; // Clear loader block text
        
        // OpenWeather Forecast profiles are returned in 3-hour increments.
        // We look for time markers near 12:00 PM to pull stable daily averages.
        const midDayIntervals = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        
        // Take the first 3 chronological entries
        const targetDays = midDayIntervals.slice(0, 3);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        targetDays.forEach(interval => {
            const dateObj = new Date(interval.dt * 1000);
            const dayOfWeek = dayNames[dateObj.getDay()];
            const dayTemp = Math.round(interval.main.temp);

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="forecast-day">${dayOfWeek}</span>
                <span class="forecast-temp">${dayTemp}°C</span>
            `;
            listContainer.appendChild(listItem);
        });
    }

    /* ========================================================================
       3. RANDOMIZED BUSINESS SPOTLIGHT PROCESSING (JSON ENGINE)
       ======================================================================== */
    const spotlightWrapper = document.getElementById("spotlight-wrapper");
    const jsonUrl = "data/members.json";

    async function fetchSpotlightPipeline() {
        if (!spotlightWrapper) return;

        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error("Local dataset path missing.");
            const completeMembersList = await response.json();
            
            // Filter array contents to pull out Gold (Tier 3) and Silver (Tier 2) members
            const premiumMembers = completeMembersList.filter(member => member.level === 2 || member.level === 3);
            
            // Randomize and select exactly 3 spotlight cards
            const randomlySelectedMembers = shuffleAndExtract(premiumMembers, 3);
            renderSpotlightCards(randomlySelectedMembers);

        } catch (error) {
            console.error("Showcase allocation error logic failure:", error);
            spotlightWrapper.innerHTML = `<p>Showcase directory data currently unavailable.</p>`;
        }
    }

    // Fisher-Yates array shuffle implementation
    function shuffleAndExtract(array, quantity) {
        const workingCopy = [...array];
        for (let i = workingCopy.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [workingCopy[i], workingCopy[randomIndex]] = [workingCopy[randomIndex], workingCopy[i]];
        }
        return workingCopy.slice(0, quantity);
    }

    function renderSpotlightCards(selectedMembers) {
        spotlightWrapper.innerHTML = ""; // Clear loader container tree

        selectedMembers.forEach(company => {
            const tierClass = company.level === 3 ? "gold-card" : "silver-card";
            const tierLabel = company.level === 3 ? "Gold Member" : "Silver Member";
            
            const cardElement = document.createElement("div");
            cardElement.classList.add("spotlight-card", tierClass);
            
            cardElement.innerHTML = `
                <span class="spotlight-badge">${tierLabel}</span>
                <img src="${company.image}" alt="${company.name} Identity Brand" loading="lazy" width="70" height="70">
                <h3>${company.name}</h3>
                <p class="tagline"><em>"${company.tagline}"</em></p>
                <hr style="border:0; border-top:1px solid #eee; margin:0.75rem 0;">
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><a href="${company.website}" target="_blank" rel="noopener" style="color:var(--secondary); text-decoration:none; font-weight:500;">Visit Website</a></p>
            `;
            spotlightWrapper.appendChild(cardElement);
        });
    }

    /* ========================================================================
       4. CONSOLIDATED STARTUP TRIGGER
       ======================================================================== */
    fetchWeatherPipeline();
    fetchSpotlightPipeline();
});