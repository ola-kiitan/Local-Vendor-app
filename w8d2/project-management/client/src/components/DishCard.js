import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import '../components/Explore.css'

export default function DishCard(props) {
  const navigate = useNavigate()
  // const { id } = useParams()
  const storedToken = localStorage.getItem('authToken')
  const handleDelete = () => {
    axios
      .delete(`/api/dishes/${props._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        navigate('/dishes')
      })
      .catch((err) => console.log(err))
    props.refreshDishes()
  }

  return (
    <div className='page'>
      <div className='dish-card'>
        <img src={props.imageUrl} alt='food-pic' className='dish-img' />
        <h3>{props.name}</h3>
        <h3>{props.origin}</h3>
        <h5>key-Ingredients: {props.ingredient}</h5>
        <h3>{props.price}</h3>
        <div className='social-container'>
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
          <a
            href={`https://www.youtube.com/${props.youtube}/`}
            className='youtube social'
          >
            <FontAwesomeIcon icon={faYoutube} size='2x' />
          </a>
        </div>
        <div className='card-btn'>
          <Link to={`/dishes/edit/${props._id}`}>
            <button>edit</button>
          </Link>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>
  )
}
