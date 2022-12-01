import React, {useState, useEffect} from 'react'
// import { Outlet, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, BrowserRouter as Router, Routes, Route , RouterProvider} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import Login from './pages/Login';

import Axios from 'axios'
import Dashboard from './pages/Dashboard';
import { authCheck, reset  } from './features/authSlice'
import TopNavigation from './components/TopNavigation';
import Profile from './pages/Profile';
import ErrorPage from './pages/error-page';
import UpdateProfile from './pages/UpdateProfile';
import Root from './pages/Root';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth 
    )

  useEffect(() => {
    // fetch('/auth/login/success').then((res) => res.json()).then((data) => console.log('res', data))
    // Axios.get('/auth/login/success',{
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // })
    //   .then((res) => console.log(res))
    //   .catch((res) => console.log('err', res))
    // if (isError) {
    //   toast.error(message)
    // }
    if(isSuccess || user){
        console.log("login user", user);
        
      }else{
        // dispatch(authCheck())
      }
      //  dispatch(reset())
     
  }, [user, isError, isSuccess, message]);
  

  const router = createBrowserRouter([
  {
    path : '/',
    element: <Login/>,
    errorElement : <ErrorPage/>,
    index: true,
  },
  {
    path:'/reset',
    element: <ResetPassword/>
  },
  {
    path : '/reset/password/:token',
    element : <UpdateProfile/>
  }
]);


const protectedRouter = createBrowserRouter([
  
  {
    path: "/",
    element: <Root/>,
    children: [
      { 
        index: true,  
        element: <Dashboard/> 
      },
      {
        path :'/profile',
        element: <Profile/>
      }
    ],
  },
  
],
)

  return (
    <>
    <RouterProvider router={user ? protectedRouter : router} />
    <ToastContainer/>
    </>
  );
}

export default App;
