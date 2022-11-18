const {config}= require("../../forma/config")

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {


      console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".blue)
      console.log("┃                                                                  ┃".blue)
      console.log('┃                      Ya estoy lista :D                           ┃'.blue)
      console.log("┃                                                                  ┃".blue)
      console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".blue)

      let obj2 = {
          status: "online",
          activities: [{ name: "Mencioname para saber mi prefix", type: "PLAYING" }]
      }


      client.user.setPresence({
          status: "dnd",
          activities: [{ name: "⌛Cargando bot  por favor espera ... ", type: "PLAYING" }]
      })
      setTimeout(() => {
          client.user.setPresence(obj2)
      }, 12000)
      

      

     const slashCommands = client.SlashCommands.map(x => x)
     
     client.guilds.cache.get(config.Guild.Server).commands.set(slashCommands)
    





  }
};