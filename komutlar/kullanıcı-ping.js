const Discord = require('discord.js');
exports.run = function(client, message, args) {
  
  message.channel.send(
  
  "**<:zyroxpartner:768418592231915530> Ping Ölçülüyor..**"
  
  ).then(
  function(i){
    i.edit("** <:zyroxpartner:768418592231915530> Ping Yazılıyor <:zyroxpartner:768418592231915530>   **") 
    message.edit(500)
    i.edit(
    new Discord.RichEmbed()
    .setDescription(`<:zyroxpartner:768418592231915530> | **ZyRox Botunun Pingi:** ` + client.ping+`ms | <:zyroxpartner:768418592231915530> `)
    .setColor('#8470ff')   
    )
  })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p'],//Komutun farklı kullanımları
  permLevel: 0
};
exports.help = {
  name: 'ping',
  description: 'Botun gecikme süresini gösterir',
  category: 'bot',
  usage: 'ping'
}