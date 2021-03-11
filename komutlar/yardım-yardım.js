const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}yardım\``,true)
.addField(`**Kullanıcı Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}kullanıcı\``,true)
.addField(`**Yetkili Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}yetkili\``,true)
.addField(`**Eğlence Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}eğlence\``,true)
.addField(`**Kayıt Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt\``,true)
.addField(`**Otorol Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}otorol\``,true)
.addField(`**Mute Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}mute-sistemi\``,true)
.addField(`**İnvite Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}invite-sistemi\``,true)
.addField(`**Uyarı Yardım Menüsü**`,`<:zyroxpartner:768418592231915530> \`${prefix}uyarı-yardım\``,true)


 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["yardım","y"], 
    permLevel: 0
  };
  exports.help = {
    name: 'yardım'
  }; 
