import React from 'react'
import { Outlet, useNavigate} from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
export default function Root() {
  return (
    <>
        <TopNavigation/>
        <Outlet/>
    </>
  )
}
