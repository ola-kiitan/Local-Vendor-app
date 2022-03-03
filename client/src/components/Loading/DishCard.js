import React from 'react'
import { Link } from 'react-router-dom'

export default function DishCard(props) {
  return (
    <>
      <Link to={`/${props._id}`}>
        <h1>{props.name}</h1>
      </Link>
    </>
  )
}
