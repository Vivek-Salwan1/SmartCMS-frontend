import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Login() {
   
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [ack, setAck] = useState();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true
        axios.post('https://smartcms-backend.onrender.com/login', { email, password,})
            .then(res => {
                if (res.data.massage == 'logged in') {
                    navigate('/user-dashboard')
                    window.location.reload();
                }else {
                    setAck(res.data.massage)
                }
            })
            .catch(err => console.log(err))
    }
 
    return (
        <div className='loginPage'>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <label htmlFor="email">ID</label>
                <input type="text" name='email' onChange={e => setEmail(e.target.value)} required /><br />

                <label htmlFor="password">Pass</label>
                <input type="text" name='password' onChange={e => setPassword(e.target.value)} required />

                <Link to='/reset-password'>  <p style={{ color: 'rgb(163, 163, 253)' }}>Forgot Password</p> </Link>

                <button type='submit'>Login</button>
                <h5 style={{ textAlign: 'center' }}>{ack && ack}</h5>
            </form>
        </div>
    )
}

export default Login
