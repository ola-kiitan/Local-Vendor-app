import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import service from '../service'

export default function DishAdd(props) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [origin, setOrigin] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [price, setPrice] = useState('')

  const storedToken = localStorage.getItem('authToken')
  const handleFileUpload = (e) => {
    const uploadData = new FormData()

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new dish in '/dishes' POST route
    uploadData.append('imageUrl', e.target.files[0])

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.secure_url)
      })
      .catch((err) => console.log('Error while uploading the file: ', err))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        '/api/dishes/dishes',
        {
          name,
          ingredient,
          origin,
          price,
          imageUrl,
          facebook,
          twitter,
          instagram,
        },
        {
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
    setName('')
    setOrigin('')
    setIngredient('')
    setTwitter('')
    setInstagram('')
    setFacebook('')
    setPrice('')
    // refreshing the all dishes in DishList
    props.refreshDishes()
  }

  return (
    <aside className='sign-up'>
      <h2>Add new dish</h2>
      <form className='input' onSubmit={handleSubmit}>
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
          placeholder='core ingredients'
        />

        <input
          type='text'
          id='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='price'
        />

        <input
          type='text'
          id='facebook'
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          placeholder='facebook-handle'
        />
        <input
          type='text'
          id='instagram'
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder='instagram-handle'
        />
        <input
          type='text'
          id='twitter'
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          placeholder='twiter-handle'
        />
        <input type='file' onChange={(e) => handleFileUpload(e)} />
        <button className='input-submit' type='submit'>
          Submit
        </button>
      </form>
    </aside>
  )
}
