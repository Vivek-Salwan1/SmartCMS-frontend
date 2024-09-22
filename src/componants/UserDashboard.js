import React, { useContext, useEffect, useState } from 'react'
import profile from '../profile.png'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../App';
import { MdFavorite, MdFavoriteBorder, MdCheckBoxOutlineBlank  } from 'react-icons/md'
import { CiSearch } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoCheckboxOutline } from "react-icons/io5";

function UserDashboard() {
    const user = useContext(userContext);
    const location = useLocation();
    const [searchInput, setSearchInput] = useState();
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([])



    useEffect(() => {
        user &&
            axios.get(`https://smartcms-backend.onrender.com/get-contacts/${user.email}`)
                .then(resp => setContacts(resp.data))
                .catch(err => console.log(err))
    }, [user,location])


    const handleDelete = (contactID) => {

        axios.delete(`https://smartcms-backend.onrender.com/delete-contact/${contactID}`)
            .then(resp => {
                if (resp.data === 'deleted') {
                    setContacts((prevContacts) =>
                        prevContacts.filter((contact) => contact._id !== contactID)
                    );
                }
            })
            .catch(err => console.log(err))
    }

    const addToFavorite = (contactID) => {

        axios.put('https://smartcms-backend.onrender.com/add-to-favorite', { contactID })
            .then(resp => {
                if (resp.data == 'added to favorite') {
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
        const searchedContact = contacts.filter(contact => contact.name == searchInput || contact.number == searchInput || contact.email ==searchInput);
        // console.log('searched contact' + searchedContact)
        setContacts(searchedContact);


    }

    // console.log(searchInput)

    const removeFromFavorite = (contactID) => {

        axios.put('https://smartcms-backend.onrender.com/remove-from-favorite', { contactID })
            .then(resp => {
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


    const handleSelect = (contactID)=>{
        
        setContacts(prevContacts =>
            prevContacts.map(contact =>
                contact._id === contactID ? { ...contact, selected: !contact.selected } : contact
            )
        )}

    useEffect(()=>{
            const   selected = contacts.filter(contact => contact.selected === true);
            setSelectedContacts(selected)       
},[contacts])


const deleteSelectedContact = ()=>{

    axios.put('https://smartcms-backend.onrender.com/delete-selected-contact', {selectedContacts})
    .then(resp => {
        if(resp.data === 'deleted'){
            setContacts(prevContacts => prevContacts.filter(contact => !contact.selected));

        }
    })
    .catch(err => console.log(err))


}

  const exportCSV = ()=>{
    // console.log('contacts '+contacts)

    



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
                                            <td> <i onClick={()=>handleSelect(contact._id)}> <IoCheckboxOutline/> </i> </td>
                                            :
                                            <td> <i onClick={()=>handleSelect(contact._id)} > <MdCheckBoxOutlineBlank/> </i> </td>
                                            }
               
                                            
                                            <td>{contact.name}</td>
                                            <td>{contact.number}</td>
                                            <td>{contact.email}</td>
                                            <td>
                                                <Link to={`/edit-contact/${contact._id}`}>  <button className="action-button edit">Edit</button></Link>
                                                <button onClick={() => handleDelete(contact._id)} className="action-button delete">Delete</button>
                                            </td>
                                            {
                                                contact.favorite === false ?
                                                    <td onClick={() => addToFavorite(contact._id)}> <span style={{ cursor: 'pointer' }}> <MdFavoriteBorder /></span> </td>
                                                    :
                                                    <td onClick={() => removeFromFavorite(contact._id)} > <span style={{ cursor: 'pointer' }}> <MdFavorite /></span> </td>
                                            }
                                            
                                            <td> <a href={`tel:+91${contact.number}`}><i> <IoCallOutline/> </i> </a> </td>
                                        </tr>
                                    

                                    </tbody>
                                )
                            })

                    }

                </table><br />
                <div style={{display:'flex', justifyContent:'right'}}>
                
                <button onClick={exportCSV}>Export CSV</button>

                </div>
            </div>
        </div>
    )
}

export default UserDashboard


export function Sidebar() {

    const user = useContext(userContext);

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
