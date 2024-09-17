// Create variables to store references to elements on the page

//num1 not showing up 
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
let equation = document.getElementById('equation');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

//Happens on page load 
//equation.innerHTML = "What is " + num1 + " + " + num2 + '?';

// Event listener - Listen for the form to be submitted
//Happens when form is submited 
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Stop the timer
    //Calculate Response Time


    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    //Code to hide the form (including instructions)
    form.style.display = 'none';

});

