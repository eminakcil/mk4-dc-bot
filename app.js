const Discord = require('discord.js');
const client = new Discord.Client();

const roller = {
  admin: { name: 'Admin', id: '707582955819892772' },
  mod: { name: 'Mod', id: '707582955819892775' },
  uye: { name: 'Uye', id: '707582955819892770' },
  misafir: { name: 'Misafir', id: '707612049718509698' },
  ban: { name: 'Ban', id: '708531415213539388' },
  mute: { name: 'Mute', id: 'Mute' },
  move: { name: 'Taşı', id: '708551852282740797' }
}
client.on('ready', () => {
  console.log('Hazırım!')
})

client.on('message', message => {

})

client.on('guildMemberAdd', (member) => {
  //rol atayabilrisin ve hoşgeldin mesajı bla bla bla
  const misafirRol = member.guild.roles.cache.get(roller.misafir.id)
  member.roles.add(misafirRol)
})

client.login('NzA4NTU4NjcwMzgzOTM5NTk1.XrZG2Q.CmBAUyIkcN25V5HAwZLNI7EmQP8')