const { default: mongoose } = require("mongoose")

const useSchema = mongoose.Schema({
  id: String,
  username: String,
  password: String,
})

const User = mongoose.model('User', useSchema)

module.exports = { User }