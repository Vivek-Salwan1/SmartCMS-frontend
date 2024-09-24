import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';


function Navbar() {
    const {user} = useContext(userContext)
    const navigate = useNavigate();

    const handleLogout = () => {


        axios.defaults.withCredentials = true
        axios.get('smartcms-backend-production.up.railway.app/logout')
            .then(resp => {
                if (resp.data == 'success') {
                    navigate('/')
                    window.location.reload();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='nav'>
            <ul>
                <Link to='/'><li className='logo'>Smart CMS</li></Link>
            </ul>
            <ul>
                {
                    user &&
                    <li style={{ color: '#00ffa9', cursor: 'default' }}>Welcome, {user.name} </li>

                }
                      <li>About</li>
                      {
                        user && 
                       <div style={{display:'flex', gap:'20px'}}>
                       <Link to={'/user-dashboard'}><li>Contacts</li> </Link> 
                       <Link to={'/user-dashboard'}><li>Dashboard</li> </Link> 
                        
                        </div>
                      }

                
                {
                    user && user.email ?
                        <li onClick={handleLogout}>Logout</li>
                        :
                        <Link to='/register'>  <li>Register/Login</li> </Link>
                }

            </ul>
        </div>
    )
}

export default Navbar;
