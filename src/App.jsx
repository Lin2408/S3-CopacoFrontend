import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import { LoginButton, LogoutButton } from "./Components/AuthButtons.jsx";
import AuthProviderWithHistory from "./Components/AuthProvider.jsx";
import Profile from "./Components/Profile.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme.jsx";
import ItemDetailsPage from "./Pages/ItemDetailsPage.jsx";
import HomePage from "./Pages/HomePage.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <AuthProviderWithHistory>
                <Router>
                    <div className="card">
                        <LoginButton /> <LogoutButton />
                    </div>
                    <div>
                        <Profile />
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/items/:id" element={<ItemDetailsPage />} />
                    </Routes>
                </Router>
            </AuthProviderWithHistory>
        </ThemeProvider>
    );
}

export default App;
