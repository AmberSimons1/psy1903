// Initialize an empty array you will populate with your conditions
let conditions = [];

for (let i = 0; i < 3; i++) {
    let randomNum1 = getRandomNumber(1, 10);
    let randomNum2 = getRandomNumber(1, 10);
    let numbers = {
        num1: randomNum1,
        num2: randomNum2,
        answer: randomNum1 + randomNum2
    };
    conditions.push(numbers);
}
// Output the resulting conditions array to make sure it is set up correctly
console.log(conditions);


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

