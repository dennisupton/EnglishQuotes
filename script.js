var set = [];
var words = [];
var inputs = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

let quotes = [], names = [];

getQuotesAndPoems()
  .then(result => {
    quotes = result.quotes;
    names = result.names;
    handleQuotesAndNames(quotes, names);
  });

function generateRandomNumbers(amount, min, max) {
    let randomNumbers = [];
    for (let i = 0; i < amount; i++) {
        let num = getRandomInt(min, max);
        while (randomNumbers.includes(num)) {
            num = getRandomInt(min, max);
        }
        randomNumbers.push(num);
    }
    return randomNumbers;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

let index = 0;

document.querySelector("#start").addEventListener("click", start);

function start() {
    index = 0;
    //Setting quiz options
    let blanks = parseInt(document.querySelector("#blanks").value);
    let questions = parseInt(document.querySelector("#questions").value);
    //changing web layout
    document.querySelector("#main").style.display = 'none';
    document.querySelector("#testing").style.display = 'flex';
    document.querySelector("#progress").max = questions;
    document.querySelector("#progress").value = 0;
    //getting quotes
    set = JSON.parse(JSON.stringify(quotes));
    shuffleArray(set);
    set = set.slice(0, questions);
    newCard(blanks);
}

function newCard(blanks) {
    document.querySelector("#progress").value += 1;
    document.querySelector("#quote").innerHTML = "";
    words = set[index].split(/\s+/);
    //getting the name of the poem
    document.querySelector("#name").innerHTML = names[quotes.indexOf(set[index])];

    inputs = [];  

    let randoms = generateRandomNumbers(blanks, 0, words.length - 1);
    let i = 0;
    //going through each word and checking if its one that is being tested
    for (let item of words) {
        if (randoms.includes(i)) {
            addInput(item, i); 
            document.querySelector("#quote").innerHTML += " ";  
        } else {
            document.querySelector("#quote").innerHTML += item + " ";  
        }
        i++;
    }
    document.getElementById(inputs[0]).focus();  // Focus on the first input
    //this adds an event listener to check if anything is right , i might rewrite it as its complexity is stupid but it barely uses any prossesing power
    const elements = document.querySelectorAll('.word');
    elements.forEach(element => {
        element.addEventListener('input', () => {
            for (let item of inputs) {
                document.getElementById(item).value = document.getElementById(item).value.replace(/\s/g, '');
                if (words[item].toLowerCase().replace(/[^a-zA-Z]/g, '') == document.getElementById(item).value.toLowerCase().replace(/[^a-zA-Z]/g, '')) {//making sure it isnt case or chareter sensitive
                    document.getElementById(item).value = words[item];
                    document.getElementById(item).style.border = 'none';
                    nextInput(item);
                }
            }
        });
    });
}
//checking if space is pressed and skipping the input
document.addEventListener('keydown', function(event) {
    if ((event.key === ' ' || event.code === 'Space') && document.querySelector("#testing").style.display == 'flex') {
        const focusedElement = event.target;
        if (focusedElement) {
            focusedElement.style.color = '#d1abff';
            focusedElement.value = words[focusedElement.id];
            focusedElement.style.border = 'none';
            nextInput(parseInt(focusedElement.id));
        }
    }
});
//function to find the next input or quote needed and goign to it
function nextInput(item) {
    if (document.getElementById(inputs[inputs.indexOf(item) + 1])) {
        inputs.splice(inputs.indexOf(item), 1);
        document.getElementById(inputs[inputs.indexOf(item) + 1]).focus();
    } else if (inputs.length >= 2) {
        inputs.splice(inputs.indexOf(item), 1);
        document.getElementById(inputs[1]).focus();
    } else {
        document.getElementById(inputs[inputs.indexOf(item)]).blur();
        setTimeout(function() {
            if (index < set.length - 1) {
                index += 1;
                newCard(document.querySelector("#blanks").value);
            } else {
                index = 0;
                document.querySelector("#main").style.display = 'flex';
                document.querySelector("#testing").style.display = 'none';
            }
        }, 500);
    }
}
//input setup so it has all the right values
function addInput(text, i) {
    const header = document.getElementById('quote');
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.classList.add('word');
    inputField.id = i; 
    inputField.autocomplete = "off";
    inputField.style.padding_right = "0px";
    inputField.style.padding_left = "0px";
    const hiddenText = document.getElementById('hidden-text');
    
    hiddenText.textContent = text;
    inputField.style.width = hiddenText.offsetWidth + 'px';
    inputs.push(i);
    header.appendChild(inputField);
}
