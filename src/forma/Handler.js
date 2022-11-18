let rutaComando = "../Comandos"
let rutaEvento = "../eventos"
let rutaSlash = "../slash"

const path = require('path')


module.exports.Comandos = function (fs,client,Collection){
    client.Comandos = new Collection()
    const commandFolder = fs.readdirSync(path.join(__dirname,rutaComando))
    for(const folder of commandFolder){
      const commandFile = fs.readdirSync(path.join(__dirname,rutaComando,folder))
      for(const file of commandFile){
        const comand = require(path.join(__dirname,rutaComando,folder,file))
        client.Comandos.set(comand.name,comand)
      }
    }


}
module.exports.Eventos = function(fs,client,EmbedBuilder){
  const Events = fs.readdirSync(path.join(__dirname,rutaEvento))
  for(const folder of Events){
  const EventFolder = fs.readdirSync(path.join(__dirname,rutaEvento,folder))
  for(file of EventFolder){
    const evento = require(path.join(__dirname,rutaEvento,folder,file))
    if(evento.once){
      client.once(evento.name,(...args)=>evento.execute(client,...args))
    }else{
      client.on(evento.name, (...args) => evento.execute( client, EmbedBuilder,...args, ))
    }
  }
  }

}

module.exports.Slash = function(fs,client,Collection){
  client.SlashCommands= new Collection()
  const commandFolder = fs.readdirSync(path.join(__dirname,rutaSlash))
    for(const folder of commandFolder){
      const commandFile = fs.readdirSync(path.join(__dirname,rutaSlash,folder))
      for(const file of commandFile){
        const comand = require(path.join(__dirname,rutaSlash,folder,file))
        client.SlashCommands.set(comand.name,comand)
      }
    }

}