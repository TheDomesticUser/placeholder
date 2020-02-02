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
            case 'n': case 'no-bots':
                // Remove all of the bots from the member array
                guildMembers = guildMembers.filter(member => member.user.bot !== true);
                break;
            case 'b': case 'bots-only':
                // Remove all of the non-bots from the member array
                guildMembers = guildMembers.filter(member => member.user.bot === true);
                break;
            case 'f': case 'filter':
                // Filters out the members if their usernames don't contain the name input
                guildMembers = guildMembers.filter(member => (
                    ((member.displayName).toLowerCase()).includes(opt[1].toLowerCase())
                ));
                break;
            case 'fR': case 'filter-regex':
                // If there is no argument specified
                if (opt.length <= 1) {
                    stderr.send('No regex string specified for searching!');
                    return;
                } else {
                    const response = filterRegex(guildMembers, opt[1]);

                    if (!response) {
                        stderr.send('Non-valid regex.');
                        return;
                    } else {
                        guildMembers = response;
                    }
                }
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

/*
    Takes an array of strings and filters them through the regex input, returning
    an array of matches. Used for the -fR --filter-regex command
*/
function filterRegex(userArr, regexStr)
{
    try {
        // Create the regex object for more flexibility
        const re = regex(regexStr);
        const matches = [];

        for (let user of userArr) {
            // Get the username of the user
            const username = user.displayName;

            if (regex.match(username, re)) {
                // Push the user object (Not username, it will be handled later)
                matches.push(user);
            }
        }
        return matches;

    } catch(err) {
        return false;
    }
}

module.exports = members;