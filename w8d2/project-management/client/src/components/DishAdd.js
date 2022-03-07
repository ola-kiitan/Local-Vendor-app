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

  // const [location, setLocation] = useState('')
  const storedToken = localStorage.getItem('authToken')
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData()

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new dish in '/dishes' POST route
    uploadData.append('imageUrl', e.target.files[0])

    service
      .uploadImage(uploadData)
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
        '/api/dishes/dishes',
        { name, ingredient, origin, imageUrl, facebook, twitter, instagram },
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
          placeholder='twiiter-handle'
        />
        <input type='file' onChange={(e) => handleFileUpload(e)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

// import React, { useState } from 'react'
// import axios from 'axios';

// export default function AddProject(props) {

// 	const [title, setTitle] = useState('');
// 	const [description, setDescription] = useState('');

// 	const handleSubmit = e => {
// 		e.preventDefault()
// 		// send the data from the state as a post request to
// 		// the backend
// 		axios.post('/api/projects', { title, description })
// 			.then(response => {
// 				console.log(response)
// 			})
// 			.catch(err => console.log(err))
// 		// reset the form
// 		setTitle('')
// 		setDescription('')
// 		// refresh the list of the projects in ProjectList
// 		props.refreshProjects()
// 	}

// 	return (
// 		<>
// 			<h1>AddProject</h1>
// 			<form onSubmit={handleSubmit}>
// 				<label htmlFor="title">Title: </label>
// 				<input
// 					id="title"
// 					type="text"
// 					value={title}
// 					onChange={e => setTitle(e.target.value)}
// 				/>
// 				<label htmlFor="title">Description: </label>
// 				<input
// 					id="description"
// 					type="text"
// 					value={description}
// 					onChange={e => setDescription(e.target.value)}
// 				/>
// 				<button type="submit">Add this project</button>
// 			</form>
// 		</>
// 	)
// }
