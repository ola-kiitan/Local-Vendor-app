import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

export default function DishView(props) {
  // console.log('dish-props:', props)
  // const  id  = useParams()
  return (
    <>
      <img src={props.imageUrl} alt='food-pic' />

      {props.vendor && (
        <div>
          <Link to={`/profile/${props.vendor._id}`}>
            <h3>{props.name}</h3>
          </Link>
          <h3>By: {props.vendor.username}</h3>
          <h2>{props.vendor.location}</h2>
        </div>
      )}
      <div>
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
    </>
  )
}

// {
//   /* <a href="https://www.youtube.com/c/jamesqquick"
//   className="youtube social">
//   <FontAwesomeIcon icon={faYoutube} size="2x" />
// </a> */
// }
// {
//   /* <a href="https://www.facebook.com/learnbuildteach/"
//   className="facebook social">
//   <FontAwesomeIcon icon={faFacebook} size="2x" />
// </a> */
// }
// // <a href="https://www.twitter.com/jamesqquick" className="twitter social">
// //   <FontAwesomeIcon icon={faTwitter} size="2x" />
// // </a>
// // <a href="https://www.instagram.com/learnbuildteach"
// //   className="instagram social">
// //   <FontAwesomeIcon icon={faInstagram} size="2x" />
// // </a>
