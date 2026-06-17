module.exports = {
  name: "ban",
  execute(message, args) {

    // permisos
    if (!message.member.permissions.has("BanMembers")) {
      return message.reply("❌ No tienes permisos para banear.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("❌ Menciona a alguien.");

    const reason = args.slice(1).join(" ") || "Sin razón";

    user.ban({ reason })
      .then(() => {
        message.reply(`🔨 Usuario baneado: ${user.user.tag}`);
      })
      .catch(err => {
        message.reply("❌ No pude banear al usuario.");
        console.log(err);
      });
  }
};