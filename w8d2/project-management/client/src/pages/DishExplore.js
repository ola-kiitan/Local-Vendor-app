import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DishView from '../components/DishView'

export default function DishExplore() {
  const [dishes, setDishes] = useState([])
  const getAllDishes = () => {
    axios
      .get('/api/dishes/explore')
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
        <DishView key={dish._id} {...dish} />
      ))}
    </>
  )
}
