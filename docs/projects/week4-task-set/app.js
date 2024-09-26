
/*
//Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 1.8) + 32;
}

console.log(celsiusToFahrenheit(10)); //50
console.log(celsiusToFahrenheit(-5)); //23
*/

/* 
//Convert Temp
function convertTemp(temp, convertTo) {

    if (convertTo == 'c') {
        return (temp - 32) / 1.8
    } else {
        return (temp * 1.8) + 32
    }
}
console.log(convertTemp(10, 'c')); //-12.222222222222221
console.log(convertTemp(10, 'f')); //50
*/

/* 
let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]

function getWordLengths(words) {
    let newWords = []
    for (let word of words) {
        newWords.push(word.length);
    }
    return newWords
}
*/

/* 
function getLongestWord(words) {

    let longestWord = ""
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word
        }
    }
    return longestWord;
}

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getLongestWord(words)); // Expected output: banana
*/

/* 
console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
console.log(getOddNumbers([12, 45, 10, 11, 61])); // Expected output: [45, 11, 61]

function getOddNumbers(nums) {
    let results = [];
    for (let num of nums) {
        if (num % 2 != 0) {
            results.push(num);
        }
    }
    return results;
}
*/

/* 
function filterNumbers(nums, type) {
    let results = [];
    for (let num of nums) {
        if (type == 'even' & num % 2 == 0) {
            results.push(num);
        } else if (type == 'odd' & num % 2 != 0)
            results.push(num);
    }
    return results;
}

console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

console.log(filterNumbers([45, 10, 11, 61, 20, 40, 46, 43], 'even')); // Expected output: [10]
console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]
*/

alert(`Hello! Welcome to the Experiment! 
There will be 5 trials.
In each trial you will see a different random number.
Please respond whether it is even (type “e”) or odd (type “o”).`)

let results = [];

for (i = 0; i < 5; i++) {
    let answers = {};
    let responses = '';

    let num = getRandomNumber(1, 20);
    let time1 = Date.now();

    responses = prompt(num);

    let time2 = Date.now();
    let totalTime = (time2 - time1) / 1000;

    let correct = false;
    if ((responses == 'e' & num % 2 == 0) || (responses == 'o' & num % 2 != 0)) {
        correct = true;
    }

    answers.response = responses;
    answers.number = num;
    answers.correct = correct;
    answers.responseTime = totalTime;

    results.push(answers);
}

console.log(results);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}
