import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {LoginButton,LogoutButton} from "./Components/AuthButtons.jsx";
import AuthProviderWithHistory from "./Components/AuthProvider.jsx";
import Profile from "./Components/Profile.jsx";
import {getProtectedResource, getPublicResource} from "./Apis/message.service.js";
import {useAuth0} from "@auth0/auth0-react";
import AdminPage from "./Pages/AdminPage.jsx";
import ItemDetailsPage from "./Pages/ItemDetailsPage.jsx";

function App() {
  const [count, setCount] = useState(0)


  return (
    <AuthProviderWithHistory>
      <div className="card">
        <AdminPage />
      </div>
        <div>
            <Profile/>
        </div>
    </AuthProviderWithHistory>
  )
}

export default App
