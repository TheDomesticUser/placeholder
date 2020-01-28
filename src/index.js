// Import external plugins
const regex = require('xregexp');

// Import local plugins
const parse = require('./parse_cmd.js'); 

// Import external modules
const regex = require('xregexp');

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
});

client.login(token)