import {useEffect, useState} from 'react'
import './App.css'
import AuthProviderWithHistory from "./Components/AuthProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import ItemOverview from "./Pages/ItemOverview.jsx";
import ItemDetailsPage from "./Pages/ItemDetailsPage.jsx";


function App() {
  const [count, setCount] = useState(0)


  return (
    <AuthProviderWithHistory>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Configurator" element={<HomePage/>}/>
                <Route path="/Items" element={<ItemOverview/>}/>
                <Route path="/Admin" element={<AdminPage/>}/>
                <Route path="/Item" element={<ItemDetailsPage/>}/>
            </Routes>
        </Router>
    </AuthProviderWithHistory>
  )
}

export default App
