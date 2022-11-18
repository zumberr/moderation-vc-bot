module.exports = {
  name: 'messageCreate',
  async execute( client, EmbedBuilder,message) {
    const {config} = require("../../forma/config")
    const prefix = config.bot.Prefix 
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.Comandos.get(commandName) || client.Comandos.find(a => a.alias && a.alias.includes(commandName))


    if (!command) {
        const embed = new MessageEmbed()
            .setTitle('Error |<a:no:856039474383421440>')
            .setDescription(`El comando **${commandName}** no existe <a:no:856039474383421440>`)
            .setColor("RED")
        return message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 1800));
    }
    try{
      command.execute(message, args, EmbedBuilder, client)
    }catch (e) {
      console.error(e)
      message.reply("Ocurrio un error al ejecutar el comando")
  }

  }}