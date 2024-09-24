
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

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]

function getWordLengths(words) {
    let newWords = []
    for (let word of words) {
        newWords.push(word.length);
    }
    return newWords
}

