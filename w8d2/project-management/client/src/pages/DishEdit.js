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
  const storedToken = localStorage.getItem('authToken')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(
        `/api/dishes/edit/${id}`,
        { name, ingredient, origin },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate(`/dishes/${id}`)
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

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function EditProject() {

// 	const [title, setTitle] = useState('');
// 	const [description, setDescription] = useState('');

// 	const { id } = useParams()

// 	const navigate = useNavigate()

// 	const handleSubmit = e => {
// 		e.preventDefault()
// 		const requestBody = { title, description }
// 		axios.put(`/api/projects/${id}`, requestBody)
// 			.then(() => {
// 				// this redirects using react router
// 				navigate(`/projects/${id}`)
// 			})
// 			.catch(err => console.log(err))
// 	}

// 	const deleteProject = () => {
// 		axios.delete(`/api/projects/${id}`)
// 			.then(() => {
// 				// redirect to the project list
// 				navigate('/projects')
// 			})
// 			.catch(err => console.log(err))
// 	}

// 	useEffect(() => {
// 		axios.get(`/api/projects/${id}`)
// 			.then(response => {
// 				const { title, description } = response.data
// 				setTitle(title)
// 				setDescription(description)
// 			})
// 			.catch(err => console.log(err))
// 	}, [])

// 	return (
// 		<>
// 			<h1>Edit this project</h1>
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
// 				<button type="submit">Update this project</button>
// 			</form>
// 			<button onClick={deleteProject}>Delete this project</button>
// 		</>

// 	)
// }
