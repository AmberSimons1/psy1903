/*
let feedback = 'correct';
let responseTime = 2.4;
let answer = 25;

alert('you are ' + feedback + '. Answer: ' + answer);
alert(`you are ${feedback}. Answer: ${answer}.`);
*/
/*
//Part 1. Functions
//One of the numbers this is returning is 104? Why
let num1 = getRandomNumber(1, 10);
let num2 = getRandomNumber(10, 100);

console.log(num1);
console.log(num2);

displayRandomNumber();

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min
    return randomNumber
}

function displayRandomNumber() {
    alert(getrandomNumber(1, 10));
}
*/
/*
//Arrays
// An Array of Numbers
let ages = [45, 23, 28, 35, 35];

// An Array of Strings
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

// An Array can contain other Arrays
let numbers = [1, 2, 3, [8, 9, 10]];

// An Array of mixed data types
let mixed = ['a', 'b', 1, 2, [true, false]];

//get something at specific index
//positions start at 0
console.log(names[0]);

//to replace values
names[1] = 'Bob';

//add new name to end of array use push methof
names.push('Sara');
//add to beginning
names.unshift('Amber');

console.log(names);
*/

/*
//Part 3 Loops
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

//Create new array with just the A names of names
let namesStartA = [];
for (let name of names) {
    if (name.charAt(0) == 'A') {
        namesStartA.push(name);
    }
}
console.log(namesStartA);
*/
/* 
// Part 4 Numerical for loops 
//put answers in an array
let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let answer = num1 + num2;
    let start = Date.now();
    let response = prompt(`What is  ${num1} + ${num2}?`);
    let end = Date.now();
    let time = (end - start) / 1000;
    let feedback = ""

    if (response == num1 + num2) {
        feedback = "correct";
    } else {
        feedback = "incorrect";
    }

    //object


    // an array for each individual trial with feedback and time - nested arrays
    //this is an object within an array
    results.push({
        response: response,
        answer: answer,
        feedback: feedback,
        time: time
    });

    alert(`You answered ${response} (${feedback}) in ${time} seconds`);

}
console.log(results);
*/
/* 
//Part 5 objects
let participantA = ['Alice', 21, true]

let participantB = { name: 'Alice', age: 21, consent: true }
participantB.consent = false; //changes consent to false
participantA.startTime = '2:00pm'//adds new key value pair to object
delete participantB.age; //to delete a key value pair 


console.log(participantB);

if (participantB.consent) {

}

*/
/*
//often objects are defined on multiple lines
let person = {
    // Strings
    firstName: 'Elliot',
    lastName: 'Brown',

    // Number
    age: 30,

    // Array
    hobbies: ['reading', 'gaming', 'hiking'],

    // Nested Object
    address: {
        street: '324 Western Ave',
        city: 'Cambridge',
        zipCode: '02139'
    },

    // Functions
    // Observe how the keyword *this* is used in functions to reference other properties within this object
    getFullName: function () {
        return `${this.firstName} ${this.lastName}`;
    },

    greet: function () {
        return `Hello, my name is ${this.getFullName()} and I am ${this.age} years old.`;
    },

    getAddress: function () {
        return `I live at ${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
    },

    getHobbies: function () {
        return `My hobbies include ${this.hobbies.join(', ')}`;
    }
};

// Testing the functions, accessed via dot notation and invoked with parenthesis
console.log(person.greet()); // Hello, my name is Elliot Brown and I am 30 years old.

console.log(person.getAddress()); // I live at 324 Western Ave, Cambridge 02139
console.log(person.getHobbies()); // My hobbies include reading, gaming, hiking

// Testing the properties
console.log(person.firstName); // Elliot
console.log(person.age); // 30

 */





function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min
    return randomNumber
}