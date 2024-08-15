import { Client, GatewayIntentBits } from "discord.js";
import { readFile, access } from "fs/promises";

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

try {
  await access("./config.json");
} catch (err) {
  console.error("Unable to read config file! Exiting...", err);
}

interface configFile {
  TOKEN: string;
  DEV_GUILD_ID?: string;
}

// Attempt to read the configuration
const config: configFile = JSON.parse(
  (await readFile("./config.json")).toString(),
);

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

try {
  console.log("Started refreshing application (/) commands.");
  // If this is a dev bot, deploy commands locally on the target guild, otherwise send everything to global:
  if (config.DEV_GUILD_ID) {
    // Fetch the desired guild
    const targetGuild = await (
      await client.guilds.fetch()
    ).get(config.DEV_GUILD_ID);

    // After fetching, convert from oauth2guild to guild, set the commands now that the key is in place
    await (await targetGuild?.fetch())?.commands.set(commands);
  } else {
    // Await is on both of these so that the console outputs exactly when the commands are initialized
    await client.application?.commands.set(commands);
  }

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(config.TOKEN);
