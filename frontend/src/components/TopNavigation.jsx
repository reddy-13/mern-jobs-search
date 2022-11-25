import React from 'react'
import {Link} from 'react-router-dom'
export default function TopNavigation() {

    const logoutWithGoogle =  async(e) => {
        e.preventDefault()
        await localStorage.removeItem('user')
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`,
        "_self")
    } 
  return (
    <>
        <nav className='navigation'>
            <a href="/">workverse</a>
            <ul>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
                <li>
                    <Link  onClick={logoutWithGoogle}>logout</Link>
                </li>
            </ul>
        </nav>
    </>
  )
}
