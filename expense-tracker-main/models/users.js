const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  lent : {
    type : Number,
    default: 0
  },
  borrowed : {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('user',userSchema)