import React, {useState, useEffect} from 'react'
import './App.css';
import Login from './pages/Login';
import Axios from 'axios'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch('/auth/login/success').then((res) => res.json()).then((data) => console.log('res', data))
    Axios.get('/auth/login/success',{
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => console.log(res))
    
  }, []);

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
