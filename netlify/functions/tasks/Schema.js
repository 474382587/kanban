const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  assignee: String,
  priority: String,
  dueDate: String,
  detail: String,
  belongsTo: String,
})

const columnSchema = new mongoose.Schema({
  title: String,
  id: String
})

const Task = mongoose.model('Task', taskSchema)

const Column = mongoose.model('Column', columnSchema)

module.exports = {
  Task,
  Column
}