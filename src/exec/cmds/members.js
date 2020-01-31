// Universal command options
const universalOpts = require('.//universal/opts.js');

// Import external modules
const regex = require('xregexp');

// Import local variables from other files
const invalid = require('../../error/invalid.js');

// Prints out all of the members in the guild
function members(msg, opts)
{    
    let membersStr = ''; // String containing all of the guild members for printing

    let guildMembers = [];
    let stdout = msg.channel;
    let stderr = msg.channel;

    // Gather all of the members in the guild
    for (let guildMember of msg.guild.members) {
        guildMembers.push(guildMember[1]);
    }

    // Loop over the options, making modifications to its response properties
    for (let opt of opts) {
        switch(opt[0]) // Option = [0], Argument = [1]
        {
            case 'b': case 'exclude-bots':
                // Remove all of the bots from the member array
                guildMembers = guildMembers.filter(member => member.user.bot !== true);
                break;
            case 'n': case 'name':
                // Filters out the members if their usernames don't contain the name input
                guildMembers = guildMembers.filter(member => (
                    ((member.displayName).toLowerCase()).includes(opt[1].toLowerCase())
                ));
                break;
            // Universal options
            case universalOpts.stdoutDmOptName:
                stdout = msg.author;
                break;
            default:
                stderr.send(`Invalid option '${opt[0]}'. Try $${invalid.helpCmd} for more information.`);
                return;
        }
    }

    // Print the left over members in the guild
    for (let member of guildMembers) {
        membersStr += member.displayName + '\n';
    }
    
    // Inform the user that there were no results
    if (!membersStr) {
        stdout.send('There were no results.');
    } else {
        // Else, send the results in a formatted string
        stdout.send(membersStr);
    }

}

// Takes an array of strings and filters them through the regex input
function filterStrArr(strArr, regexStr, flagsStr)
{
    // Create the regex object for more flexibility

}


module.exports = members;