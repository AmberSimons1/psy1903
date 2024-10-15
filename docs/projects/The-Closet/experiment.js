// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];

// Define a welcome screen
// Uses the jsPsychHtmlKeyboardResponse plugin
// Includes a welcome message with the following content: 
/*Welcome to our IAT!
In this experiment, you will complete the following three tasks:
In task 1 you will be asked to read a short story.
In task 2 you will answer a brief set of questions.
In task 3 you will be asked to categorize a series of words. 
Press the SPACE key to begin
*/
// Use CSS and <span> to make the word “space” look like a key
// Adds the welcome screen to the timeline

// Define the array of objects that contains the priming objects
/* 
let primeOptions = [
    {
        title: 'Queer',
        story: ` A genderfluid bisexual person has been having a very difficult time with their mental health recently. 
        She has been having feelings of impending doom and persistent negative thoughts about herself, 
        which leads to greater feelings of sadness and worry. They have also been experiencing physical manifestations of 
        these feelings such as chest tightness and overwhelming fatigue. She has had some of these symptoms for most of her 
        life, but has noticed an increased intensity lately. Overall, the anxiety and depression they have been facing have been 
        challenging to manage.`
    },
    {
        title: 'CisHet',
        story: `A cisgender straight person has been having a very difficult time with her mental health recently. She has been
         having feelings of impending doom and persistent negative thoughts about herself, which leads to greater feelings of sadness
         and worry. She has also been experiencing physical manifestations of these feelings such as chest tightness and overwhelming fatigue. 
         She has had some of these symptoms for most of her life, but has noticed an increased intensity lately. Overall, the anxiety and 
         depression she has been facing have been challenging to manage.`
    },
    {
        title: 'Control',
        story: `A person has been having a very difficult time with their mental health recently. The person has been having feelings 
        of impending doom and persistent negative self-thoughts, which leads to greater feelings of sadness and worry. 
        This person has also been experiencing physical manifestations of these feelings such as chest tightness and overwhelming fatigue. 
        The person has had some of these symptoms for most of their life, but has noticed an increased intensity lately. 
        Overall, the anxiety and depression this person has been facing have been challenging to manage.`
    }
];

//randomize which primer is used
let primer = primeOptions[getRandomNumber(0, 2)];

//trial for the primer 
let primingTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Task 1 of 3</h1>
        <p> Please read the following story. When you are done, press the SPACE key to move to the next task </p>
        <p> ${primer.story}
        `,
    choices: [' '],
    data: {
        collect: true,
        whichPrime: primer.title,
    },
};

timeline.push(primingTrial);
*/
//Define an IAT welcome page
let iatWelcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> Task 2 of 3</h1>
    <p> in this final task, you will be shown a series of words and asked to sort them into categories.</p>
    <p> Press the SPACE key to begin. </p> 
    `, //space needs to have key  around it 
    choices: [' '],
};

timeline.push(iatWelcome);

for (let block of conditions) {

    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];
    let count = 1;

    let instructionsPage = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>Part ${count}</h1>
        <p> In this part the two categories will be: ${leftCategory} and ${rightCategory}</p>
        <p> If the word you see in the middle of the screen should be sorted into the ${leftCategory} press the F key.</p>
        <p> If the word should be sorted into the ${rightCategory} press the J key.</p>
        <p> Press the SPACE key to begin </p>`
        //the word “space” and the letters “F” and “J” should use CSS and the span element to look like keys
    };
    timeline.push(instructionsPage);
    count++;

    //another for loop to iterate through the trials of each block
    for (let trial of block.trials) {

        let wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `${trial.word}`,
            choices: ['f', 'j'],
            //reminder with left category (press F) and the right category (press J) should be in the left and right corners and above the word using css
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory,
            },

            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        };
        timeline.push(wordTrial);

        let fixationPage = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '+',
            trial_duration: 250,
            choices: 'NO KEYS'
        }
        timeline.push(fixationPage);
    };
};


//Define a variable named “likertScale” which includes likert scale response options
//Define a questionnaire section
//Uses the jsPsychSurveyLikert 
/*Use the Preamble parameter to add the H1 “task 2 of 3” and the instructions “Please answer the following questions.”*/
/*Define the questions parameter which contains an array of objects that have the question and sets the labels using the likertScale variable*/
//Set data collect to true 
//Push the questionnaire section to the timeline 



/*Next there will be a results trial which will generate a page that tells the participant to please wait while we are saving the results of their input. It will also have a spiny thing on the page. This will use the code given to us for the results trial*/

//Define a debrief trial
/*instructions will say Thank You! The experiment is now complete; you can close this tab*/
// Choices should be NO KEY
//Push the debrief trial to the timeline

jsPsych.run(timeline);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
