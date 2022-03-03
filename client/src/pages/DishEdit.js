import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function DishEdit(props) {
  const [name, setName] = useState('')
  // const [image, setImage] = useState('')
  const [origin, setOrigin] = useState('')
  const [ingredient, setIngredient] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`/${id}`, { name, ingredient, origin })
      .then(() => {
        navigate(`/${id}`)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios
      .get(`/${id}`)
      .then((response) => {
        const { name, origin, ingredient } = response.data
        setName(name)
        setOrigin(origin)
        setIngredient(ingredient)
      })
      .catch((err) => console.log(err))
  }, [id])
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
        <button type='submit'>Update dish</button>
      </form>
    </>
  )
}
