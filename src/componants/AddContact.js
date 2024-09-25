import React, { useContext, useEffect, useState } from 'react'
import { Sidebar } from './UserDashboard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

function AddContact() {

    const {user} = useContext(userContext);

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(null)

    const [ack, setAck] = useState();

    console.log('useremail', user.email)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post('https://smartcms-backend-production.up.railway.app/save-contact', { name, number, email, useremail:user.email })
            .then(resp => {
                setLoading(false)
                if (resp.data === 'saved') {
                    console.log('contact saved')
                    navigate('/user-dashboard')
                    
                } else {
                    console.log('not saved')
                    setAck(resp.data)
                }
            })
            .catch(err => console.log(err))

    }


    return (
        <div className="dashboard-container">
           
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="main-content">
                <div className="add-contact-form-container">
                    <h2>Add New Contact</h2>

                    <form className="add-contact-form" onSubmit={handleSubmit} >

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="number" onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="form-actions">
                            {
                                loading ?
                                <div className="loading"></div> :
                                <button type="submit" className="save-button">Save</button>

                            }
                            <button type="button" className="cancel-button">Cancel</button>
                        </div>
                        {ack && <p>{ack}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContact
