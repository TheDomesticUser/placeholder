// This file contains functions for prompting the user whenever errors occur

// Import error variables
const invalid = require('../src/error/invalid.js');

// Prompts the user to fill in the required command options
function promptReqOpts(stderr, optsStr)
{    
    const errStr = `
        The following commands are required: ${optsStr}. Check \
${invalid.helpCmd} for more.
    `.trim();

    stderr.send(errStr);
}

// Prompts the user to fill in the required arguments
function promptReqArgs(stderr)
{

}

module.exports = {
    promptReqOpts,
    promptReqArgs
};