import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import App from '../App'
import { authCheck, reset  } from '../features/authSlice'

export default function Login() {
    const [form, setForm] = useState({
        email:'',
        password:''
    })


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth 
    )
    const {email, password} = form;
    const submitForm = (e) =>{
        e.preventDefault();
        
    }

    const onChange = (e) =>{
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const loginWithGoogle =  () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,
        "_self")
    } 

    const logoutWithGoogle =  () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`,
        "_self")
    } 

    useEffect(() => {
        if(isSuccess || user){
            console.log("login user", user);
            // navigate('/dashboard')
          }else{
            dispatch(authCheck())
          }
          dispatch(reset)
    },[user, isError, isSuccess, message])

    if(user){
        return <App/>
    }
  return (
    <div className='login-page '>
        <img src="https://workverse.in/static/media/workverse-logo-white.bd207f1ebde61336a295.png" width={'200px'} alt="work verse logo"/>
        <div className="inner">
        <button type='button' onClick={loginWithGoogle}>Login with Google</button>
        </div>
    </div>
  )
}
