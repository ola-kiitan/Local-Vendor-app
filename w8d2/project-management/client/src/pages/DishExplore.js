import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DishView from '../components/DishView'

export default function DishExplore() {
  const [dishes, setDishes] = useState([])
  const [search, setSearch] = useState('')
  const [searchName, setSearchName] = useState('')

  const inputHandler = (event) => {
    setSearch(event.target.value.toLowerCase())
    event.preventDefault()
  }
  const nameHandler = (event) => {
    setSearchName(event.target.value.toLowerCase())
    event.preventDefault()
  }
  let searchTerm = dishes.filter((dish) =>
    `${dish.origin}`.toLowerCase().includes(search)
  )
  searchTerm = searchTerm.filter((dish) =>
    `${dish.name}`.toLowerCase().includes(searchName)
  )
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
      <div className='searchInputs'>
        <input
          type='text'
          className='searchInput'
          value={search}
          onChange={inputHandler}
          placeholder='search by origin'
        />

        <input
          type='text'
          className='searchInput'
          value={searchName}
          onChange={nameHandler}
          placeholder='search by name'
        />
      </div>

      {searchTerm.map((dish) => (
        <DishView key={dish._id} {...dish} />
      ))}
    </>
  )
}
