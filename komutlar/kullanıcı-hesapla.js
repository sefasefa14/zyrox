const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents



exports.run = function(client, message, args) {
    var soru = args.join(' ');
    
    if(!soru) return message.reply('Bir işlem belirtin. **Doğru Kullanım**: z!hesapla <işlem>')
    else { let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send('Hatalı işlem: **' + err)
        }

        const embed = new Discord.RichEmbed()
         .setColor('#8470ff')
        .addField('Soru <:zyroxpartner:768418592231915530>', soru)
        .addField('Cevap <:zyroxpartner:768418592231915530>', cevap)

        message.channel.send(embed)
    }


};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'hesapla', 
  description: 'Belirtilen işlemi yapar.',
  usage: 'hesapla <işlem>'
};