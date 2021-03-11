const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client,message,args) => {

const asd = message.mentions.roles.first() || args.slice(0).join(' ')
if(!asd) return message.channel.send(new Discord.RichEmbed().setColor('#8470ff').setDescription('<a:zyroxcarpi:768471338590535770 Lütfen rol etiketleyin'))

db.set(`muteyetkilirol_${message.guild.id}`, asd.id)
message.channel.send(new Discord.RichEmbed().setColor('#8470ff').setDescription(`Başarıyla mute yetkili rolü **${asd}** olarak ayarlandı!`))
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 2,
aliases: []
}

exports.help = {
name: 'mute-yetkili-rol' ,
category:'Mod'   
}