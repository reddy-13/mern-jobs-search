import React, {useState} from 'react'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../features/authSlice';


function Profile() {
    const [form, setForm] = useState({
        password : '123456',
        cpassword : '123456',
    });

    const { password, cpassword } = form;

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth 
    )

    const onChange = (e) =>{
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    const submitForm = (e) =>{
        e.preventDefault();
        if(password.length === 0 &&  password !== cpassword){
            return false
        }else if(password.length > 0  && (password === cpassword)){
            const userData = {
                password,
            }
            dispatch(updatePassword(userData))
        } 
        
    }

    useEffect(() => {
        if(user){
            console.log('profile ', user);
        }else{
            navigate('/')
        }
    },[user, isError, isSuccess, message])
  return (
    <div className='dashboard profile'>
        <h1>Profile</h1>

        <form className='form' onSubmit={submitForm}>
            <h3>UPDATE PASSWORD</h3>
            <input 
                type="password" 
                name="password" 
                id="password" 
                value={password}
                onChange={onChange}
                placeholder={'Enter new password'}
                 />
            <input 
                type="password" 
                name="cpassword" 
                id="cpassword" 
                value={cpassword}
                onChange={onChange}
                placeholder={'Confirm new password'}
                 />

            <input type='submit' name="update" value={'Update your password'} />
        </form>
    </div>
  )
}

export default Profile