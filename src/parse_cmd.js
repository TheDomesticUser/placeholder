// Import external plugins
const regex = require('xregexp');

// Parse the commands, options, and arguments and store them into an array
function parseArgs(cmd)
{
    try {
        const shortArgs = parseShortArgs(cmd);
        const longArgs = parseLongArgs(cmd);

        console.log(shortArgs);
        console.log(longArgs);

    } catch(err) {

    }
}

// Parses all of the short form command options
function parseShortArgs(cmd)
{
    try {
        const matches = [];

        // Match the options and arguments, splicing them into the array
        const re = regex(`
            \\s-(?<options>[a-z0-9]+)(?!\\S) # Match the options
            (?:\\s*"(?<arg>[^"]*)")? # Match the arguments
        `, 'ix');
        
        /* Get the options and arguments (If they exist)
            The supplied argument will be correlated to the last option in the list.
            Ex. -lm "Message" m -> "Message"
        */
        regex.forEach(cmd, re, match => {
            const options = (match.options).split('');
            const last = options[options.length - 1];

            const argument = { [last]: match.arg };

            matches.push([options, argument]);
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
        const matches = []
        ;
        const re = regex(`
            \\s--(?<long>[a-z]+)(?!\\S) # Retrieve the option
            (?:\\s*"(?<arg>[^"]*)")? # Retrieve its argument if it exists
        `, 'ix');

        // Get the option and arguments (If they exist)
        regex.forEach(cmd, re, match => {
            const opt = [];

            opt.push(match['long']);
            opt.push(match['arg']);

            matches.push(opt);
        });
        
        return matches;
    } catch(err) {
        return [];
    }
}

module.exports = parseArgs;