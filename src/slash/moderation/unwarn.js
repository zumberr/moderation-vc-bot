const w = require("../../../db/warnings")
module.exports = {
  name: 'unwarn',
  description: 'le quita un warn a un usuario',
  options: [{
    name: "usuario",
    description: "el usuario a quitar el warn",
    type: 6,
    required: true,
  }, {
    name: "id",
    description: "el id del warn",
    type: 3,
    required: true,
  }],
  UserPerms: ["ManageGuild","Administrator"],
  BotPerms: [],
  async execute(client, options, BaseInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder) {

    const user = BaseInteraction.options.getUser("usuario");
    const id = BaseInteraction.options.getString("id");

    const warns = await w.findOne({ locacion: BaseInteraction.guild.id, usuario: user.id })

    let datos = warns.datos.find(x => x.ID === id)
    
    if (!datos) {
      const embed3 = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Error de unwarn | 📝")
        .setDescription(`La id está mal escrita o no existe`)
        .setTimestamp()
      return BaseInteraction.reply({ embeds: [embed3], ephemeral: true })
    } else {
      await w.updateMany({ locacion: BaseInteraction.guild.id, usuario: user.id },{
        $pull:{datos:{ID:id}}
      },{safe:true})

     const desicion = new EmbedBuilder()
     .setColor("Green")
     .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
     .setTitle("Usuario unwarneado | <a:si:852607081639051274>")
     .setDescription(`AL usuario <@${user.id}> le has quitado el warn ${id}`)
     .setTimestamp()
       BaseInteraction.reply({embeds:[desicion]})  
    
    }

    



  }
}