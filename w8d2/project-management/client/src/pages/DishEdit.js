import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import service from '../service'

export default function DishEdit(props) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [origin, setOrigin] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [price, setPrice] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken')
  const handleFileUpload = (e) => {
    const uploadData = new FormData()

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new dish in '/dishes' POST route
    uploadData.append('imageUrl', e.target.files[0])

    service
      .uploadImage(uploadData)
      .then((response) => {
        // response carries "secure_url" which we can use to update the state
        setImageUrl(response.secure_url)
      })
      .catch((err) => console.log('Error while uploading the file: ', err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(
        `/api/dishes/edit/${id}`,
        {
          name,
          ingredient,
          origin,
          imageUrl,
          price,
          twitter,
          instagram,
          facebook,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate(`/dishes`)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios
      .get(`/api/dishes/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const { name, origin, ingredient } = response.data
        setName(name)
        setOrigin(origin)
        setIngredient(ingredient)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className='sign-up'>
      <h2>Update dish details</h2>
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
        <input
          type='text'
          id='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='price'
        />
        <input type='file' onChange={(e) => handleFileUpload(e)} />
        <button className='input-submit' type='submit'>
          Update dish
        </button>
      </form>
    </div>
  )
}
