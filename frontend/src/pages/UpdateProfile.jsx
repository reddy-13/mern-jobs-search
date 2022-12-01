import React, {useState} from 'react'
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function UpdateProfile() {

    const params = useParams()
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
    console.log("params", params.token);
    
    const submitForm = (e) =>{

        e.preventDefault();
        if(password.length === 0 &&  password !== cpassword){
            return false
        }else if(password.length > 0  && (password === cpassword)){
            const userData = {
                password,
            }
            // dispatch(updatePassword(userData))
        }
        // dispatch(reset())
        
    }
  return (
    <div className='dashboard profile vh100'>
        <h1>Password verify</h1>

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
    </div>)
}


export default UpdateProfile