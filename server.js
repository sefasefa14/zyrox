const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\


//tel
const Constants = require("discord.js/src/util/Constants.js");
Constants.DefaultOptions.ws.properties.$browser = "Discord iOS";

//afk
client.on("message" , async msg => {
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return;

  let afk = msg.mentions.users.first()

  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)

  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.reply(`Etiketlediğiniz Kişi Afk <:zyroxpartner:768418592231915530>\n Sebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){

       msg.reply(`Afk'lıktan Çıktınız`)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)

 }

});
 // Sunucu Panel

client.on("message", async (msg) => {
  let ever = msg.guild.roles.find(c => c.name === "@everyone")
	let sistem = await db.fetch(`panell_${msg.guild.id}`);
	if(sistem == "açık") {
		let kategori = msg.guild.channels.find(c => c.name.startsWith(msg.guild.name));
		if(!kategori) {
			msg.guild.createChannel(`${msg.guild.name} | Sunucu Paneli`, {
				type: 'category',
				permissionOverwrites: [{
					id: msg.guild.id,
					deny: ['CONNECT']
				}]
			}).then(parent => {
        setTimeout(async function() {
          let eo = msg.guild.roles.find(r => r.name == "@everyone")
          parent.overwritePermissions(eo, {
            CONNECT: false
          })
          setTimeout(async function() {
            parent.setPosition(0);
          })
          db.set(`panelParentID_${msg.guild.id}`, parent.id);
          let toplamUye = msg.guild.channels.find(c => c.name.startsWith('Toplam Üye •'));
          if(!toplamUye) {
            try {
              let s = msg.guild.memberCount;
              msg.guild.createChannel(`Toplam Üye • ${s}`, {
                type: 'voice'
              }).then(ch => {
                setTimeout(function() {
                  ch.overwritePermissions(ever, {
                    CONNECT: false
                  })
                  db.set(`toplamID_${msg.guild.id}`, ch.id)
                  ch.setParent(parent);
                  ch.setPosition(1);
                }, 120)
              })
            } catch (err) {

            }
          }
        let uyesayısı = msg.guild.channels.find(c => c.name.startsWith('Üye Sayısı •'));
        if(!uyesayısı) {
          try {
            let uyesayı = msg.guild.members.filter(m => !m.user.bot).size;
            msg.guild.createChannel(`Üye Sayısı • ${uyesayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
                setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(2);
                db.set(`uyeSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let botsayı = msg.guild.members.filter(m => m.user.bot).size;
          try {
            msg.guild.createChannel(`Bot Sayısı • ${botsayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
              setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(3);
                db.set(`botSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let onl = msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size;
          try {
            msg.guild.createChannel(`Çevrimiçi Üye • ${onl}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone");
              setTimeout(function() {
                ch.setParent(parent);
                ch.setPosition(4);
                db.set(`onlSayıID_${msg.guild.id}`, ch.id);
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
              }, 120)
          })
        } catch (err) {

        }
      }
        }, 50)
			})
		} else {
      let parent = msg.guild.channels.find(c => c.name == `${msg.guild.name} | Sunucu Paneli`)
      if(msg.content.includes('panel kapat')) return false;
      let toplamuye = msg.guild.channels.find(c => c.name.startsWith(`Toplam Üye •`));
      toplamuye.setParent(parent);
      toplamuye.setName(`Toplam Üye • ${msg.guild.memberCount}`);
      let uyesayı = msg.guild.channels.find(c => c.name.startsWith(`Üye Sayısı •`));
      uyesayı.setParent(parent);
      uyesayı.setName(`Üye Sayısı • ${msg.guild.members.filter(m => !m.user.bot).size}`);
      let botuye = msg.guild.channels.find(c => c.name.startsWith(`Bot Sayısı •`));
      botuye.setParent(parent);
      botuye.setName(`Bot Sayısı • ${msg.guild.members.filter(m => m.user.bot).size}`);
      let onl = msg.guild.channels.find(c => c.name.startsWith('Çevrimiçi Üye •'));
      onl.setParent(parent);
      onl.setName(`Çevrimiçi Üye • ${msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size}`);
		}
	} else {

	}
})



 /*client.on('ready', ()=>{
 client.channels.get("755016712101036099").join()
    })

 client.on('ready', ()=>{
 client.channels.get("755016711652245515").join()
    })

client.on('ready', ()=>{
 client.channels.get("755016713237692486").join()
    }) */



// Eklendiğinde Ownera Mesaj

client.on("guildCreate", guild => {

  let murphy = guild.owner

const dcs = new Discord.RichEmbed()
.setTitle(`Merhaba!`)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor("#8470ff")//dcs
.addField('Prefixim ;', ayarlar.prefix)
.addField(`Beni Eklediğin İçin`, `Teşekkürler <:zyroxpartner:768418592231915530>`)
murphy.send(dcs)
});


//sa-as
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin <:zyroxtac:768470973229432923> ');

      }
      }

    });
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sea') {
        msg.reply('Aleyküm Selam Hoşgeldin <:zyroxtac:768470973229432923> ');

      }
      }

    });
//sa-as


//otorol

client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`otok_${member.guild.id}`)
let rol = await db.fetch(`otorol_${member.guild.id}`)
let mesaj =  db.fetch(`otomesaj_${member.guild.id}`)
if(!kanal) return

if(!mesaj) {

  client.channels.get(kanal).send('<:zyroxpartner:768418592231915530>** Otomatik Rol Verildi Seninle Beraber **`'+member.guild.memberCount+'` **Kişiyiz! Hoşgeldin! **`'+member.user.username+'`')
member.addRole(rol)
  return
}

if(mesaj) {
  var mesajs = await db.fetch(`otomesaj_${member.guild.id}`).replace("-uye-", `${member.user.tag}`).replace("-rol-", `${member.guild.roles.get(rol).name}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`)
  member.addRole(rol)
  client.channels.get(kanal).send(mesajs)

}

});

//otorol

//////////////////////////MODLOG///////////////////
client.on('messageDelete', async message   => { // mod-log
      let modlogs = db.get(`log_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("#8470ff")
  .setTitle("MESAJ SİLİNDİ")
.setDescription(`<:zyroxpartner:768418592231915530> <@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`)
  .setFooter(" ZyRox | Mod Log Sistemi")
  modlogkanal.sendEmbed(embed);
  })

client.on('guildBanAdd', async message  => {
      let modlogs = db.get(`log_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("#8470ff")

    .setDescription(`<:zyroxpartner:768418592231915530> Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`)
        .setThumbnail(message.user.avatarURL)
  .setFooter(" ZyRox | Mod Log Sistemi")
  modlogkanal.sendEmbed(embed);
  })
client.on('channelCreate', async channel  => {
      let modlogs = db.get(`log_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
if (!modlogkanal) return;
    if (channel.type === "text") {
                let embed = new Discord.RichEmbed()
                    .setColor('#8470ff')
                .setDescription(`<:zyroxpartner:768418592231915530> ${channel.name} adlı metin kanalı oluşturuldu.`)
                .setFooter(` ZyRox | Mod Log Sistemi Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.RichEmbed()
                .setColor('#8470ff')
.setTitle("SES KANALI OLUŞTURULDU")
                .setDescription(`<:zyroxpartner:768418592231915530> ${channel.name} adlı ses kanalı oluşturuldu!`)
                .setFooter(` ZyRox | Mod Log Sistemi Kanal ID: ${channel.id}`)

                modlogkanal.send({embed});
            }

    })
client.on('channelDelete', async channel  => {
      let modlogs = db.get(`log_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
if (!modlogkanal) return;
    if (channel.type === "text") {
                let embed = new Discord.RichEmbed()
                    .setColor('#8470ff')
                .setDescription(`<:zyroxpartner:768418592231915530> ${channel.name} adlı metin kanalı silini!`)
                .setFooter(` ZyRox | Mod Log Sistemi Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.RichEmbed()
                .setColor('#8470ff')
.setTitle("SES KANALI SİLİNDİ")
                .setDescription(`<:zyroxpartner:768418592231915530> ${channel.name} adlı ses kanalı silindi`)
            .setFooter(` ZyRox | Mod Log Sistemi  Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            }
    })
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`log_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("#8470ff")
  .addField("Kullanıcı", oldMsg.author.tag, true)
  .addField("Eski Mesaj",`  ${oldMsg.content}  `)
  .addField("Yeni Mesaj", `${newMsg.content}`)
  .setThumbnail(oldMsg.author.avatarURL)
  kanal.send(embed);

    })
//////////////////////////////MODLOG///////////////////////////

//////////////////////////////////////////REKLAMKİCK

 client.on("message", async message => {
      let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
      let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
      let kullanici = message.member;
      if (reklamkick == 'kapali') return;
      if (reklamkick == 'acik') {
          const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
          if (reklam.some(word => message.content.toLowerCase().includes(word))) {
              if (!message.member.hasPermission("ADMINISTRATOR")) {
                  message.delete();
                  db.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                  if (uyarisayisi === null) {
                      let uyari = new Discord.RichEmbed()
                          .setColor("#8470ff")
                          .setFooter('ZyRox', client.user.avatarURL)
                          .setDescription(`<:zyroxpartner:768418592231915530> **<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen Kickleniceksin (1/3)**`)
                          .setTimestamp()
                      message.channel.send(uyari)                
  }
                  if (uyarisayisi === 1) {
                      let uyari = new Discord.RichEmbed()
                          .setColor("#8470ff")
                          .setFooter('ZyRox', client.user.avatarURL)
                          .setDescription(`<:zyroxpartner:768418592231915530> **<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen Kickleniceksin (2/3)**`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
                  if (uyarisayisi === 2) {
                      message.delete();
                      await kullanici.kick({
                          reason: `Reklam kick sistemi`,
                      })
                      let uyari = new Discord.RichEmbed()
                           .setColor("#8470ff")
                          .setFooter('ZyRox', client.user.avatarURL)
                          .setDescription(`<:zyroxpartner:768418592231915530> **<@${message.author.id}> 3 Adet Reklam Uyarısı Aldığı İçin Kicklendi. Bir Kez Daha Yaparsa Banlanacak**`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
                  if (uyarisayisi === 3) {
                      message.delete();
                      await kullanici.ban({
                          reason: `ZyRox Reklam Kick Sistemi`,
                      })
                      db.delete(`reklamuyari_${message.author.id}`)
                      let uyari = new Discord.RichEmbed()
                           .setColor("#8470ff")
                          .setFooter('ZyRox', client.user.avatarURL)
                          .setDescription(`<:zyroxpartner:768418592231915530> **<@${message.author.id}> Kick Yedikten Sonra Tekrar Devam Ettiği İçin Banlandı.**`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }

              }
          }
      }
  });


///////////////////////reklamkick


 
 
//rndm ppgif

client.on('userUpdate', async (oldUser, newUser) => {
  let kişi = client.users.get(oldUser.id)
  let sroxyn = kişi.avatarURL.split('?')[0]
  if(sroxyn.endsWith('.png')) {
    //console.log(`RANDOM PP => "` + sroxyn + `",`) 
    fs.appendFile("./random-pp", `\n"` + sroxyn + `",`, (err) => console.error);
  }
  if(sroxyn.endsWith('.gif')) {
    //console.log(`RANDOM GİF =>"` + sroxyn + `",`) 
    fs.appendFile("./random-gif", `\n"` + sroxyn + `",`, (err) => console.error);
  }
  })
  //Buyrun Benim Bişimi Dedin
  client.on('message', message => {
    if (message.content === `Zyrox`) {
     message.reply('**Buyrun Benim Birşeymi Dedin : z!** <:zyroxpartner:768418592231915530>')
    }
    });
    client.on('message', message => {
      if (message.content === `ZyRoxİnsanaDönüş`) {
       message.reply('**Buyrun Lordum** <:zyroxpartner:768418592231915530>')
      }
      });
      client.on('message', message => {
        if (message.content === `ZyRoxBotaDönüş`) {
         message.reply('**Emredersiniz Lordum** <:zyroxpartner:768418592231915530>')
        }
        });
    
    client.on('message', message => {
      if (message.content === `zyrox`) {
       message.reply('**Buyrun Benim Birşeymi Dedin : z!** <:zyroxpartner:768418592231915530>')
      }
      });
      
      client.on('message', message => {
        if (message.content === `ZyRox`) {
         message.reply('**Buyrun Benim Birşeymi Dedin : z!**<:zyroxpartner:768418592231915530>')
        }
        });
        
        client.on('message', message => {
          if (message.content === `ZYROX`) {
           message.reply('**Buyrun Benim Birşeymi Dedin : z!**<:zyroxpartner:768418592231915530>')
          }
          });
   //Buyrun Benim Bişimi Dedin        
//İnvite
          const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("#8470ff")
      .setDescription(
        `\`\`${member.user.tag}\`\` **Adlı Kullanıcı Aramızdan Ayrıldı\n Davet Eden** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("#8470ff")
      .setDescription(
        `\`\`${member.user.tag}\`\` **Adlı Kullanıcı Aramızdan Ayrıldı\n Davet Eden** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("#8470ff")
      .setDescription(
        `\`\`${member.user.tag}\`\` **Adlı Kullanıcı Sunucuya Katıldı\n Davet Eden** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` Daveti Oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
//İnvite