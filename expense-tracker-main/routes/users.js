const express = require('express')
const router = express.Router()
const User = require('../models/users')


router.route('/').get(async (req,res)=>{
    try {
  const user = await User.find({})
  res.status(200).json({ user })
    }
    catch (err)
    {
        console.log(err)
    }
})

router.route('/add').post(async (req,res)=>{
    try {
  const user = await User.create(req.body)
  res.status(201).json({ user })
    }
    catch (err)
    {
        console.log(err)
    }
})

router.route('/:id').get(async (req, res) => {
    try{
  const { id: userID } = req.params
  const user = await User.findOne({ _id: userID })
  res.status(200).json({ user })
    }
    catch(err)
    {
        console.log(err)
    }
})

router.route('/:id').delete(async (req, res) => {
    try {
      
  const { id: userID } = req.params
  const user = await User.findOneAndDelete({ _id: userID })
  res.status(200).json({ user })
    }
    catch (err)
    {
        console.log(err)
    }
})

router.route('/:id').patch(async (req, res) => {
    try{
  const { id: userID } = req.params

  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ user })
}
catch(err){
    console.log(err)
}
})

router.route('/').put(async (req, res) => {
    try{
  const user = await User.updateMany({},req.body,this.options)
  res.status(200).json({ user })
}
catch(err){
    console.log(err)
}
})


module.exports = router