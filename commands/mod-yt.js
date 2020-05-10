const roller = require('../rol.json')

module.exports = {
  name: 'mod-yt',
  description: 'Mod yapar',
  usage: '<üye>',
  args: true,
  guildOnly: true,
  access: [
    roller.admin.id
  ],
  execute(message, args) {
    const taggedUser = message.mentions.users.first()
    if (taggedUser) {
      const member = message.guild.member(taggedUser)

      if (!member.roles.cache.has(roller.mod.id)) {
        if (member.roles.cache.has(roller.ban.id)) { member.roles.remove(roller.ban.id) }
        if (member.roles.cache.has(roller.mute.id)) { member.roles.remove(roller.mute.id) }
        if (member.roles.cache.has(roller.move.id)) { member.roles.remove(roller.move.id) }
        if (member.roles.cache.has(roller.uye.id)) { member.roles.remove(roller.uye.id) }
        member.roles.add(roller.mod.id)
        message.channel.send(`${taggedUser} artık Mod!`)
      } else {
        message.channel.send(`${taggedUser} zaten Mod!`)
      }
    } else {
      message.channel.send(`${args} geçerli bir kullanım gibi görünmüyor`)
    }
  },
}