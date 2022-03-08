// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import ProfileCard from '../components/ProfileCard'

// export default function ProfileDetails() {
//   const [user, setUser] = useState('')
//   const { id } = useParams()

//   useEffect(() => {
//     // get the id from the backend
//     axios
//       .get(`/api/dishes/profile/${id}`)
//       .then((response) => {
//         console.log(response.data)
//         setUser(response.data)
//       })
//       .catch((err) => console.log(err))
//   }, [])

//   return (
//     <>
//       {user.map((user) => (
//         <ProfileCard key={user._id} {...user} />
//       ))}
//     </>
//   )
// }
