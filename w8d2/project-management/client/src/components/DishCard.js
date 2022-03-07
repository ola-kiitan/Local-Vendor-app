import React from 'react'
import { Link } from 'react-router-dom'

export default function DishCard(props) {
  return (
    <>
      <Link to={`/dishes/${props._id}`}>
        <img src={props.imageUrl} alt='food-pic' />
        <h3>{props.name}</h3>
      </Link>
    </>
  )
}

// export default function ProjectCard({ title, _id }) {
// 	return (
// 		<div>
// 			<Link to={`/projects/${_id}`}>
// 				<h3>{title}</h3>
// 			</Link>
// 		</div>
// 	)
// }
