//always very first thing to do when using js psych
let jsPsych = initJsPsych({
    show_progress_bar: true
});

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

let ageCheckTrial = {
    type: jsPsychSurveyHtmlForm,
    html: `
    <h1>Welcome!</h1> 
    Please enter your age to continue: <input type='text' name='age' id='age'>
    `,
    autofocus: 'age',
    on_finish: function (data) {
        if (data.response.age < 18) {
            jsPsych.abortExperiment('You must be 18 years or older to complete this experiment.');
        }
    }
}
timeline.push(ageCheckTrial);

let enterFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
};

timeline.push(enterFullScreenTrial);

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

let primeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>You were randomly chosen to see this trial.</p> 
        <p>Press the <span class='key'>SPACE</span> key to continue.</p>
        `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
    },
    on_load: function () {
        if (getRandomNumber(0, 1) == 0) {
            jsPsych.data.addProperties({ sawPrime: false });
            jsPsych.finishTrial();
        } else {
            jsPsych.data.addProperties({ sawPrime: true });
        }
    }
}
timeline.push(primeTrial);

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

        let feedbackTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>Incorrect</h1>`,
            trial_duration: 1000,
            choices: ['NO KEY'],
            on_load: function () {
                let lastTrialData = jsPsych.data.getLastTrialData().values()[0];
                if (lastTrialData.correct) {
                    // Force skip this feedback trial if they got the previous trial correct
                    jsPsych.finishTrial();
                }
            },
        }
        timeline.push(feedbackTrial);
    }
}

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
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'lexical-decision';
        let dataPipeExperimentId = 'xGrIMXyGYhic';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

let exitFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
};
timeline.push(exitFullScreenTrial);

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

    on_start: function () {
        jsPsych.progressBar.progress = 1;
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);