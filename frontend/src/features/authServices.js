import axios from 'axios'

const AUTH_CHECK_URL = '/auth/login/success'
const UPDATE_PASSWORD_URL ='/auth/profile/password';

// Auth check
const authCheck = async (userData) =>{
    const response = await axios.get(AUTH_CHECK_URL,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

    return response.data
}

const updatePassword = async (userData) =>{
    
    const response = await axios.post(UPDATE_PASSWORD_URL,userData,{
        headers: { 'Content-Type': 'application/json' },
    })
    return response.data
}



const authService = {
    authCheck,
    updatePassword,
}

export default authService;