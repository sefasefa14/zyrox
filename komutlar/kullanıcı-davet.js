const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
  const embed = new Discord.RichEmbed()
    .setColor("#8470ff")
    .addField(`<:zyroxpartner:768418592231915530> Botu Sunucunuza Davet Edin !`, `[Tıkla](https://discordapp.com/api/oauth2/authorize?client_id=709396143435546748&permissions=8&scope=bot)`)
.setFooter(client.user.username, client.user.avatarURL)

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['davet'],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "davet",
  description: "davet",
  usage: "davet"
};
