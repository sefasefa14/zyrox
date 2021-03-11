const db = require("quick.db");
const Discord = require('discord.js');
const fynx = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`ZyRox | Kullanıcı Yardım Menüsü`, client.user.avatarURL)
.setColor('#8470ff')
.addField(`**Afk**`,`<:zyroxpartner:768418592231915530> \`${prefix}afk SEBEB\``,true)
.addField(`**Avatar**`,`<:zyroxpartner:768418592231915530> \`${prefix}avatar\``,true)
.addField(`**Banner**`,`<:zyroxpartner:768418592231915530> \`${prefix}banner YAZI\``,true)
.addField(`**Talep**`,`<:zyroxpartner:768418592231915530> \`${prefix}talep\``,true)
.addField(`**Davet**`,`<:zyroxpartner:768418592231915530> \`${prefix}davet\``,true)
.addField(`**Hesapla**`,`<:zyroxpartner:768418592231915530> \`${prefix}hesapla\``,true)
.addField(`**Çay**`,`<:zyroxpartner:768418592231915530> \`${prefix}çay\``,true)
.addField(`**Deste Aç**`,`<:zyroxpartner:768418592231915530> \`${prefix}deste-aç\``,true)
.addField(`**Hata**`,`<:zyroxpartner:768418592231915530> \`${prefix}hata\``,true)
.addField(`**El Yazısı**`,`<:zyroxpartner:768418592231915530> \`${prefix}elyazı\``,true)
.addField(`**Profil**`,`<:zyroxpartner:768418592231915530> \`${prefix}profil\``,true)
.addField(`**Ping**`,`<:zyroxpartner:768418592231915530> \`${prefix}ping\``,true)
.addField(`**İstatistik**`,`<:zyroxpartner:768418592231915530> \`${prefix}istatistik\``,true)

 // .setImage(`https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=ZyRox`)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["kullanıcı","ky"], 
    permLevel: 0
  };
  exports.help = {
    name: 'kullanıcı-yardım'
  }; 
  