//this is the task that we've given to the worker
//something expensive and long to allow us to try and click around and make sure we still have freedom to click around


onmessage = function(message) 
{

    let sum = 0;
    for (let i = 0; i < 10000000000; i++)
        sum += i;


    postMessage(sum)
}