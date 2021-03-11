const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Kayıt Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Alınacak Rol**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-alınacak-rol\``,true)
.addField(`**Hoşgeldin Mesajı**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-hoşgeldin-mesajı\``,true)
.addField(`**İsim Ayarla**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-isim-ayarla\``,true)
.addField(`**İsim Temizleyici**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-isim-temizleyici\``,true)
.addField(`**Kanal Ayarla**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-kanal-ayarla\``,true)
.addField(`**Kayıt Ol**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıtol\``,true)
.addField(`**Log Ayarla**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-log-ayarla\``,true)
.addField(`**Sistemi Kapat**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-sistemi-kapat\``,true)
.addField(`**Verilecek Rol**`,`<:zyroxpartner:768418592231915530> \`${prefix}kayıt-verilecek-rol\``,true)



 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["kayıt","kyy"], 
    permLevel: 0
  };
  exports.help = {
    name: 'kayıt'
  }; 
  