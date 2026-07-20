// ======================================
// SETTINGS.JS
// ======================================

// ---------- Elements ----------
const settingsBtn = document.getElementById("settingsBtn");
const settingsPopup = document.getElementById("settingsPopup");
const closeSettings = document.getElementById("closeSettings");
const saveSettings = document.getElementById("saveSettings");

const themeCards = document.querySelectorAll(".theme-card");

// ---------- Selected Theme ----------
let selectedTheme = localStorage.getItem("theme") || "dark";

// ---------- Open Popup ----------
settingsBtn.addEventListener("click", () => {

    settingsPopup.style.display = "flex";

});

// ---------- Close Popup ----------
closeSettings.addEventListener("click", () => {

    settingsPopup.style.display = "none";

});

settingsPopup.addEventListener("click", (e) => {

    if (e.target === settingsPopup) {

        settingsPopup.style.display = "none";

    }

});

// ---------- Highlight Saved Theme ----------
themeCards.forEach(card => {

    if (card.dataset.theme === selectedTheme) {

        card.classList.add("active");

    }

});

// ---------- Theme Card Click ----------
themeCards.forEach(card => {

    card.addEventListener("click", () => {

        document.querySelector(".theme-card.active")?.classList.remove("active");

        card.classList.add("active");

        selectedTheme = card.dataset.theme;

    });

});

// ---------- Save ----------
saveSettings.addEventListener("click", () => {

    localStorage.setItem("theme", selectedTheme);

    applyTheme(selectedTheme);

    settingsPopup.style.display = "none";

});

// ---------- Apply Theme ----------
function applyTheme(theme) {

    document.body.classList.remove(
        "dark-theme",
        "light-theme",
        "pink-theme",
        "orange-theme",
        "purple-theme",
        "emerald-theme",
        "crimson-theme",
        "ocean-theme"
    );

    document.body.classList.add(theme + "-theme");

}

// ---------- Load Theme ----------
applyTheme(selectedTheme);



//header

