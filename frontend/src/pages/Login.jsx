import React,{useState} from 'react'

export default function Login() {
    const [form, setForm] = useState({
        email:'',
        password:''
    })



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
  return (
    <div>
        <h1>Login Form</h1>
        <form onSubmit={submitForm}>
            <input 
                name="email" 
                type="email"
                id="email"
                placeholder='Enter your email'
                value={email}
                onChange={onChange}
                />
            <input 
                name="password" 
                type="password"
                id="password"
                placeholder='Enter your password'
                value={password}
                onChange={onChange}
                />
            
            <button type="submit" name="login">login</button>
        </form>
        <button type='button' onClick={loginWithGoogle}>Login with Google</button>
        <button type='button' onClick={logoutWithGoogle}>Login out</button>
    </div>
  )
}
