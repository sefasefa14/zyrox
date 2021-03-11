const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
require('moment-duration-format');
exports.run = async(cclient, message, args) => {

let cembed = new Discord.RichEmbed()
.setAuthor(cclient.user.username, cclient.user.avatarURL)
.setThumbnail(message.author.avatarURL)
.setTimestamp()
.addField("Bot Verileri", `<:zyroxpartner:768418592231915530> Toplam Sunucu **|** **${cclient.guilds.size}** \n<:zyroxpartner:768418592231915530> Toplam Kullanıcı **|** **${cclient.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** \n<:zyroxpartner:768418592231915530> Toplam kanal **|** **${cclient.channels.size}**`)
.addField("<:zyroxtac:768470973229432923> Botun Sahibi", `<@361515225712820225> **|** **361515225712820225** **|** **'chris#0001**`)
.addField("<:zyroxtac:768470973229432923> Botun Sahibi", `<@712636009443098645> **|** **712636009443098645** **|** **Devil Boy#3190**`)
.addField("Gecikmeler", `<a:zyroxstaff:768469275181711402> Bot Pingi **|** **${cclient.ping}** \n<a:zyroxstaff:768469275181711402> Mesaj Gecikmesi **|** **${new Date().getTime() - message.createdTimestamp}**`)
.setColor("#8470ff")
message.channel.send(cembed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['istatistik','i','yapımcım'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'botbilgi',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };
