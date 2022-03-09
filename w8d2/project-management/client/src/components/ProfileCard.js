import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ProfileCard() {
  const [user, setUser] = useState('')
  const { id } = useParams()

  useEffect(() => {
    // get the id from the backend
    axios
      .get(`/api/dishes/profile/${id}`)
      .then((response) => {
        console.log(response.data.dish[0].name)
        setUser(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  // const dishes = user.dish?.map((dish) => {
  //   return <h1>{dish.name}</h1>
  // })
  // console.log(user.dish[0].name)
  return (
    <>
      {user && (
        <div className='profile-page'>
          <div className='vendor-info'>
            <h2>{user.username}</h2>
            <h2>{user.location}</h2>
            <h2>{user.email}</h2>
          </div>
          {user.dish.map((dish) => {
            return (
              <div key={dish._id} className='dish-info'>
                <img src={dish.imageUrl} alt='food-pic' />
                <h3>{dish.name}</h3>
                <p>{dish.ingredient}</p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
