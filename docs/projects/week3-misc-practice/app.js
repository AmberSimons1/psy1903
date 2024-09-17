// best solution for doing this 
//Misc Practice A
/*
let num1 = Math.floor(Math.random() * 10);
let num2 = Math.floor(Math.random() * 10);
let correctAnswer = num1 + num2;

let response = prompt("What is " + num1 + " + " + num2 + "?");

let feedback = ""

if (response == correctAnswer) {
    feedback = "You got it correct! ";
} else if (response == (correctAnswer + 1) || response == (correctAnswer - 1)) {
    feedback = "You were close! ";
}
else {
    feedback = "You got it incorrect. ";
}

alert(feedback + "The expected answer is " + correctAnswer + "!");
 */

//Misc Practice B
/*
let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
else if (age >= 12 && age < 18) {
    alert('Teenager');
}
else {
    alert('Adult');
}
*/

//Misc Practice C

let answer = prompt("Please enter a whole number");

if ((answer % 2) == 0) {
    alert(answer + " is an even number!");
} else {
    alert(answer + " is an odd number!");
}