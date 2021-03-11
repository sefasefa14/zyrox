const Discord = require('discord.js');
exports.run = (client, message, args) => {
 message.delete();
    message.guild.createChannel(`talep${message.author.username}`, 'text').then(ch => {
        ch.overwritePermissions(message.member.roles.first(),{
            VIEW_CHANNEL: false,
        }).catch()
        message.guild.roles.forEach((role) => {
            if (role.hasPermission("MANAGE_MESSAGES")) {
                ch.overwritePermissions(role,{
                    VIEW_CHANNEL: true,
                }).catch()
                ch.overwritePermissions(message.author.id,{
                    VIEW_CHANNEL: true,
                }).catch()
            }
        })
        const embed = new Discord.RichEmbed()
        .setColor("#8470ff")
        .setTitle(`» Hey ${message.author.username} !`)
        .setAuthor("» ZyRox | Destek Sistemi")
        .setDescription("**Yetkili Arkadaşlar Sizinle İlgilenecektir.\nDestek Talebini İptal Etmek İçin \`[z!destek-kapat]\` Yazabilirsin!**")
        .setFooter(' ZyRox | Destek Sistemi', client.user.avatarURL)
        .setTimestamp()
        ch.send(embed).catch()
        ch.send("@everyone <a:zyroxcarpi:768471338590535770")
        ch.send(`<@${message.author.id}>`)
        ch.send(` Talep Açan : ${message.author.usarname}`)
        ch.send(`Talep Açan İd : ${message.author.id}`)
        ch.send(`Talep Açanın Tagı  : ${message.author.tag}`)
        ch.awaitMessages((msg)=> {
            if (msg.content === "z!destek-kapat") {
                ch.send("`Talebiniz iptal ediliyor!` ").then(()=>{
                    setTimeout(()=> {
                        ch.delete().catch()
                    },1000)
                });
            }
        },{time:86400000})
    })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['talep'],
  permLevel: 0
};
exports.help = {
  name: 'talep',
  description: 'Destek talebi açar.',
  usage: 'c+talep'
};