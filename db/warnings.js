const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const warns = new Schema({

	locacion: String,
	usuario: String,
	datos: Array,

})


module.exports = mongoose.model("UserWarns", warns)