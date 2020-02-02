// Universal command options
const universalOpts = require('./universal/opts.js');

// Import local variables from other files
const invalid = require('../../error/invalid.js');

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
                console.log(opt[1]);
                break;
            // Universal options
            case universalOpts.stderrDmOptName:
                stderr = msg.author;
                break;
            default:
                stderr.send(`Invalid option '${opt[0]}' Try $${invalid.helpCmd} for more information.`);
                break;
        }
    }
}

/*
    Finds the user specified through a tag or username,
    and returns it. Used for the -u --user option.
*/