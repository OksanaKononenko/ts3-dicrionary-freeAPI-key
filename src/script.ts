  //  @ts-ignore
import "./style.css";






// 1. Отримуємо посилання на HTML-елементи за їхніми id
const wordInput = document.getElementById("word-input") as HTMLInputElement | null;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement | null;

const sourceLanguage = document.getElementById("source-language") as HTMLSelectElement | null;
const targetLanguage = document.getElementById("target-language") as HTMLSelectElement | null;
 

// const swapLanguagesBtn =
//   document.getElementById("swap-languages-btn") as HTMLButtonElement | null;

// if (swapLanguagesBtn && sourceLanguage && targetLanguage) {
//   console.log("Кнопка знайдена:", swapLanguagesBtn);

//   swapLanguagesBtn.addEventListener("click", () => {

//     // Запам'ятовуємо слово, яке зараз показане
//     const currentWord = resultWord?.textContent?.trim();

//     // Запам'ятовуємо стару мову
//     const temp = sourceLanguage.value;

//     // Міняємо мови місцями
//     sourceLanguage.value = targetLanguage.value;
//     targetLanguage.value = temp;

//     console.log("Мови поміняно місцями:");
//     console.log("Source:", sourceLanguage.value);
//     console.log("Target:", targetLanguage.value);

//     // Якщо слово є — перекладаємо його в новому напрямку
//     if (currentWord) {
//       translateWord(
//         currentWord,
//         sourceLanguage.value,
//         targetLanguage.value
//       );
//     }
//   });
// }


 
// if (swapLanguagesBtn && sourceLanguage && targetLanguage) {
//   swapLanguagesBtn.addEventListener("click", () => {

//     const temp = sourceLanguage.value;

//     sourceLanguage.value = targetLanguage.value;
//     targetLanguage.value = temp;

//     console.log("Мови поміняно:");
//     console.log("Source:", sourceLanguage.value);
//     console.log("Target:", targetLanguage.value);
//   });
// }

// if (swapLanguagesBtn && sourceLanguage && targetLanguage) {
//   swapLanguagesBtn.addEventListener("click", () => {

//     console.log("ДО:");
//     console.log("Source:", sourceLanguage.value);
//     console.log("Target:", targetLanguage.value);

//     const temp = sourceLanguage.value;

//     sourceLanguage.value = targetLanguage.value;
//     targetLanguage.value = temp;

//     console.log("ПІСЛЯ:");
//     console.log("Source:", sourceLanguage.value);
//     console.log("Target:", targetLanguage.value);
//   });
// }



// const swapLanguagesBtn =
//   document.getElementById("swap-languages-btn") as HTMLButtonElement | null;

// const sourceLanguage =
//   document.getElementById("source-language") as HTMLSelectElement | null;

// const targetLanguage =
//   document.getElementById("target-language") as HTMLSelectElement | null;

// if (swapLanguagesBtn && sourceLanguage && targetLanguage) {

//   swapLanguagesBtn.addEventListener("click", () => {

//     console.log("КНОПКА НАТИСНУТА");

//     console.log("До:");
//     console.log("Source:", sourceLanguage.value);
//     console.log("Target:", targetLanguage.value);

//     const temp = sourceLanguage.value;

//     sourceLanguage.value = targetLanguage.value;
//     targetLanguage.value = temp;

//     console.log("Після:");
//     console.log("Source:", sourceLanguage.value);
//     console.log("Target:", targetLanguage.value);
//   });

// }


const resultContainer = document.getElementById("result-container") as HTMLElement | null;
const resultWord = document.getElementById("result-word") as HTMLElement | null;
const resultDefinition = document.getElementById("result-definition") as HTMLElement | null;

const btmSpeak = document.getElementById("play-audio-btn") as HTMLButtonElement | null;
const speedControl =
  document.getElementById("speed-control") as HTMLInputElement | null;

const speedValue =
  document.getElementById("speed-value") as HTMLElement | null;


const wordsList =
  document.getElementById("words-list") as HTMLUListElement | null;
interface SavedWord {
  word: string;
  translation: string;
  source: string;
  target: string;
}



// Перевіримо у консолі, чи все знайшлося
console.log("Додаток словник успішно запущено!"); 

// Додаємо обробник кліку на кнопку
if (searchBtn && wordInput) {
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми/кнопки
    console.log("Користувач ввів слово для пошуку!");
    console.log("Користувач натиснув кнопку пошуку!");
    // 1. Зчитуємо текст
    const query = wordInput.value.trim();
    console.log(`Користувач шукає слово: ${query}`);
    // 2. Очищаємо поле
    wordInput.value = "";

    // 3. Перевіряємо, чи введено слово, і робимо запит
  if (query !== "") {
 translateWord(
  query,
  sourceLanguage?.value || "uk",
  targetLanguage?.value || "en"
);
 
    } else {
      console.warn("Введіть слово для пошуку!");
    }
  });
}


