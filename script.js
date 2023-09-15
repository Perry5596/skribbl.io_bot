document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('guessButton').addEventListener('click', guessWords);
    document.getElementById('clearButton').addEventListener('click', clearAll);
    document.getElementById('wordLength').addEventListener('change', setLength);
});

class WordGuesser {
    constructor(wordList) {
        this.allWords = wordList;
        this.possibleWords = [];
        this.wordLength = 0;
    }

    setWordLength(length) {
        this.wordLength = length;
        this.possibleWords = this.allWords.filter(word => word.length === this.wordLength);
    }

    filterWords(pattern) {
        const containsSpace = pattern.includes(' ');

        this.possibleWords = this.possibleWords.filter(word => {
            if (containsSpace && !word.includes(' ')) return false;
            if (!containsSpace && word.includes(' ')) return false;

            for (let i = 0; i < this.wordLength; i++) {
                if (pattern[i] !== '_' && pattern[i] !== word[i]) {
                    return false;
                }
            }
            return true;
        });
    }

    getPossibleWords() {
        return this.possibleWords;
    }
}

let guesser;

// Load word list from CSV
fetch('words.csv')
    .then(response => response.text())
    .then(data => {
        const wordList = data.split('\n').slice(1).map(line => line.split(',')[0].toLowerCase());
        guesser = new WordGuesser(wordList);
    });

function setLength() {
    const length = parseInt(document.getElementById('wordLength').value);
    guesser.setWordLength(length);
}

function guessWords() {
    const pattern = document.getElementById('pattern').value.toLowerCase();
    guesser.filterWords(pattern);
    const results = guesser.getPossibleWords();
    document.getElementById('results').innerText = results.join(', ');
}

function clearAll() {
    document.getElementById('wordLength').value = '';
    document.getElementById('pattern').value = '';
    document.getElementById('results').innerText = '';
    guesser.possibleWords = [];
}