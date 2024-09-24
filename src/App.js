import './App.css';
import Home from './componants/Home';
import Navbar from './componants/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
    axios.get('https://smartcms-backend-production.up.railway.app/')
      .then(resp => {
        setUser(resp.data)
        console.log("User from API:", resp.data);
        setLoading(false)
      })

      .catch(err => console.log(err))
  }, [])

  console.log('user in home', user)
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader"></div>
      </div>
    );
  }


  return (
    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>

          {
            user &&
            <Route path='/user-dashboard' element={user ? <UserDashboard /> : <Navigate to='/login' />} />
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
