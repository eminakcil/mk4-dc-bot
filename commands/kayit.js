module.exports = {
	name: 'kayıt',
	description: 'Yeni gelen misafirleri kayıt et!',
  args: true,
  guildOnly: true,
	execute(message, args) {
		message.channel.send(`${args[0]} kayıt edilecek inş`)
	},
};