import React from 'react'
// import { Link } from 'react-router-dom'

export default function DishCard({ name, origin }) {
  return (
    <>
      <h1>{name}</h1>
      <h5>{origin}</h5>
    </>
  )
}
