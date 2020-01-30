// Provide a url to the documentation
function help(msg, opts)
{
    const url = 'https://github.com/TheDomesticUser/placeholder/tree/master/docs';

    msg.channel.send(url);
}

module.exports = help;