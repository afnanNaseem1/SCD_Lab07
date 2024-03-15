const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Work', 'Personal', 'Errands']
  },
  priority: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Completed']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Task', TaskSchema);
