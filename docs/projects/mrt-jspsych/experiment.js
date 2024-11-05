// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Define a welcome trial using jsPsych’s jsPsychHtmlKeyboardResponse plugin
let welcomeTrial = {
    // Indicate the plugin type we’re using
    type: jsPsychHtmlKeyboardResponse,

    // What content to display on the screen
    stimulus: `
    <h1><span class='name'>Welcome to the Math Response Time Task!</span></h1> 
    <p>In this experiment, you will be shown a series of math problems.</p>
    <p>There are three parts to this experiment; the questions will increase in difficulty with each part</p>
    <p>please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,

    // Listen for the SPACE key to be pressed to proceed
    choices: [' '],
};

// Add the welcome trial to our timeline
timeline.push(welcomeTrial);

let likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

var Questions = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", name: 'Enjoyment', labels: likert_scale },
        { prompt: "I find math easy.", name: 'Easy', labels: likert_scale },
    ],
    data: {
        collect: true,
    }
}

timeline.push(Questions)


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
            preamble: `<p><span class='equationStyle'> What is <span class='yellowBackground'>${condition.num1}</span> + <span class='yellowBackground'>${condition.num2}</span></span></p> `,
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
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'mrt';
        let dataPipeExperimentId = 'xGrIMXyGYhic';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

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
