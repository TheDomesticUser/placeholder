const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NjcxNzUyNjc0OTYxNTIyNzAx.XjBh1g.HcSNUBOs9LIBL0Cr7g-w3cnSFp0'

client.on('ready', () => {
    console.log(`Logged in as client ${client.user.tag}`)
});

client.on('message', msg => {
    console.log(msg);
});

client.login(token)