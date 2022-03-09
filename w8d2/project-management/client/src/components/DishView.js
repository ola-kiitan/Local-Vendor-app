import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import '../components/Explore.css'

export default function DishView(props) {
  return (
    <div className='dish-card'>
      <img src={props.imageUrl} alt='food-pic' />
      <h5>{props.name}</h5>
      <h6>{props.origin}</h6>
      {props.vendor && (
        <div>
          <Link to={`/profile/${props.vendor._id}`}>
            <h3>{props.name}</h3>
          </Link>
          <h3>By: {props.vendor.username}</h3>
          <h2>{props.vendor.location}</h2>
        </div>
      )}
      <div className='social-link'>
        <a
          href={`https://www.facebook.com/${props.facebook}/`}
          className='facebook social'
        >
          <FontAwesomeIcon icon={faFacebook} size='2x' />
        </a>
        <a
          href={`https://www.instagram.com/${props.instagram}/`}
          className='instagram social'
        >
          <FontAwesomeIcon icon={faInstagram} size='2x' />
        </a>
        <a
          href={`https://www.twitter.com/${props.twitter}/`}
          className='twitter social'
        >
          <FontAwesomeIcon icon={faTwitter} size='2x' />
        </a>
      </div>
    </div>
  )
}
