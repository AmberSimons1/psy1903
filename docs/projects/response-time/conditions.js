let colors = ['blue', 'orange'];

conditions = initJsPsych().randomization.repeat(colors, 5);

console.log(conditions);
// This creates an array - conditions that has 10 colors total. 
//It is an even mix and has at least 5 of each 
