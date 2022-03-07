const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    role: String,
    password: String,
    email: String,
    aboutMe: String,
    location: String,
    dish: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dish',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
