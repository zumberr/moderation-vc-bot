module.exports = {
  name: "test",
  alias: ['t'],
  description: 'Es para un test',
  cooldown:3000,
  async execute(message, args, EmbedBuilder, client) {

    const embed = new EmbedBuilder()
    .setTitle("test de la v14")
    .setDescription("Este es un mensaje Embed en la v14 , si lo vez quiere decir que vas bien uwu")
    .setColor("Green")

    message.reply({embeds:[embed]})
  }}