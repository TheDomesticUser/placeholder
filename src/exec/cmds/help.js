// Provide a url to the documentation
function help(msg, opts)
{
    let url = 'https://github.com/TheDomesticUser/placeholder/tree/master/docs';
    let sender = msg.channel;

    // Loop over the options, making modifications to its response properties
    for (let opt of opts) {
        console.log(opt[0]);
        // Find the corresponding option
        switch(opt[0]) // Option = [0], Argument = [1]
        {
            case 'd': case 'direct':
                sender = msg.author;
                break;
        }
    }

    sender.send(url);
}

module.exports = help;