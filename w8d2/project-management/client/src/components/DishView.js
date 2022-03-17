import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import '../components/Explore.css'

export default function DishView(props) {
  return (
    <div className='page'>
      <div className='dish-card'>
        <img src={props.imageUrl} alt='food-pic' className='dish-img' />
        <div className='dish-info'>
          <h3 className='dish-text'>{props.name}</h3>
          <h4 className='dish-text'>Origin: {props.origin}</h4>
        </div>
        {props.vendor && (
          <div className='dish-text'>
            <h3>By: {props.vendor.username}</h3>
            <Link className='dish-btn' to={`/profile/${props.vendor._id}`}>
              View vendor
            </Link>
          </div>
        )}
        <div className='social-container'>
          <a
            href={`https://www.facebook.com/${props.facebook}/`}
            className='facebook social'
            target='blank'
          >
            <FontAwesomeIcon icon={faFacebook} size='2x' />
          </a>
          <a
            href={`https://www.instagram.com/${props.instagram}/`}
            className='instagram social'
            target='blank'
          >
            <FontAwesomeIcon icon={faInstagram} size='2x' />
          </a>
          <a
            href={`https://www.twitter.com/${props.twitter}/`}
            className='twitter social'
            target='blank'
          >
            <FontAwesomeIcon icon={faTwitter} size='2x' />
          </a>
          <a
            href={`https://www.youtube.com/${props.youtube}/`}
            className='youtube social'
            target='blank'
          >
            <FontAwesomeIcon icon={faYoutube} size='2x' />
          </a>
        </div>
      </div>
    </div>
  )
}
