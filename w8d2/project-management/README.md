🚨 Login.js and context/auth.js changed to fix the redirect after login
------------------------------------------------------------------------


### Most important change here is: **verifyStoredToken** returns a promise now
### See comments for other changes
```js
// context/auth.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {

	const [user, setUser] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Change: this function is renamed now and the call of verifyStoredToken removed
	const storeToken = token => {
		// store this token in local storage
		localStorage.setItem('authToken', token)
	}

	const logoutUser = () => {
		// remove the token from local storage
		localStorage.removeItem('authToken')
		// update the state
		setIsLoggedIn(false)
		setUser(null)
	}

	const verifyStoredToken = () => {
		// check local storage
		const storedToken = localStorage.getItem('authToken')
		if (storedToken) {
			// Change: by adding this return we now return a promise
			return axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
				.then(response => {
					const user = response.data
					setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch(err => {
					// the token is invalid
					setIsLoggedIn(false)
					setUser(null)
					setIsLoading(false)
				})
		} else {
			// there is no token in local storage
			setIsLoading(false)
		}
	}

	useEffect(() => {
		// check if we have an auth token stored
		verifyStoredToken()
	}, [])

	return (
		// Change: this now also contains the verifyStoredToken function
		<AuthContext.Provider value={{ isLoggedIn, user, isLoading, storeToken, verifyStoredToken, logoutUser }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthProviderWrapper, AuthContext }
```

```js
// pages/Login.js
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'

export default function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

	const { storeToken, verifyStoredToken } = useContext(AuthContext)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }
		axios.post('/api/auth/login', requestBody)
			.then(response => {
				// redirect to projects
				console.log('i have a token mothafukkas')
				const token = response.data.authToken
				// Change: this only stores the token
				storeToken(token)
				// Change: we also call verify
				// Change because verifyStoredToken return a promise now we can chain  
				// a .then and wait for the response
				verifyStoredToken()
					.then(() => {
						// redirect to projects
						navigate('/')
					})
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email: </label>
				<input type="text" value={email} onChange={handleEmail} />
				<label htmlFor="password">Password: </label>
				<input type="password" value={password} onChange={handlePassword} />
				<button type="submit">Log In</button>
			</form>

			{errorMessage && <h5>{errorMessage}</h5>}

			<h3>Don't have an account?</h3>
			<Link to='/signup'>Signup</Link>
		</>
	)
}
```