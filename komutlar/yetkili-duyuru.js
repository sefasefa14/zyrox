const Discord = require('discord.js');

 exports.run = (client, message, args) => {
   message.delete();

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.sendEmbed(

     new Discord.RichEmbed()

     .addField(`Yazı Yazman Gerek`)).then(m => m.delete(5000));

     console.log("Duyuru komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
     message.channel.sendEmbed(

       new Discord.RichEmbed()

       .setColor("#8470ff0")
       .setThumbnail(client.user.avatarURL)
       .setTimestamp()
       .setFooter('ZyRox', client.user.avatarURL)

       .addField(`**ZyRox | Duyuru**`, `**${question}**`)).then(function(message) {

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['Duyuru'],

  permLevel: 2
};

exports.help = {
  name: 'duyuru',
  description: 'Oylama yapmanızı sağlar.',
  usage: 'duyuru <oylamaismi>'
};
