// Universal command options
const universalOpts = require('./universal/opts.js');

// Import local variables from other files
const invalid = require('../../error/invalid.js');

// Returns a random user in the guild
function returnRandUser(msg, opts)
{
    // Property variables
    let stdout = msg.channel;
    let stderr = msg.channel;

    // Get the number of members in the guild
    const guildSize = msg.guild.members.size;

    // Get a random user in the guild
    const randUser = Array.from(msg.guild.members)[Math.floor(Math.random() * guildSize)][1];

    // Return the selected user by its username by default
    let userOutput = randUser.displayName;

    // Loop over the options, making modifications to its response properties
    for (let opt of opts) {
        switch(opt[0]) // Option = [0], Argument = [1]
        {
            case 't': case 'tag-user':
                userOutput = `<@${randUser.id}>`;
                break;
            case 'i': case 'user-id':
                userOutput = randUser.id;
                break;
            // Universal options
            case universalOpts.stdoutDmOptName:
                stdout = msg.member;
                break;
            case universalOpts.stderrDmOptName:
                stderr = msg.member;
                break;
            default:
                stderr.send(`Invalid option '${opt[0]}'. Try $${invalid.helpCmd} for more information.`);
                return;
        }
    }
    stdout.send(userOutput);
}

module.exports = returnRandUser;