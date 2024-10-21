//always very first thing to do when using js psych
let jsPsych = initJsPsych();

//create timeline
let timeline = [];

let colors = jsPsych.randomization.repeat(['red', 'green', 'blue'], 1);
let color = colors.pop();
//gets last element in colors array 

let trial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['f', 'j'],
    stimulus: `
        <span class='${color}'>ball</span>`
};
//timeline.push(trial);

//Welcome stage
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class= 'instructions'> Welcome to the Lexical Decision Task</h1> 
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p class='instructions'> Press <span class='key'>SPACE</span> to begin the first part.</p>
`,
    choices: [' '],
};
timeline.push(welcomeTrial);

//Showed word or pseudo word (on repeat)

// Shuffle the conditions

for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
    <h1> ${block.title}</h1 >
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the F key.</p>
            <p>If the characters do not make up a word, press the J key.</p>
            <p>Press SPACE to begin.</p>
`,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);


    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1> ${condition.characters}</h1> `,
            choices: ['f', 'j'],
            //1st approach to adding data to output 
            data: {
                collect: true,
                answer: condition.characters,
                blockId: block.title
            },
            //2nd approach to adding data to output (data.correct = true is creating a
            //new data property that isnt in .ignore())
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
    <h1> Please wait...</h1 >
     <span class='loader'></span>
     <p>We are saving the results of your inputs.</p>
`,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'lexical-decision';
        let dataPipeExperimentId = 'UKOmlhbKicSb';
        let forceOSFSave = true;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}

timeline.push(resultsTrial);

//Debrief 
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `< h1 > Thank you!</h1 >
    <p>You can now close this tab</p>
`,
    choices: ['NO KEYS'],
    // Dont need this because we are saving results as a file
    //on_start: function () {
    //     let data = jsPsych.data
    //         .get()
    //         .filter({ collect: true })
    //         .ignore(['trial_type', 'trial_index', 'plugin_version', 'collect', 'stimulus'])
    //         .csv();
    //     console.log(data);
}
timeline.push(debriefTrial);

jsPsych.run(timeline);