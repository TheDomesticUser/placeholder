// Import local command modules
const Module = require('./module.js');

// Import local variables from other files
const invalid = require('../error/invalid.js');

// Use a switch statement to check its matching command. After, loop through its options
function exec(msg, cmdDict) {
    // Access its name and options
    const cmdName = cmdDict.name;
    const optArr = cmdDict.options;

    // Find the matching command
    switch(cmdName)
    {
        case 'help':
            Module.help(msg, optArr);
            break;
        case 'members':
            Module.members(msg, optArr);
            break;
        default:
            msg.channel.send(`Invalid command '${cmdName}'. Try $${invalid.helpCmd} for more information`);
            return;
    }
}

module.exports = exec;