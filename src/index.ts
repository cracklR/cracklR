import { REST, Routes, Client, GatewayIntentBits } from 'discord.js'
import {readFile, access} from "fs/promises";

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

try{
    await access('./config.json');
}
catch(err){
    console.error("Unable to read config file! Exiting...", err);
}

interface configFile{
    TOKEN:string,
    DEV_GUILD_ID?:string
}

// Attempt to read the configuration
const config:configFile = JSON.parse((await readFile('./config.json')).toString());

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');
    // If this is a dev bot, deploy commands locally on the target guild, otherwise send everything to global:
  await rest.put(Routes[ config.DEV_GUILD_ID ? "applicationGuildCommands" : "applicationCommands"](config.TOKEN, config?.DEV_GUILD_ID || ''), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });
  
  client.login(config.TOKEN);