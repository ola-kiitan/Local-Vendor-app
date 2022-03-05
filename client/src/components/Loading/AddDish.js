import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import service from '../../service'

export default function AddDish(props) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [origin, setOrigin] = useState('')
  const [ingredient, setIngredient] = useState('')
  // const [location, setLocation] = useState('')
  const storedToken = localStorage.getItem('authToken')
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData()

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new dish in '/dishes' POST route
    uploadData.append('imageUrl', e.target.files[0])

    service
      .uploadImage(uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setImageUrl(response.secure_url)
      })
      .catch((err) => console.log('Error while uploading the file: ', err))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        '/dishes',
        { name, ingredient, origin, imageUrl },
        {
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
          placeholder='core ingredients'
        />
        <input type='file' onChange={(e) => handleFileUpload(e)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
