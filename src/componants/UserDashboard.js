import React, { useContext, useEffect, useState } from 'react'
import profile from '../profile.png'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../App';
import { MdFavorite, MdFavoriteBorder, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { CiSearch } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoCheckboxOutline } from "react-icons/io5";

function UserDashboard() {
    const { user } = useContext(userContext);
    const location = useLocation();
    const [searchInput, setSearchInput] = useState();
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([])
    const [loading, setLoading] = useState(null); // Add a loading state



    useEffect(() => {
        console.log('user in dashbard', user.email,user.name)
        setLoading(true)
        if (user) {
            axios.get(`https://smartcms-backend-production.up.railway.app/get-contacts/${user.email}`)
                .then(resp => {
                    setLoading(false);
                    console.log("Contacts data:", resp.data);
                    setContacts(resp.data)

                })
                .catch(err => console.log(err))
        }
    }, [user, location])


    const handleDelete = (contactID) => {
        setLoading(true)
        axios.delete(`https://smartcms-backend-production.up.railway.app/delete-contact/${contactID}`)
            .then(resp => {
                setLoading(false)
                if (resp.data === 'deleted') {
                    console.log('deleted')
                    setContacts((prevContacts) =>
                        prevContacts.filter((contact) => contact._id !== contactID)
                    );
                }
            })
            .catch(err => console.log(err))
    }

    const addToFavorite = (contactID) => {
        setLoading(true)
        axios.put('https://smartcms-backend-production.up.railway.app/add-to-favorite', { contactID })
            .then(resp => {
                setLoading(false)
                if (resp.data == 'added to favorite') {
                    console.log('added to favoirate')
                    setContacts(prevContacts =>
                        prevContacts.map(contact =>
                            contact._id === contactID
                                ? { ...contact, favorite: !contact.favorite }  // Toggle the favorite status
                                : contact
                        )
                    );
                }

            })
            .catch(err => console.log(err))
    }

    const handleSearch = (e) => {
        // find contact that matched search input
        const searchedContact = contacts.filter(contact => contact.name == searchInput || contact.number == searchInput || contact.email == searchInput);
        // console.log('searched contact' + searchedContact)
        setContacts(searchedContact);


    }

    // console.log(searchInput)

    const removeFromFavorite = (contactID) => {
        setLoading(true)
        axios.put('https://smartcms-backend-production.up.railway.app/remove-from-favorite', { contactID })
            .then(resp => {
                setLoading(false)
                if (resp.data == 'removed from favorite') {
                    setContacts(prevContacts =>
                        prevContacts.map(contact =>
                            contact._id === contactID ?
                                { ...contact, favorite: !contact.favorite } :
                                contact
                        )
                    )
                }
            })
            .catch(err => console.log(err))
    }


    const handleSelect = (contactID) => {

        setContacts(prevContacts =>
            prevContacts.map(contact =>
                contact._id === contactID ? { ...contact, selected: !contact.selected } : contact
            )
        )
    }

    useEffect(() => {
        const selected = contacts.filter(contact => contact.selected === true);
        setSelectedContacts(selected)
    }, [contacts])


    const deleteSelectedContact = () => {
        setLoading(true)
        axios.put('https://smartcms-backend-production.up.railway.app/delete-selected-contact', { selectedContacts })
            .then(resp => {
                setLoading(false)
                if (resp.data === 'deleted') {
                    setContacts(prevContacts => prevContacts.filter(contact => !contact.selected));
                    console.log('selected deleted')

                }
            })
            .catch(err => console.log(err))


    }



    if (!user) {
        return <p>User not logged in. Redirecting...</p>;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}



            <div className="main-content">
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="header-fields">
                    <h2>Contact List</h2>
                    {
                        selectedContacts.length > 0 &&
                        <button onClick={deleteSelectedContact}>Delete Selected Contacts</button>
                    }
                    <p>
                        <input type="text" placeholder='Search Contact' className='search' onChange={e => setSearchInput(e.target.value)} />
                        <i onClick={handleSearch} ><CiSearch /></i>
                    </p>
                </div>

                <table className="contact-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Email</th>
                            <th>Actions</th>
                            <th>Add to Favorite</th>
                            <th>Tap to Call</th>

                        </tr>
                    </thead>



                    {
                        contacts &&
                        contacts.map((contact, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        {
                                            contact.selected === true ?
                                                <td> <i onClick={() => handleSelect(contact._id)}> <IoCheckboxOutline /> </i> </td>
                                                :
                                                <td> <i onClick={() => handleSelect(contact._id)} > <MdCheckBoxOutlineBlank /> </i> </td>
                                        }


                                        <td>{contact.name}</td>
                                        <td>{contact.number}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            <Link to={`/edit-contact/${contact._id}`}>  <button className="action-button edit">Edit</button></Link>
                                            {
                                                loading ?
                                                    <div className="loading"></div>
                                                    :
                                                    <button onClick={() => handleDelete(contact._id)} className="action-button delete">Delete</button>
                                            }

                                        </td>
                                        {
                                            loading ? (
                                                <td><div className="loading"></div></td>
                                            ) : (
                                                <td onClick={() => contact.favorite ? removeFromFavorite(contact._id) : addToFavorite(contact._id)}>
                                                    <span style={{ cursor: 'pointer' }}>
                                                        {contact.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
                                                    </span>
                                                </td>
                                            )
                                        }


                                        <td> <a href={`tel:+91${contact.number}`}><i> <IoCallOutline /> </i> </a> </td>
                                    </tr>


                                </tbody>
                            )
                        })

                    }

                </table><br />
            
            </div>
        </div>
    )
}

export default UserDashboard


export function Sidebar() {

    const {user} = useContext(userContext);

    return (
        <div className="sidebar">
            <div className="profile-section">
                <img src={profile} alt="Profile" className="profile-img" />
                {
                    user &&
                    <h3>{user.email}</h3>
                }
            </div>
            <ul className="sidebar-menu">
                <Link to='/user-dashboard'><li>Show Contacts</li></Link>
                <Link to='/add-contact'> <li>Add Contact</li> </Link>
                <Link to='/favorite-contacts'> <li>Favorite Contacts</li> </Link>
            </ul>
        </div>
    )
}
