import axios from 'axios'

const AUTH_CHECK_URL = '/auth/login/success'

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



const authService = {
    authCheck,
}

export default authService;