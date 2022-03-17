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
    <div className='sign-up'>
      <h1>Log in</h1>
      <form className='input' onSubmit={handleSubmit}>
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

        <button type='submit' className='input-submit'>
          Log in
        </button>
      </form>
      {errorMessage && <h5>{errorMessage}</h5>}
      <h3>Don't have an account</h3>
      <button>
        <Link className='link' to='/signup'>
          sign up
        </Link>
      </button>
    </div>
  )
}
