// Import local variables from other files
const invalid = require('../../error/invalid.js');

// Provide a url to the documentation
function help(msg, opts)
{
    let url = 'https://github.com/TheDomesticUser/placeholder/tree/master/docs';
    let sender = msg.channel;
    let errorLog = msg.channel;

    // Loop over the options, making modifications to its response properties
    for (let opt of opts) {
        // Find the corresponding option
        switch(opt[0]) // Option = [0], Argument = [1]
        {
            case 'd': case 'direct':
                sender = msg.author;
                break;
            default:
                errorLog.send(`Invalid option '${opt[0]}'. Try ${invalid.helpCmd} for more information.`);
                return;
        }
    }

    sender.send(url);
}

module.exports = help;