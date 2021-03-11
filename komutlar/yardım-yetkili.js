const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => {
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix
let eklenti = new Discord.RichEmbed()
.setAuthor(`ZyRox | Yetkili Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Prefix**`,`<:zyroxpartner:768418592231915530> \`${prefix}prefix\``,true)
.addField(`**Reklam Kick**`,`<:zyroxpartner:768418592231915530> \`${prefix}reklam-kick\``,true)
.addField(`**Mod Log**`,`<:zyroxpartner:768418592231915530> \`${prefix}modlog\``,true)
.addField(`**Sil**`,`<:zyroxpartner:768418592231915530> \`${prefix}sil\``,true)
.addField(`**Panel**`,`<:zyroxpartner:768418592231915530> \`${prefix}panel\``,true)
.addField(`**Ban**`,`<:zyroxpartner:768418592231915530> \`${prefix}ban\``,true)
.addField(`**Ban Affı**`,`<:zyroxpartner:768418592231915530> \`${prefix}banaffı\``,true)
.addField(`**Ban Say**`,`<:zyroxpartner:768418592231915530> \`${prefix}bansay\``,true)
.addField(`**Oylama**`,`<:zyroxpartner:768418592231915530> \`${prefix}oylama\``,true)
.addField(`**Hızlı Çekiliş**`,`<:zyroxpartner:768418592231915530> \`${prefix}hızlıçek\``,true)
.addField(`**Çekiliş**`,`<:zyroxpartner:768418592231915530> \`${prefix}çekiliş\``,true)
.addField(`**Sa As**`,`<:zyroxpartner:768418592231915530> \`${prefix}sa-as\``,true)
.addField(`**Duyuru**`,`<:zyroxpartner:768418592231915530> \`${prefix}duyuru\``,true)



 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti)
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yetkili","yy"],
    permLevel: 0
  };
  exports.help = {
    name: 'moderasyon'
  };
