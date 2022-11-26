import React from 'react'
import {NavLink} from 'react-router-dom'
export default function TopNavigation() {

    const logoutWithGoogle =  async(e) => {
        e.preventDefault()
        await localStorage.removeItem('user')
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`,
        "_self")
    } 

    
let activeClassName = "underline";
  return (
    <>
        <nav className='navigation'>
            <NavLink to="/"
                className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
                workverse
            </NavLink>
            <ul>
                <li>
                    <NavLink 
                        className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                      }
                     to="/profile">
                        profile
                    </NavLink>
                </li>
                <li>
                    <NavLink  
                   
                    onClick={logoutWithGoogle}>
                        logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    </>
  )
}