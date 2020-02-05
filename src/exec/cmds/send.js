// Universal command options
const universalOpts = require('./universal/opts.js');

// Import local variables from other files
const invalid = require('../../error/invalid.js');

// Import functions for searching
const search = require('../../../reuse/search.js');

function send(msg, opts)
{
    let stdout;
    let stderr = msg.channel;
    let message;

    // Loop over the options, making modifications to its response properties
    for (let opt of opts) {
        switch(opt[0]) // Option = [0], Argument = [1]
        {
            case 'm': case 'message':
                message = opt[1];
                break;
            case 'u': case 'user':
                stdout = search.findMember(msg.guild.members, opt[1]);
                break;
            // Universal options
            case universalOpts.stderrDmOptName:
                stderr = msg.author;
                break;
            default:
                stderr.send(`Invalid option '${opt[0]}' Try '$${invalid.helpCmd} send' for more information.`);
                break;
        }
    }
    
    try {
        // Sends the requested user the message specified
        stdout.send(message);
    } catch(err) {
        // Prompt the user if required options are not specified
        stderr.send(`Both the user and the message needs to be specified. Try '$${invalid.helpCmd} send' for more information`);
    }
}

module.exports = send;