const { Schema, model } = require('mongoose')

const dishSchema = new Schema({
  imageUrl: String,
  name: String,
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  ingredient: [String],
  price: String,
  origin: String,
})

const Dish = model('Dish', dishSchema)

module.exports = Dish
