const w = require("../../../db/warnings")
const moment = require("moment-timezone");
let time = moment().tz("America/Bogota").format("DD/MM/YYYY");
module.exports = {
  name: 'warn',
  description: 'warn a un user',
  options: [{
    name:"user",
    description:"el usuario a dar warn",
    type:6,
    required:true,
  },{
    name:"razon",
    description:"La razón del warn",
    type:3,
    required:false,
  }],
  UserPerms:["ManageGuild","Administrator"],
  async execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder) {
            
             const user = BaseInteraction.options.getUser("user");
             const r = BaseInteraction.options.getString("razon")
              const razon= r? r: "no se dio una razón"
             if(user == client.user)return BaseInteraction.reply({content:"no ._."})

             //* ramdom //////////////////////////////////
             let Id = "#"+ Math.floor(Math.random()*99999999998)
    
             //* db warn ///////////////////////
             const warns = await w.findOne({
              locacion:BaseInteraction.guild.id,
              usuario:user.id
            })
            if(warns){ 
              await w.updateMany({locacion:BaseInteraction.guild.id,usuario:user.id},{
              $push:{datos:{ID:Id,Mod:BaseInteraction.user.id,Razon:razon,Fecha:time}}
            })}else{
              let newDates = new w({
                locacion:BaseInteraction.guild.id,
                usuario:user.id,
                datos:[{
                ID:Id,
                Mod:BaseInteraction.user.id,
                Razon:razon,
                Fecha:time
                },],
              })

              newDates.save()
            }

            const aviso = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Usuario Advertido | ✅ ")
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields({name:`👤 Usuario adveritdo: ${user.tag} `, value:`👮 advertido por: <@${BaseInteraction.user.id}>`,inline: true})
            .addFields({name:`📝 Razón de la advertencia:`,value:`${razon}`, inline:false})
            .addFields({name:`📆 Fecha de la advertencia:`,value:`${time}`,inline: false})
            .setTimestamp()
            BaseInteraction.reply({embeds:[aviso]})
              



   

}}