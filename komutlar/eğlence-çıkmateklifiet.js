//#8470ff
const Discord = require('discord.js');
exports.run = function(client, message, args) {
    let dmkisi = message.mentions.users.first();
    if (!dmkisi) return message.channel.send(' **Çıkma Teklif Edeceğin Kişiyi Seçmelisin**');
    let dm = args.slice(1).join(' ');
    const dmat = new Discord.RichEmbed()
    .setColor('#8470ff ')
    .setTimestamp()
    .setTitle('Biri Sana Çıkma Teklifi Etti! ')
    .addField('Ne Cevap Vericen Acaba Bende Merak Ettim ', `Bu Arada Botu eklemeyi Unutma!`)
    .addField('Teklif Eden Kişi :', `➽ <@${message.author.id}>`)
    .setImage("https://media1.tenor.com/images/6f2aa4024f6cbf21c9883fcf0641aded/tenor.gif?itemid=3576871")
    .setDescription("[Resim Açılmassa Tıkla](https://media1.tenor.com/images/6f2aa4024f6cbf21c9883fcf0641aded/tenor.gif?itemid=3576871)")
    .setFooter('Çıkma Teklifi | ZyRox')
    .setFooter('Belki Gerçek Belki Değil  ')
    dmkisi.sendEmbed(dmat);
    const dmtamam = new Discord.RichEmbed()
    .setColor('#8470ff ')
    .setTimestamp()
    .setTitle('Çıkma Teklifi Ettin ')
    .setFooter('Çıkma Teklifi | ZyRox')
    
    message.channel.sendEmbed(dmtamam);
    
        message.channel.send(' **Teklif Gönderildi! Bol Şans! **');
    };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çıkma-teklif-et"],
  permLevel: 0
};

exports.help = {
  name: 'çıkma-teklifi-et',
  description: 'etiketlediğiniz kişiyiye çıkma teklifi edersiniz.',
  usage: 'çıkma-teklifi-et'
};