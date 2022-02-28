const express = require('express')
const router = express.Router()
const Expense = require('../models/expenses')


router.route('/').get(async (req,res)=>{
    try {
  const expense = await Expense.find({})
  res.status(200).json({ expense })
    }
    catch (err)
    {
        console.log(err)
    }
})

router.route('/add').post(async (req,res)=>{
    try {
        const expense = await Expense.create(req.body)
        res.status(201).json({ expense })
    } catch (error) {
        console.log(error)
           }
})

router.route('/:id').get(async (req, res, next) => {
    try{
  const { id: expenseID } = req.params
  const expense = await Expense.findOne({ _id: expenseID })

  res.status(200).json({ expense })
    }
    catch(err)
    {
        console.log(err)
    }
})

router.route('/:id').delete(async (req, res, next) => {
    try {
      
  const { id: expenseID } = req.params
  const expense = await Expense.findOneAndDelete({ _id: expenseID })
  res.status(200).json({ expense })
    }
    catch (err)
    {
        console.log(err)
    }
})

router.route('/:id').patch(async (req, res, next) => {
    try{
  const { id: expenseID } = req.params

  const expense = await Expense.findOneAndUpdate({ _id: expenseID }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ expense })
}
catch(err){
    console.log(err)
}
})

module.exports = router