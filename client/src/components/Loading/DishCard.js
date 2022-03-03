import React from 'react'
import { Link } from 'react-router-dom'

export default function DishCard(props) {
  return (
    <>
      <Link to={`/${props._id}`}>
        <img src={props.imageUrl} alt='food-pic' />
        <h3>{props.name}</h3>
      </Link>
    </>
  )
}
