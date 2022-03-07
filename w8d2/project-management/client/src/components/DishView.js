import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

export default function DishView(props) {
  // const vendor = props.vendor
  // const username = vendor.username
  console.log('dish-props:', props)
  return (
    <>
      <img src={props.imageUrl} alt='food-pic' />
      <h3>{props.name}</h3>
      {props.vendor && <h3>{props.vendor.username}</h3>}
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
