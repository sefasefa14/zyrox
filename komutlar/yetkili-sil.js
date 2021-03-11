const Discord = require('discord.js');
const talkedRecently = new Set();
exports.run = function(client, message,  args) {
let codeworkprefix = args.slice(0).join('!');
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(` <a:zyroxcarpi:768471338590535770> Bu özelliği kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olmalısınız.`);
       if (talkedRecently.has(message.author.id)) {
           return message.channel.send(message.author + ",Bu Özelliği 10 Saniyede Bir Kullanabilirsin!");
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          talkedRecently.delete(message.author.id);
        }, 10000);
    }
if(!args[0]) return message.channel.send(message.author + ",<a:zyroxcarpi:768471338590535770> Lütfen 1-99 Arası Sayı Girin!");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**${message.member}, ${args[0]} Adet Mesaj Başarıyla Discord'un Derinliklerine Yollandı** <a:zyroxtik:768476043127291967> `).then(msg => msg.delete(5000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil'
};
