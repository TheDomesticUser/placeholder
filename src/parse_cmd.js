// Import external plugins
const regex = require('xregexp');

// Parse the command, options, and arguments and store them into an array
function parse(cmd)
{
    // Find the command name
    const cmdName = parseCmdName(cmd);

    /*
        We will now use regular expressions to parse long form options and 
        short form options. Options can also accept arguments, for example
        -m "Message". We will need to parse these as well.
    */

    // Store all of the options along with their possible arguments into an array
    const matches = [];
    
    // Regex for parsing
    const re = regex(`
        (?:
            \\s-(?<short>[^"'\`\\s-]+)(?!\\S) # Short form option
            | # OR
            \\s--(?<long>[^"'\`\\s]+)(?!\\S) # Long form option
        )
        (?:\\s*"(?<arg>[^"]+)")? # Retrieve the argument if it exists. Optional
    `, 'ix'); // Case insensitive and comments mode enabled

    regex.forEach(cmd, re, match => {
        /*
            Store each of the options into an array.
            We will also correlate the last option in its list to the argument.
            Ex. -alm "Message"     m -> "Message". 
            Representation: [command, argument].
        */

        if (match.short) {
            for (let char of match.short) {
                matches.push([char]);
            }
        } else if (match.long) {
            matches.push([match.long]);
        } else {
            return;
        }

        if (match.arg) {
            matches[matches.length - 1].push(match.arg);
        }
    });
    
    // Returns a dictionary with the command name and its parsed options
    return {
        name: cmdName,
        options: matches
    }
}

/*
    Parse the command used. This function assumes the prefix is truncated
    and the command name is the first sequence of characters
*/
function parseCmdName(cmd)
{
    const re = regex('^[a-z]+', 'i');
    const match = regex.match(cmd, re);

    return match;
}

module.exports = parse;