import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext)

  return (
    <nav>
      <Link to='/'>
        <button>home</button>
      </Link>
      <Link to='/explore'>
        <button>Explore</button>
      </Link>
      {isLoggedIn ? (
        <>
          <Link to='/dishes'>
            <button>dishes</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/signup'>
            <button>Signup</button>
          </Link>

          <Link to='/login'>
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  )
}

// export default function Navbar() {

// 	const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

// 	return (
// 		<nav>
// 			<Link to='/'>
// 				<button>Home</button>
// 			</Link>
// 			{isLoggedIn ?
// 				(
// 					<>
// 						<Link to='/projects'>
// 							<button>Projects</button>
// 						</Link>
// 						<button onClick={logoutUser}>Logout</button>
// 					</>
// 				) : (
// 					<>
// 						<Link to='/signup'>
// 							<button>Signup</button>
// 						</Link>
// 						<Link to='/login'>
// 							<button>Login</button>
// 						</Link>
// 					</>
// 				)}
// 		</nav>
// 	)
// }
