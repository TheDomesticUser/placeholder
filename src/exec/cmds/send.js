// Universal command options
const universalOpts = require('./universal/opts.js');

// Import local variables from other files
const invalid = require('../../error/invalid.js');

// Import functions for searching
const search = require('../../../reuse/search.js');

// Sends the specified message to a requested user
function send(msg, opts)
{
    // Deletes the message containing the send command, so no one will know who sent it
    msg.channel.delete(1);

    let stdout = msg.channel;
    let stderr = msg.channel;
    let message;
    let target;
    let printResults = true;

    // Loop over the options, making modifications to its response properties
    for (let opt of opts) {
        switch(opt[0]) // Option = [0], Argument = [1]
        {
            case 'm': case 'message':
                message = opt[1];
                break;
            case 'u': case 'user':
                target = search.findMember(msg.guild.members, opt[1]);
                break;
            // Does not print the results to stdout
            case 's': case 'suppress-output':
                printResults = false;
                break;
            // Universal options
            case universalOpts.stdoutDmOptName:
                stdout = msg.author;
                break;
            case universalOpts.stderrDmOptName:
                stderr = msg.author;
                break;
            default:
                stderr.send(`Invalid option '${opt[0]}' Try '$${invalid.helpCmd} send' for more information.`);
                break;
        }
    }

    // Check if there is ambiguity
    if (target === 0) {
        stderr.send('There are two or more members with the username you specified. Please type in the full name.');
        return;
    }
    
    try {
        // Sends the requested user the message specified
        target.send(message);

        if (printResults) {
            stdout.send('Sent the message successfully!');
        }
    } catch(err) {
        // Prompt the user if required options are not specified
        if (printResults) {
            stderr.send(`Both the user and the message needs to be specified. Try '$${invalid.helpCmd} send' for more information`);
        }
    }
}

module.exports = send;