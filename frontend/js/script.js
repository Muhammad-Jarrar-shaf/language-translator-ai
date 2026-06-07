const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");

const sourceLanguage = document.getElementById("source-language");
const targetLanguage = document.getElementById("target-language");

const translateBtn = document.getElementById("translate-btn");
const copyBtn = document.getElementById("copy-btn");
const swapBtn = document.getElementById("swap-btn");

const loader = document.getElementById("loader");
const charCounter = document.getElementById("char-counter");
const historyList = document.getElementById("history-list");

let translationHistory = [];

/*
----------------------------------
Character Counter
----------------------------------
*/

inputText.addEventListener("input", () => {
    charCounter.textContent = inputText.value.length;
});

/*
----------------------------------
Swap Languages
----------------------------------
*/

swapBtn.addEventListener("click", () => {

    const temp = sourceLanguage.value;

    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = temp;

});

/*
----------------------------------
Translate Button
----------------------------------
*/

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    // Show loader
    loader.style.display = "flex";

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/translate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text,
                    source_lang: sourceLanguage.value,
                    target_lang: targetLanguage.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Translation failed."
            );
        }

        outputText.value = data.translated_text;

        translationHistory.unshift({
            original: text,
            translated: data.translated_text
        });

        translationHistory = translationHistory.slice(0, 5);

        renderHistory();

    } catch (error) {

        console.error(error);

        alert(error.message);

    } finally {

        // Hide loader
        loader.style.display = "none";

    }

});

/*
----------------------------------
Copy Translation
----------------------------------
*/

copyBtn.addEventListener("click", async () => {

    if (!outputText.value) return;

    try {

        await navigator.clipboard.writeText(
            outputText.value
        );

        copyBtn.textContent = "✓ Copied";

        setTimeout(() => {

            copyBtn.textContent =
                "Copy Translation";

        }, 2000);

    } catch (error) {

        console.error(error);

        alert("Failed to copy text.");

    }

});

/*
----------------------------------
Render Translation History
----------------------------------
*/

function renderHistory() {

    historyList.innerHTML = "";

    translationHistory.forEach(item => {

        historyList.innerHTML += `
            <div class="history-item">
                <div class="history-original">
                    ${item.original}
                </div>

                <div class="history-translated">
                    ${item.translated}
                </div>
            </div>
        `;
    });

}