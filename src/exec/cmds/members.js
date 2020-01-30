// Import local variables from other files
const invalid = require('../../error/invalid.js');

// Prints out all of the members in the guild
function members(msg, opts)
{    
    let membersStr = ''; // String containing all of the guild members for printing

    let guildMembers = [];
    let outputLocation = msg.channel;
    let errorLog = msg.channel;

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
            case 'd': case 'direct-message':
                outputLocation = msg.author;
                break;
            default:
                errorLog.send(`Invalid option '${opt[0]}'. Try $${invalid.helpCmd} for more information.`);
                break;
        }
    }

    // Print the left over members in the guild
    for (let member of guildMembers) {
        membersStr += member.displayName + '\n';
    }

    outputLocation.send(membersStr);
}

module.exports = members;