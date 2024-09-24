import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';


function Login() {
    const {setUser} = useContext(userContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [ack, setAck] = useState();
    const [loading, setLoading] = useState(null)

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.defaults.withCredentials = true;
        axios.post('https://smartcms-backend-production.up.railway.app/login', { email, password })
            .then(res => {
                setLoading(false)
                if (res.data.massage === 'logged in') {
                    console.log("Login successful, user:", res.data.user); // Check if user is present
                    setUser(res.data.user);  // Set user from the response
                    navigate('/user-dashboard');
                } else {
                    setAck(res.data.massage);
                }
            })
            .catch(err => console.log(err));
    };
    
 
    return (
        <div className='loginPage'>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <label htmlFor="email">ID</label>
                <input type="text" name='email' onChange={e => setEmail(e.target.value)} required /><br />

                <label htmlFor="password">Pass</label>
                <input type="text" name='password' onChange={e => setPassword(e.target.value)} required />

                <Link to='/reset-password'>  <p style={{ color: 'rgb(163, 163, 253)' }}>Forgot Password</p> </Link>

                {
                    loading ?
                    <div className="loading"></div>
                    :
                    <button type='submit'>Login</button>
                }
              
                <h5 style={{ textAlign: 'center' }}>{ack && ack}</h5>
            </form>
        </div>
    )
}

export default Login
