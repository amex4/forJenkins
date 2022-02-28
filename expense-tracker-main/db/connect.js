const mongoose = require('mongoose')
const connectString = 'mongodb+srv://amex4477:1234@nodeexpressjs.xvmqx.mongodb.net/taskManager?retryWrites=true&w=majority'


const connectDB = (url) => {
  return mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
