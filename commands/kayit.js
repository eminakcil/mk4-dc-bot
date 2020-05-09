const roller = require('../rol.json')

module.exports = {
  name: 'kayıt',
  description: 'Yeni gelen misafirleri kayıt et!',
  usage: '<misafir>',
  args: true,
  guildOnly: true,
  access: [
    roller.admin.id,
    roller.mod.id
  ],
  execute(message, args) {
    const taggedUser = message.mentions.users.first()
    if (taggedUser) {
      const member = message.guild.member(taggedUser)

      if (member.roles.cache.has(roller.misafir.id)) {
        member.roles.remove(roller.misafir.id)
        member.roles.add(roller.uye.id)
        message.channel.send(`${taggedUser} kaydedildi!`)
      } else {
        message.channel.send(`${taggedUser} misafir değil!`)
      }
    } else {
      message.channel.send(`${args[0]} geçerli bir misafir gibi görünmüyor`)
    }
  },
}