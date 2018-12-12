const Discord = require('discord.js');

module.exports = function(client) {  
  client.auth = require("./config.json"); // Bot Token, API Keys, Etc
  client.login(client.auth.token);
  let channel;
  
  client.on('ready', () => {
    console.log('Discord Instance Launched');
    channel = client.channels.get('506023625707487243');
    sitelogging = client.channels.get('506023335650394123');
    client.user.setActivity('BETA TESTING', { type: 'WATCHING' });
  });
  
  
 
}