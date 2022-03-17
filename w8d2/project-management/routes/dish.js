const router = require('express').Router()
const Dish = require('../models/Dish')
const User = require('../models/User')
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config')
const { isAuthenticated } = require('../middleware/jwt')

router.get('/', (req, res, next) => {
  res.status(200).json('All good in here')
})

// get all the menu by a particular vendor from the database
router.get('/dishes', isAuthenticated, (req, res, next) => {
  Dish.find({ vendor: req.payload }).then((dishes) => {
    res.status(200).json(dishes)
  })
})
// get all the menu from the data base
router.get('/explore/', (req, res, next) => {
  Dish.find()
    .populate('vendor')
    .then((dishes) => {
      res.status(200).json(dishes)
    })
}) /
  // POST "/api/upload" =>
  router.post(
    '/upload',
    isAuthenticated,
    fileUploader.single('imageUrl'),
    (req, res, next) => {
      if (!req.file) {
        next(new Error('No file uploaded!'))
        return
      }

      // Get the URL of the uploaded file and send it as a response.

      res.json({ secure_url: req.file.path })
    }
  )

// create a new dish
router.post('/dishes', isAuthenticated, (req, res, next) => {
  const vendorId = req.payload

  const {
    imageUrl,
    name,
    ingredient,
    price,
    facebook,
    twitter,
    instagram,
    origin,
    vendor = vendorId,
  } = req.body
  Dish.create({
    imageUrl,
    name,
    ingredient,
    price,
    origin,
    facebook,
    twitter,
    instagram,
    vendor: req.payload,
  })
    .then((dish) => {
      User.findByIdAndUpdate(
        req.payload,
        { $push: { dish: dish._id } },
        { new: true }
      ).then(() => {
        res.status(201).json(dish)
      })
    })
    .catch((err) => next(err))
})
// get a specific Dish info
router.get('/:id', isAuthenticated, (req, res, next) => {
  Dish.findById(req.params.id).then((dish) => {
    if (!dish) {
      res.status(404).json(dish)
    } else {
      res.status(200).json(dish)
    }
  })
})

// update a dish
router.put('/edit/:id', isAuthenticated, (req, res, next) => {
  const {
    imageUrl,
    name,
    ingredient,
    price,
    origin,
    facebook,
    twitter,
    instagram,
  } = req.body
  Dish.findByIdAndUpdate(
    req.params.id,
    {
      imageUrl,
      name,
      ingredient,
      price,
      origin,
      facebook,
      twitter,
      instagram,
    },
    { new: true }
  )
    .then((updatedDish) => {
      res.status(200).json(updatedDish)
    })
    .catch((err) => next(err))
})
// delete a dish
router.delete('/:id', isAuthenticated, (req, res, next) => {
  Dish.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'dish deleted' })
    })
    .catch((err) => next(err))
})
// get a specific dish user-profile
router.get('/profile/:id', (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .populate('dish')
    .then((user) => {
      res.status(200).json(user)
    })
})

module.exports = router
