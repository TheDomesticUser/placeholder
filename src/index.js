// Import local plugins
const syntax = require('./syntax.js');
const parse = require('./parse_cmd.js'); 
const exec = require('./exec/index.js');

// Set up the Discord client
const Discord = require('discord.js');
const client = new Discord.Client();

// Fetch the authentication token
const token = (require('fs').readFileSync('./conf/token.txt', 'utf-8')).toString();

// Prefix for the client
const prefix = syntax.prefix;

client.on('ready', () => {
    console.log(`Logged in as client ${client.user.tag}`)
});

client.on('message', msg => { 
    const content = msg.content;

    // Don't parse the message if the message doesn't start with the clients prefix
    if (!content.startsWith(prefix)) return;

    // Don't parse the message if the message wasn't sent in a text channel
    if (msg.channel.type !== 'text') return;

    /*
        Check if the client has administrative permissions. 
        Prompt the user if there is not, disabling functionality
    */
    if (!client.guild.me.hasPermission('ADMINISTRATOR')) {
        msg.channel.send('You need to enable administration privileges to the bot!');
        return;
    }
    
    const cmd = content.substring(prefix.length).trim();

    // Parse command, storing its name and options inside a dictionary
    const cmdDict = parse(cmd, prefix);

    // Execute each of the commands along with their options from left to right
    exec(msg, cmdDict);
});

client.login(token)