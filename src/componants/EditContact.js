import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Sidebar } from './UserDashboard';
import axios from 'axios';

function EditContact() {
    const navigate = useNavigate();
    const { contactID } = useParams();
 
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {

        axios.get(`http://localhost:3001/getContactById/${contactID}`)
            .then(resp => {
                setName(resp.data.name)
                setNumber(resp.data.number)
                setEmail(resp.data.email)
            })
            .catch(err => console.log(err))

    }, [contactID])

    const handleEdit = (e) => {
        e.preventDefault();
    
        axios.put('http://localhost:3001/edit-contact', {name,number,email,contactID})
        .then(resp => navigate('/user-dashboard'))
        .catch(err => console.log(err))

    }

    const handleCancel = (e)=>{
     e.preventDefault();

     navigate('/user-dashboard')
    }

    return (
        <div className="dashboard-container">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="main-content">
                <div className="add-contact-form-container">
                    <h2>Edit Contact</h2>

                    <form className="add-contact-form" >

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="number" value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-actions">
                            <button onClick={handleEdit} type="submit" className="save-button">Save</button>
                            <button onClick={handleCancel} type="button" className="cancel-button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditContact
