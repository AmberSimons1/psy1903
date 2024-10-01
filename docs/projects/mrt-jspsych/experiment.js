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
    <h1>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math problems.</p>
    <p>There are three parts to this experiment; the questions will increase in difficulty with each part</p>
    <p>please answer as quickly and accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,

    // Listen for the SPACE key to be pressed to proceed
    choices: [' '],
};

// Add the welcome trial to our timeline
timeline.push(welcomeTrial);

for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };

    let blockConditions = block.questions;

    timeline.push(blockIntroTrial);

    for (let condition of blockConditions) {

        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p>What is ${condition.num1} + ${condition.num2}</p> `,
            html: `<p><input type='text' name='response' id='response'></p>`,
            autofocus: 'response', // id of the field we want to auto-focus on when the trial starts
            button_label: 'Submit Answer',
            data: {
                collect: true,
                answer: condition.answer,
                num1: condition.num1,
                num2: condition.num2,
                block: block.title,
            },
            //2nd approach to adding data to output (data.correct = true is creating a
            //new data property that isnt in .ignore())
            on_finish: function (data) {
                data.response = data.response.response;
                if (data.response == condition.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            },

        }
        timeline.push(conditionTrial);
    }
}

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);


// Run the experiment
jsPsych.run(timeline);
