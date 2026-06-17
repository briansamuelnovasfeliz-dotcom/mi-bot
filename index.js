require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;
const CANAL_ID = process.env.CANAL_ID;

client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);

  // ⏰ cada 24 minutos
  cron.schedule('*/24 * * * *', async () => {
    try {
      const canal = await client.channels.fetch(CANAL_ID);

      if (!canal) {
        console.log('❌ Canal no encontrado');
        return;
      }

      canal.send(
        '🚨 @everyone recuerden que el día 20 iniciamos stream 🎥🔥'
      );

    } catch (error) {
      console.log('❌ Error cron:', error);
    }
  });
});

client.login(TOKEN);