const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Otorol Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Otorol Ayarla**`,`<:zyroxpartner:768418592231915530> \`${prefix}otorol-ayarla\``,true)
.addField(`**Otorol Kapat**`,`<:zyroxpartner:768418592231915530> \`${prefix}otorol-kapat\``,true)
.addField(`**Otorol Mesaj**`,`<:zyroxpartner:768418592231915530> \`${prefix}otorol-mesaj\``,true)

// .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["otorol","oy"], 
    permLevel: 0
  };
  exports.help = {
    name: 'otorol'
  }; 
