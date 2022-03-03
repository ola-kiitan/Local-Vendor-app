import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export default function AddDish(props) {
  const [name, setName] = useState('')
  // const [image, setImage] = useState('')
  const [origin, setOrigin] = useState('')
  const [ingredient, setIngredient] = useState('')
  // const [location, setLocation] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/dishes', { name, ingredient, origin })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
    setName('')
    setOrigin('')
    setIngredient('')
    // refreshing the all dishes in DishList
    props.refreshDishes()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='enter dish name'
        />
        <input
          type='text'
          id='origin'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder='food origin'
        />

        <input
          type='text'
          id='ingredient'
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
