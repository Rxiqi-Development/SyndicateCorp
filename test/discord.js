const db = require('quick.db'),
      Discord = require('discord.js');

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
  
  
  client.on('newRequest', async key => {
  
    let callback = await db.fetch('entries', { target: key });

    const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle('New Source Code Request')
      .setURL(`https://sourcecode.glitch.me/view?key=${key}`)
      .setDescription(`**ID:** ${key}\n**Author:** ${callback.username}\n\n**Title:** ${callback.title}\n**Description:** ${callback.desc}\n_ _`)
      .addField('Modification Instructions', `**\`sc!delete ${key}\` [❱](https://discord.io/plexidev) Removes post.\n\`sc!complete ${key}\` [❱](https://discord.io/plexidev) Completes request.**`);
    
    channel.send(embed)
    const sitelogs = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle('New Code Request')
      .setURL(`https://example.com/view?key=${key}`)
      .setDescription(`**ID:** ${key}\n**Author:** ${callback.username}\n\n**Title:** ${callback.title}\n**Description:** ${callback.desc}\n_ _`)
      //.addField('Modification Instructions', `**\`sc!delete ${key}\` [❱](https://discord.io/plexidev) Removes post.\n\`sc!complete ${key}\` [❱](https://discord.io/plexidev) Completes request.**`);
    
      sitelogging.send(sitelogs)
    
  })
  
  client.on('newSuggestion', async key => {
  
    let callback = await db.fetch('entries', { target: key });

    const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle('New Site Suggestion')
      .setURL(`https://sourcecode.glitch.me/view?key=${key}`)
      .setDescription(`**ID:** ${key}\n**Author:** ${callback.username}\n\n**Title:** ${callback.title}\n**Description:** ${callback.desc}\n_ _`)
      .addField('Modification Instructions', `**\`sc!delete ${key}\` [❱](https://discord.io/plexidev) Removes post.\n\`sc!complete ${key}\` [❱](https://discord.io/plexidev) Completes request.**`);
    
    channel.send(embed)
    
  })
  
  client.on('newItem', async key => {
    
    let callback = await db.fetch('entries', { target: key });
 // console.log (callback)
    const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle('New Sourcecode Entry')
      .setURL(`https://sourcecode.glitch.me/view?key=${key}`)
      .setDescription(`**ID:** ${key}\n**Author:** ${callback.username}\n\n**Title:** ${callback.title}\n**Description:** ${callback.desc}}\n_ _`)
      .addField('Modification Instructions', `**\`sc!delete ${key}\` [❱](https://discord.io/plexidev) Removes post.\n\`sc!hide ${key}\` [❱](https://discord.io/plexidev) Hides global listing.**`);
    
    channel.send(embed)
    
  })
  
  /*client.on('message', async message => {
    const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)

    if (!message.content.startsWith('sc!')) return;
    let args = message.content.slice(3).toLowerCase().split(' ')
    if (['website', 'help', 'commands'].includes(args[0])) message.channel.send(embed.setTitle('Source Code Website').setDescription('**[https://sourcecode.glitch.me](https://sourcecode.glitch.me)**').addField('Invite URL', '**[Invite Here](https://discordapp.com/oauth2/authorize?client_id=411958815009931274&scope=bot)**'))
    if (['upvote', 'downvote'].includes(args[0])) {
      let callback = await db.fetch('entries', { target: args[1] });
      if (!callback || !args[1]) return message.channel.send(embed.setFooter('Sorry, that is an invalid ID'));
      if (!callback.rating || callback.rating === 0) callback.rating = { upvote: [], downvote: [] };
      if (callback.rating.upvote.includes(message.author.id) || callback.rating.downvote.includes(message.author.id)) return message.channel.send(embed.setFooter('Sorry, you already voted!'))
      if (args[0] === 'upvote') callback.rating.upvote.push(message.author.id);
      else callback.rating.downvote.push(message.author.id);
      db.set('entries', callback, { target: `.${args[1]}` })
      message.channel.send(embed.setFooter(`Successfully voted for ${args[1]}`));
    }
    
    //if (!message.member || !message.member.roles.find(r => r.id === '506005528070324244')|| message.guild.id !== '506005416510095371') return;
      
    if (['approve', 'hide', 'complete'].includes(args[0])) {
      let callback = await db.fetch('entries', { target: args[1] });
      if (!callback) return message.channel.send(embed.setFooter('Invalid ID'));
      if (args[0] === 'complete') db.set('entries', true, { target: `.${args[1]}.status` }), message.channel.send(embed.setFooter(`Successfully completed: ${args[1]}`));
      if (args[0] === 'approve') db.set('entries', true, { target: `.${args[1]}.approved` }), message.channel.send(embed.setFooter(`Successfully approved: ${args[1]}`));
      else if (args[0] === 'hide') db.set('entries', false, { target: `.${args[1]}.approved` }), message.channel.send(embed.setFooter(`Successfully hid: ${args[1]}`));
    } else if (args[0] === 'delete') {
      let callback = await db.fetch('entries', { target: args[1] });
      if (!args[1]) return message.channel.send(embed.setFooter('You need to provide an argument, e.g: <prefix> <id> '));
      if (!callback) return message.channel.send(embed.setFooter('Please Check Number And Try Again!'));
      db.delete('entries', { target: args[1] });
      message.channel.send(embed.setDescription(`**ID:** ${args[1]}\n**Author:** ${callback.username}\n\n**Title:** ${callback.title}\n**Description:** ${callback.desc}\n**Successfully deleted:** ${args[1]}\n_ _`));
    }
    
  })*/
  
}