import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopNavigation from '../components/TopNavigation'



function Dashboard() {

    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth 
    )
  return (
    <div className='dashboard'>
        
        <div className='heading'>
        <h1>Welcome {user ? user.user.username : 'No user'}</h1>
        </div>
    </div>
  )
}

export default Dashboard