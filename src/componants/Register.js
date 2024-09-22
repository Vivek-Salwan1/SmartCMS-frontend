import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [ack, setAck] = useState();
    const [showAck, setShowAck] = useState(true);
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://smartcms-backend.onrender.com/register', { name, email, password})
            .then(resp => {
                if (resp.data.massage == 'registered') {
                    navigate('/login')
                }
                else {
                    setAck(resp.data.massage)
                }
            })


    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setAck(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [handleSubmit])



    return (
        <div className='signupPage'>
            <h2>Create new Account</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name :</label>
                <input type="text" name='name' onChange={e => setName(e.target.value)} required /> <br />

                <label htmlFor="name">email :</label>
                <input type="text" name='name' onChange={e => setEmail(e.target.value)} required /> <br />

                <label htmlFor="name">password :</label>
                <input type="text" name='name' onChange={e => setPassword(e.target.value)} required /> <br />

                <button type='submit'>Sign Up</button>
            </form>
            {
                showAck &&
                <h5 style={{ textAlign: 'center', margin: 0, padding: 0 }}>{ack}</h5>
            }



            <p>Already have Account</p>
            <Link to={'/login'}><button>Login</button></Link>
        </div>
    )
}

export default Register
