// Import local command modules
const Module = require('./module.js');

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
            console.log('command doesn\'t exist');
            break;
    }
}

module.exports = exec;