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


let primeOptions = [
    {
        title: 'Queer',
        story: `A genderfluid bisexual person has been struggling with her mental health.
                They have been feeling very stressed and anxious in a way that is beginning 
                to impact their daily life. She has also started noticing some physical
                manifestationsof her anxiety such as chest tightness and shortness of breath.
                Although they have had many of these symptoms their whole life, they have been
                more challenging to manage recently.`
    },
    {
        title: 'CisHet',
        story: `A cisgender straight woman has been struggling with her mental health.
                She has been feeling very stressed and anxious in a way that is beginning
                to impact her daily life. She has also started noticing some physical
                manifestations of her anxiety such as chest tightness and shortness of breath.
                Although she has had many of these symptoms her whole life, they have been more
                challenging to manage recently.`
    },
    {
        title: 'Control',
        story: `A person has been struggling with their mental health. This person has been 
                feeling very stressed and anxious in a way that is beginning to impact daily life.  
                The person has also started noticing some physical manifestations of anxiety such 
                as chest tightness and shortness of breath. Although this person has had many of  
                these symptoms their whole life, the symptoms have been more challenging to manage 
                recently.`
    }
];

let primer = primeOptions[getRandomNumber(0, 2)];

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

//Define a variable named “likertScale” which includes likert scale response options
//Define a questionnaire section
//Uses the jsPsychSurveyLikert 
/*Use the Preamble parameter to add the H1 “task 2 of 3” and the instructions “Please answer the following questions.”*/
/*Define the questions parameter which contains an array of objects that have the question and sets the labels using the likertScale variable*/
//Set data collect to true 
//Push the questionnaire section to the timeline 

//Define a task 3 welcome page
//Uses jsPsychHtmlKeyboardResponse plugin
//Includes the H1 task 3 of 3
/*Includes the text “in this final task, you will be shown a series of words and asked to sort them into categories. Press the SPACE key to begin.”
// Use CSS and <span> to make the word “space” look like a key
// Add the task 3 welcome page to the timeline 

//Use a for loop to iterate through each block in the conditions
/*Start by defining the variables leftCategory and rightCategory and accessing the category in block.categories[] */
//Define a variable count that should be set to 1 and will be used for each part

//Define an instructions page
//Uses jsPsychHtmlKeyboardResponse plugin
/*Includes the instructions: 
Part *count*
In this part the two categories will be: *leftCategory* and *rightCategory*
If the word you see in the middle of the screen should be sorted into the *left category* press the F key.
If the word should be sorted into the *rightCategory* press the J key.
Press the SPACE key to begin… 
*/
/*the word “space” and the letters “F” and “J” should use CSS and the span element to look like keys*/
//Add the instructions to the timeline 
//count++;

//Add another for loop to iterate through block.trials 
//Define a trial
//Uses jsPsychKeyboardResponse plugin
//The stimulus is the trial.word
//The key choices are F and J 
//reminder with left category (press F) and the right category (press J) should be in the left and right corners and above the word using css
/*Add a data: {} with collect: true, trialType: ‘iat’, word: trial.word,              expectedCategory: trial.expectedCategory, expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed, leftCategory: leftCategory,rightCategory: rightCategory, whichPrime: it.title */
//This will make it so that the data for the trial is collected and add the other categories
//Add an on_finish function
//Includes an if statement
//If data.response == trial.expectedResponse
//data.correct = true
//Else data.correct = false
//Add the trial to the timeline 

//Define a fixation trial
//Uses jsPsychHtmlKeyboardResponse plugin 
//The stimulus is a + 
//Set the trial_duration to 250 ms
//Set the choices to ‘NO KEY’
//Push the fixation trial to the timeline
/*this will repeat 36 times before moving on to the next block (change this in conditions file)*/

/*Next there will be a results trial which will generate a page that tells the participant to please wait while we are saving the results of their input. It will also have a spiny thing on the page. This will use the code given to us for the results trial*/

//Define a debrief trial
/*instructions will say Thank You! The experiment is now complete; you can close this tab*/
// Choices should be NO KEY
//Push the debrief trial to the timeline

jsPsych.run(timeline);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
