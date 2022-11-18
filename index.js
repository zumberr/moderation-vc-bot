const {Client,GatewayIntentBits,Partials, Collection, EmbedBuilder, WebhookClient} =require("discord.js")
const fs = require("fs")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildScheduledEvents,
],
partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
],
allowedMentions: {
    repliedUser: false
},
})

//*  constantes /////////////////////////////////////
const {config,db} = require("./src/forma/config")
const colors = require('colors');
colors.enable();

//* MoongoseDb //////////////////////////////////////////////////////////////////
const mongoose = require('mongoose')
mongoose.connect(db.moongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    () => {
      console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".green)
      console.log("┃                                                                  ┃".green)
      console.log('┃                      Conectado a MongoDB                         ┃'.green)
      console.log("┃                                                                  ┃".green)
      console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".green)
    },
  )
  .catch(err => console.log(err))

  //* mención del bot //////////////////////////////////////////////////
  client.on('messageCreate', async message => {

  
    const prefix = config.bot.Prefix
    let persona = message.author;
  
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      message.reply({ content: `Hola <@` + persona.id + `>  mi prefix es **${prefix}** ` })
    }
  })

//* colections y eventos//////
module.exports = client;
const {Comandos,Eventos,Slash} = require(`${__dirname}/src/forma/Handler.js`)

Comandos(fs,client,Collection)
Eventos(fs,client,EmbedBuilder)
Slash(fs,client,Collection)

client.login(config.bot.Token)











