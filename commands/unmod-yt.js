const roller = require('../rol.json')

module.exports = {
  name: 'unmod-yt',
  description: 'Modu üye yapar',
  usage: '<üye>',
  args: true,
  guildOnly: true,
  access: [
    roller.admin.id
  ],
  execute(message, args) {
    const member = message.member.user
    console.log(`> ${member.tag} called unmod-yt.js "${message.content}"`);
    const taggedUser = message.mentions.users.first()
    if (taggedUser) {
      const member = message.guild.member(taggedUser)

      if (!member.roles.cache.has(roller.misafir.id)) {
        if (member.roles.cache.has(roller.mod.id)) {
          member.roles.remove(roller.mod.id)
          member.roles.add(roller.uye.id)
          message.channel.send(`${taggedUser} artık Mod değil!`)
        } else {
          message.channel.send(`${taggedUser} zaten Mod değildi!`)
        }
      } else {
        message.channel.send(`önce misafiri kaydet!`)
      }
    } else {
      message.channel.send(`${args} geçerli bir kullanım gibi görünmüyor`)
    }
  },
}