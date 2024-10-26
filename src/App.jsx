import {useEffect, useState} from 'react'
import './App.css'
import AuthProviderWithHistory from "./Components/AuthProvider.jsx";
import Profile from "./Components/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import ItemDetailsPage from "./Pages/ItemDetailsPage.jsx";
import ProfilePage from './Pages/ProfilePage.jsx';

function App() {
  const [count, setCount] = useState(0)


  return (
    <AuthProviderWithHistory>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Configurator" element={<HomePage/>}/>
                <Route path="/Items" element={<ItemDetailsPage/>}/>
                <Route path="/Admin" element={<AdminPage/>}/>
                <Route path="/Homepage" element={<HomePage/>}/>
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    </AuthProviderWithHistory>
  )
}

export default App
