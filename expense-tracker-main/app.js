const express = require('express')
const cors = require('cors')
const expenseroute = require('./routes/expenses')
const userroute = require('./routes/users')
const connectDB = require('./db/connect')
const app = express()

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/expenses',expenseroute)
app.use('/users', userroute)


const start = async ()=> {
    try{
        await connectDB()
        app.listen(5000, ()=>{
            console.log(`server is running on 5000...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()



