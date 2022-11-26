import React, {useState, useEffect} from 'react'
// import { Outlet, useNavigate} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import Login from './pages/Login';

import Axios from 'axios'
import Dashboard from './pages/Dashboard';
import { authCheck, reset  } from './features/authSlice'
import TopNavigation from './components/TopNavigation';
import Profile from './pages/Profile';

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
  
    if(isSuccess || user){
        console.log("login user", user);
        
      }else{
        dispatch(authCheck())
      }
      dispatch(reset)
      console.log("message ,", message);
  }, [user, isError, isSuccess, message]);
  
  if(!user){
    <>
    <Router>
        <div className='container'>
        <Routes>
          <Route index path='/' element={<Login/>}/>
        </Routes>             
        </div>
    </Router>
    </>
  }
  
  return (
    <>
    <Router>
        <div className='container'>
        {user &&  <TopNavigation/>}
        <Routes>
          <Route index path='/' element={<Dashboard/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>             
        </div>
    </Router>
      
    </>
  );
}

export default App;
