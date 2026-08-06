// 1. Отримуємо посилання на HTML-елементи за їхніми id
const wordInput = document.getElementById("word-input") as HTMLInputElement | null;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement | null;
const resultContainer = document.getElementById("result-container") as HTMLElement | null;
const resultWord = document.getElementById("result-word") as HTMLElement | null;
const resultDefinition = document.getElementById("result-definition") as HTMLElement | null;

// Перевіримо у консолі, чи все знайшлося
console.log("Додаток словник успішно запущено!");