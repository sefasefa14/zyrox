const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Eğlence Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Zar At**`,`<:zyroxpartner:768418592231915530> \`${prefix}zarat\``,true)
.addField(`**Pixel**`,`<:zyroxpartner:768418592231915530> \`${prefix}pixel\``,true)
.addField(`**Tkm**`,`<:zyroxpartner:768418592231915530> \`${prefix}tkm\``,true)
.addField(`**Çıkma Teklifi Et**`,`<:zyroxpartner:768418592231915530> \`${prefix}çıkma-teklifi-et\``,true)


  //.setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["eğlence","fy"], 
    permLevel: 0
  };
  exports.help = {
    name: 'eğlence'
  }; 
  