const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription("**Bu Komutu Kullanmaya Yetkin Yok**")
    .setFooter(bot.user.username, bot.user.avatarURL)
      .setColor("#ffffff");

    message.channel.send(embed);
    return;
  }

  let u = message.mentions.users.first();
let m = args.slice(1).join(" ")
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setDescription("**Lütfen Davet Eklenecek Kişiyi Etiketleyiniz**")
        .setColor("#ffffff")
    );
  }
    if (!m) {
    return message.channel.send(
      new Discord.RichEmbed()
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setDescription("**Lütfen Eklenecek Davet Sayısını Giriniz**")
        .setColor("#ffffff")
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("#ffffff")
  .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`${u}** Adlı Kullanıcıya** ${m} **Davet Eklendi**`);
  message.channel.send(embed);

  db.add(`davet_${message.author.id}_${message.guild.id}`, +m);
};

module.exports.conf = {
  aliases: ["davetekle"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-ekle",
  description: "davet-ekle",
  usage: "davet-ekle"
};
