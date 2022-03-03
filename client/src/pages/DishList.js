import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DishCard from '../components/Loading/DishCard'
import AddDish from '../components/Loading/AddDish'

export default function DishList() {
  const [dishes, setDishes] = useState([])
  // get all the menus from the server
  const getAllDishes = () => {
    axios
      .get('/dishes')
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
        <DishCard {...dish} />
      ))}
      <AddDish />
    </>
  )
}