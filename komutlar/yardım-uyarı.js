const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Uyarı Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Uyarı Ver**`,`<:zyroxpartner:768418592231915530> \`${prefix}uyar @user\``,true)
.addField(`**Uyarı Sil**`,`<:zyroxpartner:768418592231915530> \`${prefix}uyarı-sil @user\``,true)
.addField(`**Uyarılar**`,`<:zyroxpartner:768418592231915530> \`${prefix}uyarılar\``,true)

 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["uyarıyardım","uy","uyarı-yardım"], 
    permLevel: 0
  };
  exports.help = {
    name: 'uyarı'
  }; 
