const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
       if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:zyroxcarpi:768471338590535770> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
let rol = message.mentions.roles.first()
let kanal = message.mentions.channels.first()
  
if(!rol) return message.channel.send(`<a:zyroxcarpi:768471338590535770> Ayarlamam İçin Bir Rol Etiketlemeilisin. 
<a:zyroxcarpi:768471338590535770> Rolü Etiketleyemiyorsan **Rolün Etiketleme Seçeneğini Aktif Etmeyi Unutma**
<a:zyroxcarpi:768471338590535770> Örnek Kullanım : z!otorol @rol #kanal 

 Önemli Not!!: Oto Rol Vermem İçin Verilecek Rolün Üstünde Bir Rolüm Olmalı Yoksa Rolü Veremem :)`)  
 if(!kanal) return message.channel.send('<a:zyroxcarpi:768471338590535770> Ayarlamam İçin Bir Kanal Etiketlemeilisin.')

message.channel.send(`<a:zyroxtik:768476043127291967> Otorol Aktif Edildi 
<a:zyroxtik:768476043127291967> '${rol}' Olarak Güncelledim! 
<a:zyroxtik:768476043127291967> Kayıt Kanalını '${kanal}' Olarak Güncelledim!`)

db.set(`otok_${message.guild.id}`, kanal.id)  
db.set(`otorol_${message.guild.id}`, rol.id)  

};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'otorol-ayarla',
  description: 'oto-rol-ayarla', 
  usage: 'oto-rol-ayarla'
};