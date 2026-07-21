/** Calcite demo application boilerplate functionality - not related to demo content */

const toggleModeEl = document.getElementById("toggle-mode");
const toggleModalEl = document.getElementById("toggle-modal");

const panelEl = document.getElementById("sheet-panel");
const modalEl = document.getElementById("modal");
const fuelTypeSelect = document.querySelector("#fuel-type-select");

let mode = "light";

toggleModeEl.addEventListener("click", () => handleModeChange());
toggleModalEl.addEventListener("click", () => handleModalChange());

function handleModeChange() {
  mode = mode === "dark" ? "light" : "dark";
  const isDarkMode = mode === "dark";
  toggleModeEl.icon = isDarkMode ? "moon" : "brightness";
  document.body.className = isDarkMode ? "calcite-mode-dark" : "calcite-mode-light";
}

function handleModalChange() {
  modalEl.open = !modalEl.open;
}