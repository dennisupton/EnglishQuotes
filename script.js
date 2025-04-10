let quotes = [], names = [], set = [], words = [];
let index = 0;

document.querySelector("#start").addEventListener("click", start);

function getQuotesAndPoems(url = 'quotes.json') {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const quotes = Object.keys(data);
            const names = Object.values(data);
            return { quotes, names };
        })
        .catch(error => {
            console.error('Failed to fetch or parse quotes.json:', error);
            return { quotes: [], names: [] };
        });
}

function generateRandomNumbers(amount, min, max) {
    let randomNumbers = [];
    while (randomNumbers.length < amount) {
        let num = getRandomInt(min, max);
        if (!randomNumbers.includes(num)) randomNumbers.push(num);
    }
    return randomNumbers;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

function start() {
    index = 0;
    let blanks = parseInt(document.querySelector("#blanks").value);
    let questions = parseInt(document.querySelector("#questions").value);

    document.querySelector("#main").style.display = 'none';
    document.querySelector("#testing").style.display = 'flex';
    document.querySelector("#progress").max = questions;
    document.querySelector("#progress").value = 0;

    getQuotesAndPoems()
        .then(result => {
            quotes = result.quotes;
            names = result.names;
            set = [...quotes];
            shuffleArray(set);
            set = set.slice(0, questions);
            newCard();
        });
}

function newCard() {
    document.querySelector("#progress").value += 1;
    document.querySelector("#quote").innerHTML = "";
    words = set[index].split(/\s+/);

    document.querySelector("#name").innerHTML = names[quotes.indexOf(set[index])];
    let randoms = generateRandomNumbers(parseInt(document.querySelector("#blanks").value), 0, words.length - 1);
    
    randoms.forEach((item, i) => {
        addInput(words[item], i);
    });

    document.getElementById(inputs[0]).focus();
}

function addInput(text, i) {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.classList.add('word');
    inputField.id = i;
    inputField.autocomplete = "off";
    document.getElementById('quote').appendChild(inputField);
}

document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.code === 'Space') {
        const focusedElement = event.target;
        if (focusedElement) {
            focusedElement.style.color = '#d1abff';
            focusedElement.value = words[focusedElement.id];
            focusedElement.style.border = 'none';
            nextInput(focusedElement.id);
        }
    }
});

function nextInput(item) {
    if (document.getElementById(inputs[inputs.indexOf(item) + 1])) {
        inputs.splice(inputs.indexOf(item), 1);
        document.getElementById(inputs[inputs.indexOf(item) + 1]).focus();
    } else {
        setTimeout(() => {
            if (index < set.length - 1) {
                index += 1;
                newCard();
            } else {
                index = 0;
                document.querySelector("#main").style.display = 'flex';
                document.querySelector("#testing").style.display = 'none';
            }
        }, 500);
    }
}
