const{ChannelType,PermissionFlagsBits}=require("discord.js")
const{joinVoiceChannel,createAudioPlayer,createAudioResource,generateDependencyReport}=require("@discordjs/voice")
const {config}=require("../../forma/config")
const voice = require("../../../db/voicedb")
module.exports = {
  name: 'crear_canal',
  description: 'Crea un canal priv para usted',
  options: [],
  UserPerms:[],
  BotPerms:["Connect","Speak"],
  async execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder) {

    
    //* parte de la union
       let conectado = BaseInteraction.member.voice.channel;
       if(!conectado)return BaseInteraction.reply({content:"No estas en un canal de voz",ephemeral:true})   
         

    const srv = client.guilds.cache.get(config.Guild.Server) 
    const everyone = srv.roles.cache.find(r => r.name === "@everyone")
            
              const user = BaseInteraction.user

              BaseInteraction.guild.channels.create({
                name:`Canal de ${user.username}`,
                type:2,
                parent:config.Guild.VoiceCatego,
                permissionOverwrites:[{
                  id: everyone,
                  deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory]
                },{
                  id: user.id,
                  allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory]
                }]
                
              }).then(async c =>{
                const miembro = BaseInteraction.member
                miembro.voice.setChannel(c.id)

               const newCanal = new voice({
                  Server:BaseInteraction.guild.id,
                  Creador:BaseInteraction.user.id,
                  CanalID:c.id
                  
                })
                newCanal.save((err, document) => {
                  if (err) console.log(err);
                })
                

              })
                    
                 

              BaseInteraction.reply({content:"Se ah creado un canal",ephemeral:true})
}}