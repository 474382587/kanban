const { default: mongoose } = require("mongoose");

const drawSchema = new mongoose.Schema({
  id: String,
  title: String,
  elements: String
})


const Draw = mongoose.model('Draw', drawSchema)


module.exports = {
  Draw,
}