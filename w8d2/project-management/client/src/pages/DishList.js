import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DishCard from '../components/DishCard'
import DishAdd from '../components/DishAdd'
import '../components/Explore.css'

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
    <div>
      {dishes.map((dish) => (
        <DishCard key={dish._id} {...dish} refreshDishes={getAllDishes} />
      ))}
      <DishAdd refreshDishes={getAllDishes} />
    </div>
  )
}
