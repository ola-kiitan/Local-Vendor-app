import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DishCard from '../components/DishCard'
import DishAdd from '../components/DishAdd'

export default function DishList() {
  const [dishes, setDishes] = useState([])
  const storedToken = localStorage.getItem('authToken')
  // get all the menus from the server
  const getAllDishes = () => {
    axios
      .get('/api/dishes/dishes', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response)
        // set the state of menus
        setDishes(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getAllDishes()
  }, [])
  return (
    <>
      <h1>all Dishes</h1>
      {dishes.map((dish) => (
        <DishCard key={dish._id} {...dish} />
      ))}
      <DishAdd refreshDishes={getAllDishes} />
    </>
  )
}

// export default function ProjectList() {
//   const [projects, setProjects] = useState([])
//   console.log(projects)

//   const storedToken = localStorage.getItem('authToken')

//   // get all the projects from the backend / server
//   const getAllDishes = () => {
//     // request 'api/projects'
//     // for every request to a project route we need to also send the token
//     axios
//       .get('/api/dishes', {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         console.log(response.data)
//         // set the state of projects
//         setProjects(response.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   useEffect(() => {
//     getAllDishes()
//   }, [])

//   return (
//     <>
//       <h1>All the projects</h1>
//       {projects.map((project) => (
//         <ProjectCard key={project._id} {...project} />
//       ))}
//       <DishAdd refreshProjects={getAllDishes} />
//     </>
//   )
// }
