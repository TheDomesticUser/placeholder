<<<<<<< HEAD
// Import external plugins
const regex = require('xregexp');

// Import local plugins
const parse = require('./parse_cmd.js'); 

=======
// Import external modules
const regex = require('xregexp');

>>>>>>> 6a47f6ffc7e0ecda68afdecd8934535c6d3479e2
// Set up the Discord client
const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NjcxNzUyNjc0OTYxNTIyNzAx.XjBh1g.HcSNUBOs9LIBL0Cr7g-w3cnSFp0'
const prefix = '$';

client.on('ready', () => {
    console.log(`Logged in as client ${client.user.tag}`)
});

client.on('message', msg =>{ 
    const content = msg.content;
    if (!content.startsWith(prefix)) return;
    
    const cmd = content.substring(prefix.length).trim();

    // Parse the arguments
    const shortArgs = parseShortArgs(cmd);
<<<<<<< HEAD
    const longArgs = parseLongArgs(cmd); 


=======
    const longArgs = parseLongArgs(cmd);

    
>>>>>>> 6a47f6ffc7e0ecda68afdecd8934535c6d3479e2
});

client.login(token)

<<<<<<< HEAD

=======
// Parses all of the short form command arguments
function parseShortArgs(cmd)
{
    const re = regex('\s-(?<short>[a-zA-Z0-9]+)\s?', 'i');

    const args = regex.exec(cmd, re);

    if (args.short) {
        return args.short;
    } else {
        return null;
    }
}

// Parses all of the long form command arguments
function parseLongArgs(cmd) {
    const re = regex('--(?<long>[a-zA-Z]+)\s?', 'i');
    const args = regex.exec(cmd, re);

    if (args.long) {
        return args.long;
    } else {
        return null;
    }
}
>>>>>>> 6a47f6ffc7e0ecda68afdecd8934535c6d3479e2
