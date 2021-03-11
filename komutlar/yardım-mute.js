const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Otorol Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Mute Log**`,`<:zyroxpartner:768418592231915530> \`${prefix}mute-log\``,true)
.addField(`**Mute Yetkili Rol**`,`<:zyroxpartner:768418592231915530> \`${prefix}mute-yetkili-rol\``,true)
.addField(`**Mute**`,`<:zyroxpartner:768418592231915530> \`${prefix}mute\``,true)

 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["mute-sistemi","ms"], 
    permLevel: 0
  };
  exports.help = {
    name: 'mute-sistemi'
  }; 
