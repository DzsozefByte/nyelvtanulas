const words = [
    {hu: "alma", en: "apple"},
    {hu: "szék", en: "chair"},
    {hu: "kéz", en: "hand"},
    {hu: "egér", en: "mouse"},
    {hu: "templom", en: "church"},
    {hu: "sétál", en: "walk"},
    {hu: "függöny", en: "curtain"},
    {hu: "cipő", en: "shoes"},
];

document.getElementById('startbutton').addEventListener('click', startGame);

function startGame() {
    document.getElementById('game').style.display = 'block';
    const hungarianDiv = document.getElementById('hungarian');
    const englishDiv = document.getElementById('english');
    const huWordDisplay = document.getElementById('hu-word');
    const enWordDisplay = document.getElementById('en-word');

    hungarianDiv.innerHTML = '';
    englishDiv.innerHTML = '';
    huWordDisplay.textContent = '';
    enWordDisplay.textContent = '';

    words.forEach((word, index) => {
        const huButton = createButton(word.hu, 'hu', index);
        const enButton = createButton(word.en, 'en', index);
        hungarianDiv.appendChild(huButton);
        englishDiv.appendChild(enButton);
    });
}

function createButton(text, lang, index) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'word-button';
    button.setAttribute('data-index', index);
    button.addEventListener('click', () => handleButtonClick(button, lang, index));
    return button;
}

let selectedHuIndex = null;
let selectedEnIndex = null;

function handleButtonClick(button, lang, index) {
    const huWordDisplay = document.getElementById('hu-word');
    const enWordDisplay = document.getElementById('en-word');

    if (lang === 'hu') {
        selectedHuIndex = index;
        huWordDisplay.textContent = button.textContent;  // Update the selected Hungarian word
    } else {
        selectedEnIndex = index;
        enWordDisplay.textContent = button.textContent;  // Update the selected English word
    }

    if (selectedHuIndex !== null && selectedEnIndex !== null) {
        checkMatch(selectedHuIndex, selectedEnIndex);
        selectedHuIndex = null;
        selectedEnIndex = null;
    }
}

function checkMatch(huIndex, enIndex) {
    if (words[huIndex].en === words[enIndex].en) {
        // Correct match
        document.querySelector(`button[data-index='${huIndex}']`).classList.add('correct');
        document.querySelector(`button[data-index='${enIndex}']`).classList.add('correct');
    } else {
        // Incorrect match
        const huButton = document.querySelector(`button[data-index='${huIndex}']`);
        const enButton = document.querySelector(`button[data-index='${enIndex}']`);
        
        huButton.classList.add('wrong');
        enButton.classList.add('wrong');

        setTimeout(() => {
            huButton.classList.remove('wrong');
            enButton.classList.remove('wrong');
        }, 1000);
    }
}
