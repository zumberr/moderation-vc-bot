
const ms = require("ms")
module.exports = {
  name: 'mute',
  description: 'muteas a un usuario',
  options: [{
    name:"user",
    description:"el usuario a dar warn",
    type:6,
    required:true,
  },{
    name:"tiempo",
    description:"la duración del mute, ejempl: 1s,1d,1h",
    type:3,
    required:true,
  },{
    name:"razon",
    description:"la razon del mute",
    type:3,
    required:false,
  }],
  UserPerms:["ManageGuild","Administrator"],
  BotPerms:[],
  async execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder) {
             
    const u = BaseInteraction.options.getUser("user")
    const user = BaseInteraction.guild.members.cache.get(u.id)
    const tiempo = BaseInteraction.options.getString("tiempo")
    const r =BaseInteraction.options.getString("razon")
    const razontrue = r?r :"No se ah dado una razón"

    let tiempoDicho = tiempo.replace("m", " minutos").replace("h", " horas())").replace("d", " dia(s)").replace("w", " semanas").replace("y", " años")
  console.log(user)
    if(user.isCommunicationDisabled() === true){
      let tiempito = ms(user.communicationDisabledUntilTimestamp - Date.now(),{ long: true }).replace("minutes"," minutos").replace("hours"," horas").replace("days"," dias").replace("weeks"," semanas").replace("seconds"," segundos")
      const  err3 = new EmbedBuilder()
      .setTitle("Error | <a:no:856039474383421440>")
      .setDescription("**Usuario ya está muteado**")
      .addField("**Usuario ya está muteado**", `El usuario ${user} ya está muteado por ${tiempito}`)
      .setColor("CB0808")
      return BaseInteraction.reply({ embeds: [err3] ,ephemeral: true})
    }else{
      await user.timeout(ms(tiempo), `${razontrue}`).then(() => {
        const mut = new EmbedBuilder()
        .setTitle("Usuario muteado correctamente | <a:si:852607081639051274>")
        .setDescription(`El usuario ${user.user.tag} ha sido muteado `)
        .addFields({name:"**Datos del mute**", value:`**Usuario:** <@${user.id}>\n**Razon:** ${razontrue}\n**Tiempo:** ${tiempoDicho}`})
        .setColor("#00ff00")
        BaseInteraction.reply({ embeds: [mut] })
      })
    }
            
}}