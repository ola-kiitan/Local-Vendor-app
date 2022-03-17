import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import '../components/Explore.css'

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

  return (
    <div className='page'>
      {user && (
        <div className='profile-page'>
          <div className='vendor-info'>
            <h2>vendor-info</h2>
            <h4>Vendor: {user.username}</h4>
            <h4>Location: {user.location}</h4>
            <h4>Email: {user.email}</h4>
            <p>{user.aboutMe}</p>
          </div>
          <h3>Vendor Gallery</h3>
          {user.dish.map((dish) => {
            return (
              <div key={dish._id} className='dish-card'>
                <img src={dish.imageUrl} alt='dish-img' className='dish-img' />

                <h3>{dish.name}</h3>
                <h3>{dish.origin}</h3>
                <h5>Key-ingredients: {dish.ingredient}</h5>
                <h3>{dish.price}</h3>
                <div className='social-container'>
                  <a
                    href={`https://www.facebook.com/${dish.facebook}/`}
                    className='facebook social'
                  >
                    <FontAwesomeIcon icon={faFacebook} size='2x' />
                  </a>
                  <a
                    href={`https://www.instagram.com/${dish.instagram}/`}
                    className='instagram social'
                  >
                    <FontAwesomeIcon icon={faInstagram} size='2x' />
                  </a>
                  <a
                    href={`https://www.twitter.com/${dish.twitter}/`}
                    className='twitter social'
                  >
                    <FontAwesomeIcon icon={faTwitter} size='2x' />
                  </a>
                  <a
                    href={`https://www.youtube.com/${dish.youtube}/`}
                    className='youtube social'
                  >
                    <FontAwesomeIcon icon={faYoutube} size='2x' />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
