module.exports = {
  name: 'ban',
  description: 'banea a un usuario',
  options: [{ 
    name:"usuario",
    description: "el usuario a banear",
    type:6,
    required:true,
  },{
    name:"razon",
    description: "la razón del ban",
    type:3,
    required:false
  }],
  UserPerms:["ManageGuild","Administrator","BanMembers"],
  BotPerms:["BanMembers"],
  async execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder) {
             
    const user = BaseInteraction.options.getUser("usuario");
    const r = BaseInteraction.options.getString("razon")
    const razon = r? r:"No se dio un movito del ban"
    let rolBot= BaseInteraction.guild.members.me.roles.highest.rawPosition
      let rolUser = BaseInteraction.guild.roles.highest.rawPosition
    if(user.id == client.user.id)return BaseInteraction.reply({content:"no me puedes banear ._."})
    if(!rolBot >rolUser)return BaseInteraction.reply({content:"No puedo banear a este usuario por que mi rol es menor al suyo"})
    
    const ban = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Usuario Baneado| <a:si:852607081639051274> ")
    .setDescription(`${user.tag} a sido baneado , la Razón: ${razon}`)
    .setTimestamp()
    BaseInteraction.reply({embeds:[ban]})
    BaseInteraction.guild.members.ban(user,{reason:razon})

            
}}