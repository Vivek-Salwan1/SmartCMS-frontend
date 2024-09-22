import './App.css';
import Home from './componants/Home';
import Navbar from './componants/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './componants/Register';
import Login from './componants/Login';
import ResetPassword from './componants/ResetPassword';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserDashboard from './componants/UserDashboard';
import AddContact from './componants/AddContact';
import EditContact from './componants/EditContact';
import Favorite from './componants/Favorite';


export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('https://smartcms-backend.onrender.com/')
      .then(resp => {
        setUser(resp.data)
        setLoading(false)
      })

      .catch(err => console.log(err))
  }, [])


  if (loading) { <p>Loading...</p> }
  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>

          {
            user &&
            <Route path='/user-dashboard' element={<UserDashboard />}></Route>
          }
          <Route path='/add-contact' element={<AddContact />}></Route>
          <Route path='/edit-contact/:contactID' element={<EditContact />}></Route>
          <Route path='/favorite-contacts' element={<Favorite />}></Route>

        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
