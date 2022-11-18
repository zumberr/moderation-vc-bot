const w = require("../../../db/warnings")
module.exports = {
  name: 'warns',
  description: 'la lista de warns del ususario',
  options: [{
    name:"usuario",
    description: "el usuario",
    type:6,
    required:true,
  }],
  UserPerms:["ManageGuild","Administrator"],
  BotPerms:[],
  async execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder) {
            
             const user = BaseInteraction.options.getUser("usuario");

             const warns = await w.findOne({locacion:BaseInteraction.guild.id,usuario:user.id})
           
             if(!warns){
              const embed = new EmbedBuilder()
              .setColor("Red")
              .setTitle("Registro de warns | 📝")
              .setDescription(`La persona <@${user.id}> , No tiene ningun warn `)
              .setThumbnail(user.displayAvatarURL({dynamic: true, size : 1024 }))
              .setTimestamp()
              return BaseInteraction.reply({embeds:[embed],ephemeral:true})
             }else{
              const wa = new EmbedBuilder()
            .setTitle("Registro de warns | 📝")
            .setThumbnail(user.displayAvatarURL({dynamic: true, format: 'png' }))
            .addFields({name:`👤 El usario: ${user.tag}`,value:`📝Cantidad de warn: ` + warns.datos.length})
            .addFields({name:`<a:warn:947269334605115412> Datos:`,value:warns.datos.map(x => `**Razón: ** \`${x.Razon} \`\n` + `**Id del Moderador: ** ${x.Mod}\n` + `**ID: ** ${x.ID}\n` +`**Fecha: **${x.Fecha}`, false).join("\n\n")} ) 
            .setColor("Green")
            .setTimestamp()

             BaseInteraction.reply({embeds:[wa]})
             }
           
            


}}