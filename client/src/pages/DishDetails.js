import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import LoadingComponent from '../components/Loading'
export default function DishDetails() {
  const [dish, setDish] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const handleDelete = () => {
    axios
      .delete(`/${id}`)
      .then((response) => {
        console.log(response.data)
        navigate('/dishes')
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    // get the id from the backend
    axios
      .get(`/${id}`)
      .then((response) => {
        console.log(response.data)
        setDish(response.data)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <>
      {dish === null ? (
        <LoadingComponent />
      ) : (
        <>
          <h1>{dish.name}</h1>
          <h2>{dish.origin}</h2>
          <Link to={`/edit/${dish._id}`}>
            <button>edit dish</button>
          </Link>

          <button onClick={handleDelete}>delete dish</button>
        </>
      )}
    </>
  )
}
