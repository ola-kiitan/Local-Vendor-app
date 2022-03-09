import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='home'>
      <div className='banner'>
        <h3>Want to try out 100s of Home-made </h3>
        <h2>Intercontinental Dishes? </h2>
        <Link to={'/explore'}>
          <button className='button '>Explore</button>
        </Link>
        <div className='register'>
          <p>Are you a food vendor?</p>
          <Link to={'/signup'}>
            <button className='button '>Register here</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
