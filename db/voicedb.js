const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const vc = new Schema({
  Server: String,
  Canal:String,
  Creador:String,
  CanalID:String,
  Unidos:{type:Array,default:[]}
})

module.exports = mongoose.model("voice", vc)