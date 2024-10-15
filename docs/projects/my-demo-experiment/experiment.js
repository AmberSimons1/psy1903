// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];

console.log(conditions[0].categories[0])

for (let block of conditions) {
    console.log(block)

    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    console.log('leftCategory ' + leftCategory);
    console.log('rightCategory ' + rightCategory);

    for (let trial of block.trials) {


        let example = {
            jsPsychHtmlKeyboardResponse,
            stimulus: ',,,',
            data: {

                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory,
                whichPrime: it.title
            },
            choices: [' '],

            //on_finish: function(data) {
            //if data.response == trial.expectedResponse
            //data.correct = true
            //else 
            //data.correct = false
        }

    }
}

let hello = []

let object1 = {
    title: "1",
    story: "Hello 1"
}
hello.push(object1)

let object2 = {
    title: "2",
    story: "Hello 2"
}
hello.push(object2)
let it = hello[getRandomNumber(0, 1)]



function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}