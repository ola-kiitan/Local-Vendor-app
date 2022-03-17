import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { AuthContext } from '../context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars, faSpoon } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext)
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return (
    <nav className='navbar NavbarItems'>
      <div className='nav-logo'>
        <h3>Local-vendor</h3>
        <FontAwesomeIcon icon={faSpoon} className='fa-spoon' />
      </div>
      {isLoggedIn ? (
        <>
          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon
              icon={click ? faTimes : faBars}
              className='fa-times'
            />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/explore'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/dishes'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                dishes
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={logoutUser}>
                Logout
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon
              icon={click ? faTimes : faBars}
              className='fa-times'
            />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/explore'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/signup'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                sign-up
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                log-in
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  )
}
