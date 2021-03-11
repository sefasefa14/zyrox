const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox |  İnvite Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Davet Kanal**`,`<:zyroxpartner:768418592231915530> \`${prefix}davet-kanal\``,true)
.addField(`**Davet Ekle**`,`<:zyroxpartner:768418592231915530> \`${prefix}davet-ekle\``,true)
.addField(`**Davet Sil**`,`<:zyroxpartner:768418592231915530> \`${prefix}davet-sil\``,true)
.addField(`**Davet Sıfırla**`,`<:zyroxpartner:768418592231915530> \`${prefix}davet-sıfırla\``,true)
.addField(`**Davet Kanal Sıfırla**`,`<:zyroxpartner:768418592231915530> \`${prefix}davet-kanal-sıfırla\``,true)
.addField(`**Davetler**`,`<:zyroxpartner:768418592231915530> \`${prefix}davetlerim\``,true)
 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["invitesistemi","is"], 
    permLevel: 0
  };
  exports.help = {
    name: 'invite-sistemi'
  }; 
  