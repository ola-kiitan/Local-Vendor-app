import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, username, password, role, location }
    axios
      .post('/api/auth/signup', requestBody)
      .then((response) => {
        navigate('/dishes')
      })
      .catch((err) => {
        const errorDescription = err.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className='sign-up'>
      <h1>Signup</h1>
      <form className='input' onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
        />
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
        <select
          name='role'
          id='role'
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value=''>role</option>
          <option value='client'>Client</option>
          <option value='vendor'>Vendor</option>
        </select>

        <select
          name='location'
          id='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <option value=''>enter location</option>
          <option value='west-kreuz'>West-kreuz</option>
          <option value='lichtenberg'>Lichtenberg</option>
          <option value='gesundbrunnen'>Gesundbrunnen</option>
          <option value='pankow'>Pankow</option>
          <option value='mitte'>Mitte</option>
          <option value='wansee'>Wansee</option>
        </select>
        <button className='input-submit' type='submit'>
          Sign up
        </button>
      </form>
      {errorMessage && <h5>{errorMessage}</h5>}
      <h3>Already have an account</h3>
      <button>
        <Link className='link' to='/login'>
          Log in here
        </Link>
      </button>
    </div>
  )
}
