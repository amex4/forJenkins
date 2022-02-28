const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  price:{
    type: Number,
    default : 0
  },
  paidBy : {
    type : String,
  }
})

module.exports = mongoose.model('expense',expenseSchema)