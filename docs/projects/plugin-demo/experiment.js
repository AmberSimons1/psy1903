// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];

let participantId = getCurrentTimestamp();

//Welcome stage
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Welcome to the Mirror-Camera Plugin Demo</h1> 
    <p>In this experiment, you will be shown a mirror using your web camera.</p>
    <p> Press <span class='key'>SPACE</span> to begin.</p>
`,
    choices: [' '],
};
timeline.push(welcomeTrial);

const init_camera = {
    type: jsPsychInitializeCamera,
}

const mirror_camera = {
    type: jsPsychMirrorCamera,
}

timeline.push(init_camera);
timeline.push(mirror_camera);


let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'UKOmlhbKicSb';
        let forceOSFSave = false;
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}

timeline.push(resultsTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (data) {

        let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_2azkMD7wZPvHrn0?experimentParticipantId=${participantId}`

        return `
        <h1>Thank you!</h1>
        <p>
            To complete your response, 
            please follow <a href='${linkToQualtricsSurvey}'>this link</a> 
            and complete the survey you see there.
        </p>
    `},
    choices: ['NO KEYS']
}
timeline.push(debriefTrial);

jsPsych.run(timeline);