const router = require('express').Router()
const Dish = require('../models/Dish')
const User = require('../models/User')
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config')
const { isAuthenticated } = require('../middleware/jwt')

router.get('/', (req, res, next) => {
  res.status(200).json('All good in here')
})

// get all the menu from the database
router.get('/dishes', isAuthenticated, (req, res, next) => {
  Dish.find().then((dishes) => {
    res.status(200).json(dishes)
  })
})
// POST "/api/upload" => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'))
    return
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path })
})
// create a new dish
router.post('/dishes', (req, res, next) => {
  const vendorId = req.payload._id
  console.log('vendor id: ', vendorId)
  const { imageUrl, name, ingredient, price, origin } = req.body
  Dish.create({ imageUrl, name, ingredient, price, origin })
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
  const { imageUrl, name, ingredient, price, origin } = req.body
  Dish.findByIdAndUpdate(
    req.params.id,
    {
      imageUrl,
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
