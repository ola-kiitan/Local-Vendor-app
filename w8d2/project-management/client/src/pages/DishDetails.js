import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
export default function DishDetails() {
  const [dish, setDish] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken')
  const handleDelete = () => {
    axios
      .delete(`/api/dishes/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        navigate('/dishes')
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    // get the id from the backend
    axios
      .get(`/api/dishes/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        setDish(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {dish === null ? (
        <div>Loading ...</div>
      ) : (
        <>
          <h1>{dish.name}</h1>
          <h2>{dish.origin}</h2>
          <Link to={`/dishes/edit/${dish._id}`}>
            <button>edit dish</button>
          </Link>

          <button onClick={handleDelete}>delete dish</button>
        </>
      )}
    </>
  )
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';

// export default function ProjectDetails() {

// 	const { id } = useParams()

// 	const [project, setProject] = useState(null);

// 	useEffect(() => {
// 		// request to the backend
// 		axios.get(`/api/projects/${id}`)
// 			.then(response => {
// 				console.log(response)
// 				setProject(response.data)
// 			})
// 			.catch(err => console.log(err))
// 	}, [])

// 	return (
// 		<>
// 			{project === null ? <div>Loading ...</div> :
// 				<>
// 					<h1>ProjectDetails</h1>
// 					<h3>{project.title}</h3>
// 					<p>{project.description}</p>
// 					<Link to={`/projects/edit/${project._id}`}>
// 						<button>Edit this project</button>
// 					</Link>
// 				</>
// 			}</>
// 	)
// }