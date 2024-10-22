# Outside Resources Log - Week 4


## AI Prompts

I have the following code and I need to use CSS to add the "leftCategory" above and to the left of the word that appears on the screen and the "right category" above and to the right  of the word that appears on the screen
How do I implement that into this code         let wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: ${trial.word},
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
(So that it would seperate the CSS code out of the JS file instead of just showing it to me in one big thing)I want some of the code to be in my styles.css file and then injected into the js file
How Do I make it so that they stay in the same place despite the length of the word in the middle
I want to move them farther away from eachother and higher up
in htmlkeyboardresponse on js psych how do you make the return/enter key one of the chocice

## Outside sites



