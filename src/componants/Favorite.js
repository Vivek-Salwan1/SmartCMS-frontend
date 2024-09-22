import React, { useContext, useEffect, useState } from 'react'
import { Sidebar } from './UserDashboard'
import axios from 'axios'
import { userContext } from '../App'

function Favorite() {
const user = useContext(userContext)

const [contacts, setContacts] = useState();

    useEffect(()=>{
        user &&
        axios.get(`http://localhost:3001/get-favorite-contacts/${user.email}`)
        .then(resp => setContacts(resp.data))
        .catch(err => console.log(err))
    },[user])

  return (
    <div className="dashboard-container">
    <Sidebar />

    <div className="main-content">
        <h2>My Favorite Contacts</h2>
        <table className="contact-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Email</th>
                </tr>
            </thead>

            
            {
                contacts &&
                contacts.map((contact, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>{contact.name}</td>
                                <td>{contact.number}</td>
                                <td>{contact.email}</td>
                            </tr>

                        </tbody>
                    )
                })

            }

        </table>
    </div>
</div>
  )
}

export default Favorite
