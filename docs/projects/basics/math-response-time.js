alert(`
In this experiment we will measure your response time.
You will be shown a series of simple math equations. 
Answer these equations as quickly and accurately as you can.`);

let start1 = Date.now();

let question1 = prompt("What is " + Math.floor(Math.random() * 10) + " + " + Math.floor(Math.random() * 10));

let end1 = Date.now();

let time1 = (end1 - start1) / 1000;

alert("You answered " + question1 + " in " + time1 + " seconds");

let start2 = Date.now();

let question2 = prompt("What is " + Math.floor(Math.random() * 10) + " + " + Math.floor(Math.random() * 10));

let end2 = Date.now();

let time2 = (end2 - start2) / 1000;

alert("You answered " + question2 + " in " + time2 + " seconds");

let start3 = Date.now();

let question3 = prompt("What is " + Math.floor(Math.random() * 10) + " + " + Math.floor(Math.random() * 10));

let end3 = Date.now();

let time3 = (end3 - start3) / 1000;

alert("You answered " + question3 + " in " + time3 + " seconds");

alert("Thank you for your participation");
