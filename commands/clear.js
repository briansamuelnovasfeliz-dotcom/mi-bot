module.exports = {
  name: "clear",
  execute(message, args) {

    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("❌ No tienes permisos.");
    }

    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100) {
      return message.reply("❌ Usa un número entre 1 y 100.");
    }

    message.channel.bulkDelete(amount, true)
      .then(() => {
        message.channel.send(`🧹 Se borraron ${amount} mensajes.`)
          .then(msg => setTimeout(() => msg.delete(), 3000));
      })
      .catch(err => {
        message.reply("❌ Error al borrar mensajes.");
        console.log(err);
      });
  }
};