console.log("Мова оригіналу:", sourceLanguage?.value);
console.log("Мова перекладу:", targetLanguage?.value);

function translateWord(searchWord: string,
  source: string,
  target: string) {
//  @ts-ignore
 const API_KEY = process.env.RAPID_API_KEY;
console.log("Мій ключ успішно підтягнувся:", API_KEY);
  const url =
    "https://deep-translate1.p.rapidapi.com/language/translate/v2";

  console.log(`Робимо запит до сервера для слова: ${searchWord}...`);
console.log("Мова оригіналу:", sourceLanguage?.value);
console.log("Мова перекладу:", targetLanguage?.value);
  fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
     'X-RapidAPI-Key':  API_KEY || '', // підставляється автоматично
    },

    body: JSON.stringify({
      q: searchWord,
       source: source,
  target: target
    })
  })
    .then(response => {
      console.log("Статус:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("Відповідь API:", data);

      const translation =
        data.data.translations.translatedText[0];

saveWord(searchWord, translation, source, target);
      console.log("Переклад:", translation);

if (resultDefinition && resultWord) {
  resultDefinition.textContent = translation;
  resultWord.textContent = searchWord;

// if (btmSpeak) {
//   btmSpeak.onclick = () => {
//     speakText(translation, target);
//   };
// }

if (btmSpeak) {
  btmSpeak.onclick = () => {
    const englishWord = target === "en"
      ? translation
      : searchWord;

    speakText(englishWord, "en-US");
  };
}



}

    })
    .catch(error => {
      console.error("Помилка:", error);
    });
}
// testTranslate();




function speakText(text: string, language: string) {
  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = language;

  const speed = Number(speedControl?.value || null);

  speech.rate = speed;



  window.speechSynthesis.speak(speech);
}

if (speedControl && speedValue) {
  speedControl.addEventListener("input", () => {
    speedValue.textContent = speedControl.value;
  });
}
 
function saveWord(
  word: string,
  translation: string,
  source: string,
  target: string
) {
  const savedWords: SavedWord[] =
    JSON.parse(localStorage.getItem("savedWords") || "[]");

  const newWord: SavedWord = {
    word,
    translation,
    source,
    target
  };

  savedWords.push(newWord);

  localStorage.setItem(
    "savedWords",
    JSON.stringify(savedWords)
  );

  displaySavedWords();
}
function displaySavedWords() {
  if (!wordsList) return;

  const savedWords: SavedWord[] =
    JSON.parse(localStorage.getItem("savedWords") || "[]");

  wordsList.innerHTML = "";

  savedWords.forEach((item, index) => {

    const li = document.createElement("li");

    // Текст слова і перекладу
    const wordText = document.createElement("span");

    wordText.textContent =
      `${item.word} — ${item.translation}`;

    li.appendChild(wordText);


    // 🔊 Озвучка тільки англійського варіанту
if (item.source === "en" || item.target === "en") {

  const englishWord =
    item.source === "en"
      ? item.word
      : item.translation;

  const speakBtn = document.createElement("button");

  speakBtn.textContent = "🔊";
  speakBtn.type = "button";

  speakBtn.addEventListener("click", () => {
    speakText(englishWord, "en");
  });

  li.appendChild(speakBtn);
}


    // 🗑️ Видалення
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "🗑️";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", () => {
      deleteWord(index);
    });

    li.appendChild(deleteBtn);

    wordsList.appendChild(li);
  });
}

function deleteWord(index: number) {

  const savedWords: SavedWord[] =
    JSON.parse(localStorage.getItem("savedWords") || "[]");

  savedWords.splice(index, 1);

  localStorage.setItem(
    "savedWords",
    JSON.stringify(savedWords)
  );

  displaySavedWords();
}


displaySavedWords();



// -------------------------------------------------------------
// Функція для пошуку слова через API Merriam-Webster

// async function fetchWordFromMW(searchWord: string) {
//   const API_KEY = "твій_безкоштовний_ключ";
//   const url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${searchWord}?key=${API_KEY}`;

//   try {
//     console.log(`Робимо запит до сервера для слова: ${searchWord}...`);
    
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       console.warn("Помилка при зверненні до сервера.");
//       return;
//     }

//     const data = await response.json();
//     console.log("Отримані дані від API:", data);

//   } catch (error) {
//     console.error("Помилка мережі:", error);
//   }
// }




// Функція для пошуку слова без async/await (використовуємо .then та .catch)
// function fetchWordFromMW(searchWord: string) {
//   const API_KEY = " безкоштовний_ключ";
//   const url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${searchWord}?key=${API_KEY}`;
  
 
//   console.log(`Робимо запит до сервера для слова: ${searchWord}...`);

//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         console.warn("Помилка при зверненні до сервера.");
//         return;
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data) {
//         console.log("Отримані дані від API:", data);
//       }
//     })
//     .catch(error => {
//       console.error("Помилка мережі:", error);
//     });
// }