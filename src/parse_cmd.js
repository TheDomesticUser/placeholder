// Parses all of the short form command arguments
function parseShortArgs(cmd)
{
    try {
        const matches = [];
        const re = regex('\\s--(?<short>[a-zA-Z0-9]+)\\s??', 'i');

        regex.forEach(cmd, re, match => {
            matches.push(match.short);
        });

        return args;
    } catch(err) {
        return null;
    }    
}

// Parses all of the long form command arguments
function parseLongArgs(cmd)
{
    try {

        const re = regex('\\s--(?<long>[a-zA-Z]+)\\s?', 'i');
        const args = regex.exec(cmd, re).long;
    
        return args;
    } catch(err) {
        return null;
    }
}