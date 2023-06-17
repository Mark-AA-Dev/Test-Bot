const Discord = require("discord.js");
const { Client, Intents, Collection, MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu, Permissions,
    MessageEmbed
} = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS,  Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });

const fs = require("fs");
const config = require("./config/config");
const embeds = require("./config/embeds");
const messages = require("./config/messages");
client.config = config;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

fs.readdir("./utils/events/discord", (_err, files) => {
	files.forEach(file => {
	  if (!file.endsWith(".js")) return;
	  const event = require(`./utils/events/discord/${file}`);
	  let eventName = file.split(".")[0];
	  console.log(`[Event]   ✅  Loaded: ${eventName}`);
	  client.on(eventName, event.bind(null, client));
	  delete require.cache[require.resolve(`./utils/events/discord/${file}`)];
	});
  });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

client.interactions = new Discord.Collection();
client.register_arr = []

const commandsCommandFolders = fs.readdirSync('./commands');

    const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.interactions.set(commandName, {
          name: commandName,
          ...command
        });
        client.register_arr.push(command)
  }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

client.login(config.TOKEN);