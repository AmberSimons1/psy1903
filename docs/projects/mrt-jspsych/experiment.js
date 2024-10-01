// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];


// Define a welcome trial using jsPsych’s jsPsychHtmlKeyboardResponse plugin
let welcomeTrial = {
    // Indicate the plugin type we’re using
    type: jsPsychHtmlKeyboardResponse,

    // What content to display on the screen
    stimulus: `
    <h1>Welcome to the Lexical Decision Task!</h1> 
    <p>You are about to see a series of characters.</p>
    <p>If the characters make up a word, press the F key.</p>
    <p>If the characters do not make up a word, press the J key.</p>
    <p>Press SPACE to begin.</p>
    `,

    // Listen for the SPACE key to be pressed to proceed
    choices: [' '],
};

// Add the welcome trial to our timeline
timeline.push(welcomeTrial);

// Run the experiment
jsPsych.run(timeline);
