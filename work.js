const worker = new Worker('worker.js');


document.addEventListener('DOMContentLoaded', function() {
    // This code will execute after the DOM has fully loaded
    var button = document.createElement('button');
    button.textContent = 'Add all of the numbers in ten million';
    
    button.addEventListener('click', function() {
        worker.postMessage('hello');
        // Add more actions as needed
    });
    
    // Append the button to an existing element or to the body
    document.body.appendChild(button);
});

worker.onmessage = function(message)
{
    alert(`The final message is ${message.data}`);
}

//this task shows us that we can change the background whenever we want and it'll still
//run the expensive process of adding all of the numbers from one to ten million


document.addEventListener('DOMContentLoaded', function() {
    // This code will execute after the DOM has fully loaded
    var button = document.createElement('button');
    button.textContent = 'Change background color';
    
    button.addEventListener('click', function() {
        if(document.body.style.background !== "green")
            document.body.style.background = "green";
        else
            document.body.style.background = "blue";
        // Add more actions as needed
    });
    
    // Append the button to an existing element or to the body
    document.body.appendChild(button);
});