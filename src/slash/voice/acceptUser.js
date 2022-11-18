const voice = require("../../../db/voicedb")
const{config}=require("../../forma/config")
const{ChannelType,PermissionFlagsBits}=require("discord.js")
module.exports = {
  name: 'joinuser',
  description: 'Le das permiso a otro usuario a que pueda unirse a tu canal de voz',
  options: [{
    name:"usuario",
    description: "el usuario al que le vas a dar el permiso",
    type:6,
    required: true
  }],
  UserPerms:[],
  BotPerms:[],
  async execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder) {

              const canal = await voice.findOne({Server:BaseInteraction.guild.id,Creador:BaseInteraction.user.id})
              if(!canal)return BaseInteraction.reply({content:"No tienes ningún canal creado a tu nombre",ephemeral: true})
          
              const user = BaseInteraction.options.getUser("usuario");
            const srv = client.guilds.cache.get(config.Guild.Server) 
            const canalito = srv.channels.cache.get(canal.CanalID)
            console.log(user)
 /**
  * canalito.permissionOverwrites.edit([{
              id:user.id,
              allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory]
            }])
  */             
                 canalito.permissionOverwrites.edit(user.id,{Connect:true,ViewChannel:true})
            
            BaseInteraction.reply({content:"Ya se puede unir"})
           
           

            
}}