// Import external plugins
const regex = require('xregexp');

// Parse the commands, options, and arguments and store them into an array
function parseArgs(cmd)
{
    try {
        const longArgs = parseLongArgs(cmd);
        console.log(longArgs);

    } catch(err) {

    }
}

// Parses all of the short form command options
function parseShortArgs(cmd)
{
    /*  */
    try {
        const matches = [];
        const re = regex('\\s-(?<short>[a-zA-Z0-9]+)(?=\\s)', 'i');

        regex.forEach(cmd, re, match => {
            matches.push(match['short']);
        });

        return matches;
    } catch(err) {
        return [];
    }    
}

// Parses all of the long form command options
function parseLongArgs(cmd)
{
    try {
        const argKey = 'arg';
        const matches = []
        ;
        const re = regex(`
            \\s--(?<long>[a-zA-Z]+)(?=\\s) # Retrieve the option
            (?:\\s+"(?<${argKey}>[^"]*)")?
        `, 'ix');

        // Get the option and argument if it exists
        regex.forEach(cmd, re, match => {
            const opt = [];

            opt.push(match['long']);

            if (match.hasOwnProperty(argKey)) {
                opt.push(match[argKey]);
            }
            matches.push(opt);
        });
        
        return matches;
    } catch(err) {
        return [];
    }
}

module.exports = parseArgs;