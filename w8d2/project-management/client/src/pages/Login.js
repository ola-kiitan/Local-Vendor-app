import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { storeToken, verifyStoredToken } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken')

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }
    axios
      .post('/api/auth/login', requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //redirect to profile
        console.log(response)
        const token = response.data.authToken
        storeToken(token)
        verifyStoredToken().then(() => {
          // redirect to dishes
          navigate('/dishes')
        })
      })
      .catch((err) => {
        const errorDescription = err.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='enter password'
        />

        <button type='submit'>Log in</button>
      </form>
      {errorMessage && <h5>{errorMessage}</h5>}
      <h3>Don't have an account</h3>
      <Link to='/signup'>sign up</Link>
    </>
  )
}

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [errorMessage, setErrorMessage] = useState(undefined)

//   const navigate = useNavigate()

//   const { storeToken, verifyStoredToken } = useContext(AuthContext)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const requestBody = { email, password }
//     axios
//       .post('/api/auth/login', requestBody)
//       .then((response) => {
//         // redirect to dishes
//         console.log('i have a token mothafukkas')
//         const token = response.data.authToken
//         // store the token
//         storeToken(token)
//         verifyStoredToken().then(() => {
//           // redirect to projects
//           navigate('/')
//         })
//       })
//       .catch((err) => {
//         const errorDescription = err.response.data.message
//         setErrorMessage(errorDescription)
//       })
//   }

//   const handleEmail = (e) => setEmail(e.target.value)
//   const handlePassword = (e) => setPassword(e.target.value)

//   return (
//     <>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor='email'>Email: </label>
//         <input type='text' value={email} onChange={handleEmail} />
//         <label htmlFor='password'>Password: </label>
//         <input type='password' value={password} onChange={handlePassword} />
//         <button type='submit'>Log In</button>
//       </form>

//       {errorMessage && <h5>{errorMessage}</h5>}

//       <h3>Don't have an account?</h3>
//       <Link to='/signup'>Signup</Link>
//     </>
//   )
// }
