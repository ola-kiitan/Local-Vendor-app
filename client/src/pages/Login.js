import axios from 'axios'
import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { storeToken, verifyStoredToken } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }
    axios
      .post('/auth/login', requestBody)
      .then((response) => {
        //redirect to profile
        console.log(response)
        const token = response.data.authToken
        storeToken(token)
        verifyStoredToken().then(() => {
          // redirect to projects
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
