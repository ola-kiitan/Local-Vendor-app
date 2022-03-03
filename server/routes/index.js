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
// create a new dish
router.post('/dishes', (req, res, next) => {
  const { imageURL, name, ingredient, price, origin } = req.body
  Dish.create({ imageURL, name, ingredient, price, origin })
    .then((dish) => {
      res.status(201).json(dish)
    })
    .catch((err) => next(err))
})
// get a specific Dish info
router.get('/:id', (req, res, next) => {
  Dish.findById(req.params.id).then((dish) => {
    if (!dish) {
      res.status(404).json(dish)
    } else {
      res.status(200).json(dish)
    }
  })
})
// update a dish
router.put('/:id', (req, res, next) => {
  const { imageURL, name, ingredient, price, origin } = req.body
  Dish.findByIdAndUpdate(
    req.params.id,
    {
      imageURL,
      name,
      ingredient,
      price,
      origin,
    },
    { new: true }
  )
    .then((updatedDish) => {
      res.status(200).json(updatedDish)
    })
    .catch((err) => next(err))
})
// delete a dish
router.delete('/:id', (req, res, next) => {
  Dish.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'dish deleted' })
    })
    .catch((err) => next(err))
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router
