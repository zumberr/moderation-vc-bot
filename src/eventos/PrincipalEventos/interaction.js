const { ChannelType,PermissionFlagsBits,ActionRowBuilder,ButtonBuilder,EmbedBuilder} = require("discord.js")

module.exports = {
  name: 'interactionCreate',
  async execute( client, EmbedBuilder,BaseInteraction) {



    if(BaseInteraction.isCommand()){
      const command = client.SlashCommands.get(BaseInteraction.commandName);
      if(!command) return BaseInteraction.followUp({ content: "A ocurrido un error " });
     
      let options = [];
      for (let option of BaseInteraction.options.data) {
       if (option.type === "SUB_COMMAND") {
           if (option.name) options.push(option.name);
           option.options?.forEach((x) => {
               if (x.value) options.push(x.value);
           });
       } else if (option.value) options.push(option.value);
   }
   BaseInteraction.member = BaseInteraction.guild.members.cache.get(BaseInteraction.user.id);
   if(!BaseInteraction.member.permissions.has(command.UserPerms || [])){
    const noperm = new EmbedBuilder()
              .setTitle('Error |<a:no:856039474383421440>')
              .setDescription("Necesitas el permiso de `" + `${command.UserPerms || []}` + "`para ejecutar este comando")
              .setColor("RED")
          return BaseInteraction.reply({ embeds: [noperm],ephemeral: true})

  }
  if(!BaseInteraction.guild.members.me.permissions.has(command.BotPerms || [])){
     const nope = new EmbedBuilder()
     .setTitle('Error |<a:no:856039474383421440>')
     .setDescription("Necesito estos permisos ` " + `${command.BotPerms || []}` + " ` para ejecutar este comando`")
     .setColor("Red")
     return BaseInteraction.reply({ embeds: [nope],ephemeral: true})
  } 
  try{
    command.execute(client,options, BaseInteraction,ActionRowBuilder,ButtonBuilder,EmbedBuilder)
  }catch(e){
    BaseInteraction.followUp({ content: "A ocurrido un error " });
  }

    }




  }}