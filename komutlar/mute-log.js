const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client,message,args) => {
const asd = message.mentions.channels.first() || args.slice(0).join(' ')
if(!asd) return message.channel.send(new Discord.RichEmbed().setColor('#8470ff').setDescription('<a:zyroxcarpi:768471338590535770 Lütfen bir kanal etiketle!'))

db.set(`mutelog_${message.guild.id}`, asd.id)
message.channel.send(new Discord.RichEmbed().setColor('#8470ff').setDescription(`Başarıyla mute log kanalı **${asd}** olarak ayarlandı!`))
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}

exports.help = {
name: 'mute-log',  
category:'Mod',  

}