require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
const POAPService = require('../services/POAPService')

module.exports = (() => {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('messageCreate', (message) => {
    if (message.channelId == process.env.CHANNEL_ID && message.author.id == process.env.AUTHOR_ID) {
      POAPService.create(message.id)
    }
  })

  client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.emoji.name == '👋') {
      const poap = await POAPService.claim(reaction.message.id, user.id)

      if (poap) {
        if (poap.err) return user.send(poap.msg ? poap.msg : 'There was an unhandled error')
        const code = poap.codes[poap.claimed - 1]
        return user.send(code)
      } else {
        return user.send("POAP not found")
      }
    }
  })

  client.login(process.env.TOKEN);
})()