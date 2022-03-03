const router = require('express').Router()
const Dish = require('../models/Dish')

router.get('/', (req, res, next) => {
  res.status(200).json('All good in here')
})

// get all the menu from the database
router.get('/dishes', (req, res, next) => {
  Dish.find().then((dishes) => {
    res.status(200).json(dishes)
  })
})
// create a new menu
router.post('/', (req, res, next) => {
  const { imageURL, name, ingredient, price, origin } = req.body
  Menu.create({ imageURL, name, ingredient, price, origin })
    .then((dish) => {
      res.status(201).json(dish)
    })
    .catch((err) => next(err))
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router
