alert(`
    In this experiment we will measure your response time.
    You will be shown a series of simple math equations. 
    Answer these equations as quickly and accurately as you can.`);

//first
let num1 = Math.floor(Math.random() * 10);
let num2 = Math.floor(Math.random() * 10);
let correct1 = num1 + num2
let start1 = Date.now();
let question1 = prompt("What is " + num1 + " + " + num2 + "?");
let end1 = Date.now();
let time1 = (end1 - start1) / 1000;
let feedback1 = ""

if (question1 == correct1) {
    feedback1 = " (correct) ";
} else {
    feedback1 = " (incorrect) ";
}
alert("You answered " + question1 + feedback1 + "in " + time1 + " seconds");

//second
let num3 = Math.floor(Math.random() * 10);
let num4 = Math.floor(Math.random() * 10);
let correct2 = num3 + num4
let start2 = Date.now();
let question2 = prompt("What is " + num3 + " + " + num4 + "?");
let end2 = Date.now();
let time2 = (end2 - start2) / 1000;
let feedback2 = ""

if (question2 == correct2) {
    feedback2 = " (correct) ";
} else {
    feedback2 = " (incorrect) ";
}
alert("You answered " + question2 + feedback2 + "in " + time2 + " seconds");

//third
let num5 = Math.floor(Math.random() * 10);
let num6 = Math.floor(Math.random() * 10);
let correct3 = num5 + num6
let start3 = Date.now();
let question3 = prompt("What is " + num5 + " + " + num6 + "?");
let end3 = Date.now();
let time3 = (end3 - start3) / 1000;
let feedback3 = ""

if (question3 == correct3) {
    feedback3 = " (correct) ";
} else {
    feedback3 = " (incorrect) ";
}
alert("You answered " + question3 + feedback3 + "in " + time3 + " seconds");




