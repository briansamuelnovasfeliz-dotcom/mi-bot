require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const cron = require('node-cron');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 📦 comandos
client.commands = new Map();

const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// 🟢 READY
client.once('clientReady', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);

  // ⏰ cada 25 minutos
  cron.schedule('*/25 * * * *', async () => {
    try {
      const canal = await client.channels.fetch(process.env.CANAL_ID);

      if (!canal) return console.log('❌ Canal no encontrado');

      canal.send('🚨 @everyone gente actívese 🔥 recuerden que el 20 de este mes iniciamos los streams 🎥💪');

      console.log('📢 Mensaje automático enviado');
    } catch (err) {
      console.log('❌ Error cron:', err);
    }
  });
});

// 💬 comandos
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const prefix = "!";
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
    console.log(`📩 ${message.author.tag} usó !${commandName}`);
  } catch (err) {
    console.log('❌ Error comando:', err);
  }
});

// 🔑 LOGIN
client.login(process.env.TOKEN);