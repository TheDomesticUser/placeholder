// Import external plugins
const fs = require('fs');

// Import local plugins
const syntax = require('./syntax.js');
const parse = require('./parse_cmd.js'); 
const exec = require('./exec/index.js');

// Set up the Discord client
const Discord = require('discord.js');
const client = new Discord.Client();

// Fetch the authentication token
const token = (fs.readFileSync('./conf/token.txt', 'utf-8')).toString();

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
    
    const cmd = content.substring(prefix.length).trim();

    // Parse command, storing its name and options inside a dictionary
    const cmdDict = parse(cmd, prefix);

    // Execute each of the commands from left to right
    exec(msg, cmdDict);
});

client.login(token)