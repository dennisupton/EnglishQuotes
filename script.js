quotes = [
    "Storm'd at with shot and shell",
    "All in the valley of death, Rode the six hundred",
    "Honour the light brigade, noble six hundred",
    "In the merciless iced east winds that knive us",
    "For God's invincible spring our love is made afraid",
    "In what cold clockwork of the stars",
    "king, honour, human dignity, et cetera, dropped like luxuries in a yelling alarm",
    "threw up a yellow hare",
    "blood-shadows stays on the street",
    "his bloody life in my bloody hand",
    "a half-formed ghost, he remembers the cries",
    "till gradually we too learned to be silent",
    "rips through his life",
    "finally alone with spools of suffering",
    "strung out like bunting on a green-blue translucent sea",
    "a flask of water, a samurai sword",
    "but my memory of it is sunlight-clear",
    "As time rolls its tanks and the frontiers rise between us",
    "my city takes me dancing through the city",
    "They do not care, all flesh is grass",
    "spasms of paper red, disrupting a blockade",
    "flattened, rolled, turned into felt, slowly melting, I was brave",
    "song bird from its cage",
    "sneer of cold command",
    "two vast and trunkless legs of stone stand in the desert",
    "of that colossal wreck, boundless and bare, the lone and level sands stretch far away",
    "I gave commands, then all smiles stopped together",
    "dies along her throat",
    "That's my last Duchess painted on the wall",
    "Dem tell me, Dem tell me, Waterloo, de great Zulu",
    "fire-woman struggle hopeful stream to freedom river",
    "she still brave the Russian snow, a healing star",
    "pages smoothed and stroked and turned",
    "The sun shines through their borderlines",
    "might fly our lives like paper kites",
    "In every infant's cry of fear",
    "Every black'ning church apalls",
    "Marks of weakness Marks of woe",
    "this wizened earth has never troubled us",
    "spits like tame cat, turned savage",
    "space is a salvo",
    "The horizon's bound, a huge peak, black and huge",
    "of mountain-echoes did my boat move on",
    "There hung a darkness, call it solitude or blank desertation"
];
const names = [
    "The Charge of the Light Brigade",
    "The Charge of the Light Brigade",
    "The Charge of the Light Brigade",
    "Exposure",
    "The Prelude",
    "The Prelude",
    "Bayonet Charge",
    "Bayonet Charge",
    "War Photographer",
    "War Photographer",
    "Poppies",
    "Poppies",
    "Tissue",
    "War Photographer",
    "Kamikaze",
    "Kamikaze",
    "Kamikaze",
    "The Emigree",
    "The Emigree",
    "The Soldier",
    "Poppies",
    "Poppies",
    "The Prelude",
    "Ozymandias",
    "Ozymandias",
    "Ozymandias",
    "My Last Duchess",
    "My Last Duchess",
    "My Last Duchess",
    "Checking Out Me History",
    "Checking Out Me History",
    "Checking Out Me History",
    "Checking Out Me History",
    "Checking Out Me History",
    "Tissue",
    "London",
    "London",
    "London",
    "Tissue",
    "The Prelude",
    "Tissue",
    "The Prelude",
    "The Prelude"
];

var set = []
words = []

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(amount, min, max) {
    let randomNumbers = [];  
    for (let i = 0; i < amount; i++) {
        num = getRandomInt(min, max)
        while (randomNumbers.includes(num)){
            console.log("giwneg")
            num = getRandomInt(min, max)
        }

        randomNumbers.push(num); 
    }
  
    return randomNumbers;  // Return the list of random numbers
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements
    }
}
index = 0

document.querySelector("#start").addEventListener("click", start);
function start(){
    index = 0
    blanks = parseInt(document.querySelector("#blanks").value)
    questions = parseInt(document.querySelector("#questions").value)
    document.querySelector("#main").style.display = 'none';
    document.querySelector("#testing").style.display = 'flex';
    document.querySelector("#progress").max = questions
    document.querySelector("#progress").value = 0
    set = JSON.parse(JSON.stringify(quotes))
    shuffleArray(set)
    set = set.slice(0, questions);
    newCard()
}
function newCard(){
    document.querySelector("#progress").value +=1
    document.querySelector("#quote").innerHTML = ""
    words = set[index].split(/\s+/);
    console.log(quotes.indexOf(set[index])-1)
    document.querySelector("#name").innerHTML = names[quotes.indexOf(set[index])]
    i = 0
    inputs = []
    randoms = generateRandomNumbers(blanks,0,words.length-1)
    for (let item of words) {
        console.log(item);
        if (randoms.includes(i)){
            addInput(item)
        }
        else{
            document.querySelector("#quote").innerHTML += item
        }
        document.querySelector("#quote").innerHTML += " "
        i+= 1
    }
    document.getElementById(inputs[0]).focus()
    const elements = document.querySelectorAll('.word');
    elements.forEach(element => {
        element.addEventListener('input', () => {
            i = 0
            
            for (let item of inputs) {
                document.getElementById(item).value = document.getElementById(item).value.replace(/\s/g, '');
                if (words[item].toLowerCase() == document.getElementById(item).value.toLowerCase().replace(/[^a-zA-Z]/g, '')){
                    document.getElementById(item).value = words[item]
                    document.getElementById(item).style.border = 'none';
                    nextInput(item)
                    
                }
                i+=1
            }
        });
    });
}
document.addEventListener('keydown', function(event) {
    if ((event.key === ' ' || event.code === 'Space') & document.querySelector("#testing").style.display == 'flex') {
        const focusedElement = event.target; // Get the focused element

        // Check if the focused element is an input or a button
        if (focusedElement) {
            focusedElement.style.color = '#d1abff'; // Change background color to red
            focusedElement.value = words[focusedElement.id]; // Change text content (only for elements like buttons)
            focusedElement.style.border = 'none';
            nextInput(parseInt(focusedElement.id))
        }
    }
});
function nextInput(item){
    if (document.getElementById(inputs[inputs.indexOf(item)+1])){
        inputs.splice(inputs.indexOf(item), 1);
        document.getElementById(inputs[inputs.indexOf(item)+1]).focus()

    }
    else if(inputs.length >= 2){
        console.log(inputs.length )
        inputs.splice(inputs.indexOf(item), 1);
        document.getElementById(inputs[1]).focus()
    }
    else{
        document.getElementById(inputs[inputs.indexOf(item)]).blur()
        console.log("done")
        setTimeout(function() {
            if (index < set.length-1){
                index += 1
                newCard()
    
            }else{
    
                index = 0
                document.querySelector("#main").style.display = 'flex';
                document.querySelector("#testing").style.display = 'none';
            }
        }, 500);
    }
}
function addInput(text){
    const header = document.getElementById('quote');
    const headerText = header.textContent;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.classList.add('word');
    inputField.id = i
    inputField.autocomplete = "off"
    const hiddenText = document.getElementById('hidden-text');
    
    // Set the hidden span to the value of the input box
    hiddenText.textContent = text;
    // Adjust the width of the input box based on the width of the hidden span
    inputField.style.width = hiddenText.offsetWidth + 'px';
    inputs.push(i)
    header.appendChild(inputField);
}
