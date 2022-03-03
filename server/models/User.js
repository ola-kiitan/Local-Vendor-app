const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    role: String,
    password: String,
    email: String,
    profilePicture: String,
    aboutMe: String,
    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
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
