// Initialize the jsPsych library
let jsPsych = initJsPsych({
    show_progress_bar: true
});
// Define the timeline as an empty array where we will add all our trials
let timeline = [];

let consentTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1></h1>
   <div class="instruction-box">
            <ul>
            This experiment is an educational exercise about learning to program and analyze a psychological experiment and not a “real” scientific experiment. 
            No identifying information is collected, and data will not be shared beyond our class. If you agree to help out by completing the tasks and questionnaires, 
            please <span class = 'key'>SPACE</span> to continue. Otherwise, you may close this tab. If you have any questions, please reach out to Dr. Garth Coombs at garthcoombs@fas.harvard.edu, 
            one of the head instructors of PSY 1903: Programming for Psychological Scientists.
            </ul>
        </div>`,
    choices: [' ']
};
timeline.push(consentTrial)

let welcomePageTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Welcome to our IAT </h1>
   <div class="instruction-box">
            <ul>
                <li>In task 1 you will be asked to read a short story.</li>
                <li>In task 2 you will be asked to categorize a series of words.</li>
                <li>In task 3 you will answer a brief set of questions.</li>
            </ul>
        </div>
    <p>Press the <span class = 'key'>ENTER</span> key to begin</p>`,
    choices: ['Enter']
};
timeline.push(welcomePageTrial)

let primeOptions = [
    {
        title: 'Queer',
        story: `<p class = 'instruction-box'>A genderfluid bisexual person has been having a very difficult time with their mental health recently. 
        She has been having feelings of impending doom and persistent negative thoughts about herself, 
        which leads to greater feelings of sadness and worry. They have also been experiencing physical manifestations of 
        these feelings such as chest tightness and overwhelming fatigue. She has had some of these symptoms for most of her 
        life, but has noticed an increased intensity lately. Overall, the anxiety and depression they have been facing have been 
        challenging to manage.</p>` //the 'instruct' class is to designate line spacing for body text of instructions screens
    },
    {
        title: 'CisHet',
        story: `<p class = 'instruction-box'>A cisgender straight person has been having a very difficult time with her mental health recently. She has been
         having feelings of impending doom and persistent negative thoughts about herself, which leads to greater feelings of sadness
         and worry. She has also been experiencing physical manifestations of these feelings such as chest tightness and overwhelming fatigue. 
         She has had some of these symptoms for most of her life, but has noticed an increased intensity lately. Overall, the anxiety and 
         depression she has been facing have been challenging to manage.</p>`
    },
    {
        title: 'Control',
        story: `<p class = 'instruction-box'>A person has been having a very difficult time with their mental health recently. The person has been having feelings 
        of impending doom and persistent negative self-thoughts, which leads to greater feelings of sadness and worry. 
        This person has also been experiencing physical manifestations of these feelings such as chest tightness and overwhelming fatigue. 
        The person has had some of these symptoms for most of their life, but has noticed an increased intensity lately. 
        Overall, the anxiety and depression this person has been facing have been challenging to manage.</p>`
    }
];

let primer = primeOptions[getRandomNumber(0, 2)];

//trial for the primer 
let primingTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Task 1 of 3</h1>
        <p class = 'instructPerTask'> Please read the following story. When you are done, press the <span class = 'key'>SPACE</span> key to move to the next task. </p>
        <p> ${primer.story}
        `,
    choices: [' '],
    data: {
        collect: true,
        whichPrime: primer.title,
        trialType: 'prime'

    },
};

timeline.push(primingTrial);

//Define an IAT welcome page
let iatWelcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> Task 2 of 3</h1>
    <p class= 'instructPerTask'> In this task, you will be shown a series of words and asked to sort them into categories.</p>
    <p> Press the <span class = 'key'>ENTER</span> key to begin. </p>
    `,
    choices: ['Enter'],
};

timeline.push(iatWelcomeTrial);
let number = 1;

for (let block of conditions) {

    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    let instructionsPageTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>Part ${number}</h1>
        <p> In this part the two categories will be: <strong>${leftCategory}</strong> and <strong>${rightCategory}</strong></p>
        <p> If the word you see in the middle of the screen should be sorted into the <strong>${leftCategory}</strong> press the <span class = 'key'>F</span> key.</p>
        <p> If the word should be sorted into the <strong>${rightCategory}</strong> press the <span class = 'key'>J</span> key.</p>
        <p> Press the <span class = 'key'>SPACE</span> key to begin </p>`,
        //the word “space” and the letters “F” and “J” should use CSS and the span element to look like keys
        choices: [' ']
    };
    timeline.push(instructionsPageTrial);
    number++;
    console.log(count);

    //another for loop to iterate through the trials of each block
    for (let trial of block.trials) {

        let wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <span class='category1'> <strong>${leftCategory}</strong> (press F)</span>
            <span class='category2'> <strong>${rightCategory}</strong> (press J)</span>
            <p class='word'>${trial.word}</p>`
            ,
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
                data.correct = data.response == trial.expectedResponse
            }
        };
        timeline.push(wordTrial);

        let fixationPage = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p class='word'>+</p>
            `,
            trial_duration: 250,
            choices: '[NO KEYS]'
        }
        timeline.push(fixationPage);
    };
};

let likertScale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

var questionsTrial = {
    type: jsPsychSurveyLikert,
    preamble: `<h1>Task 3 of 3</h1>
    <p> Please answer the following questions.`,
    questions: [
        { prompt: "Masculinity and femininity are determined by biological factors, such as genes and hormones, before birth.", name: 'question1', labels: likertScale },
        { prompt: "There are only two sexes: male and female.", name: 'question2', labels: likertScale },
        { prompt: "All people are either male or female.", name: 'question3', labels: likertScale },
        { prompt: "Gender is the same thing as sex.", name: 'question4', labels: likertScale },
        { prompt: "Sex is complex; in fact, there might even be more than two sexes.", name: 'question5', labels: likertScale },
        { prompt: "Gender is a complicated issue, and it does not always match up with biological sex.", name: 'question6', labels: likertScale },
        { prompt: "People who say that there are only two legitimate genders are mistaken.", name: 'question7', labels: likertScale },
        { prompt: "In intimate relationships, women and men take on roles according to gender for a reason; it is really the best way to have a successful relationship.", name: 'question8', labels: likertScale },
        { prompt: "In intimate relationships, people should act only according to what is traditionally expected of their gender.", name: 'question9', labels: likertScale },
        { prompt: "It is perfectly okay for people to have intimate relationships with people of the same sex.", name: 'question10', labels: likertScale },
        { prompt: "The best way to raise a child is to have a mother and a father raise the child together.", name: 'question11', labels: likertScale },
        { prompt: "In healthy intimate relationships, women may sometimes take on stereotypical ‘male’ roles, and men may sometimes take on stereotypical ‘female’ roles.", name: 'question12', labels: likertScale },
        { prompt: "Women and men need not fall into stereotypical gender roles when in an intimate relationship.", name: 'question13', labels: likertScale },
        { prompt: "People should partner with whomever they choose, regardless of sex or gender", name: 'question14', labels: likertScale },
        { prompt: "There are particular ways that men should act and particular ways that women should act in relationships.", name: 'question15', labels: likertScale },
    ],
    data: {
        collect: true,
        trialType: 'Questionnaire'
    }
};

timeline.push(questionsTrial);

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
        let prefix = 'no-closet';
        let dataPipeExperimentId = 'UKOmlhbKicSb';
        let forceOSFSave = false;

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

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>The experiment is now complete; you can close this tab!</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
        jsPsych.progressBar.progress = 1;
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
