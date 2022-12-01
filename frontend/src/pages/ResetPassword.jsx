import React, {useState} from 'react'
import { useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword , reset } from '../features/authSlice';
import {  toast } from 'react-toastify';
function ResetPassword() {

    const params = useParams()
    const [form, setForm] = useState({
        email : '',
    });

    const [enables, setEnables] = useState(false);

    const { email } = form;

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
    // console.log("params", params.token);
    // console.log("is loading", isLoading);
    
    const submitForm = (e) =>{
        e.preventDefault();
        if(email.length > 6){
            const userData = {
                email :email
            }
            setEnables(true);
            dispatch(resetPassword(userData))
        }
        dispatch(reset())
        
    }

    useEffect(() => {
        dispatch(reset())
    },[])
    useEffect(() => {
        if(isError && enables){
            toast.error(message)
            // console.log("user", user);
            setEnables(false)
        }

        if (isSuccess && message) {
            toast.success(message.msg)
            // console.log('msg ', message.msg);  
            setEnables(false)
            setForm((prevState) => ({
                ...prevState,
                email:"",
            }))  
        }
        dispatch(reset())
        
    },[user, isError, isSuccess, message])
  return (
    <div className='dashboard profile vh100'>
        <h1>WORKVERSE</h1>

        <form className='form' onSubmit={submitForm}>
            <h3 style={{fontSize:"22px"}}>Reset your password </h3>
            <p className='reset-text'>To reset your password, enter your email below and submit.<br/> An email will be sent to you with instructions about how to complete the process.</p>
            <label style={{textAlign:'left'}} htmlFor='email'>Email address</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                value={email}
                onChange={onChange}
                placeholder={'Enter Your email'}
                 />

            <input type='submit' name="update" className={` ${enables ? 'disabled-button' : '' }`} value={'Reset password'} disabled={enables} />
            <Link to='/' style={{fontSize: "12px" ,fontWeight: '200', marginTop: '10px'}}>Back</Link>
        </form>
    </div>)
}


export default ResetPassword