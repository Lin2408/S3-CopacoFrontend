import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthProviderWithHistory from "./Components/AuthProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import ItemSelectionOverview from "./Pages/ItemSelectionOverview.jsx";
import ItemDetailsPage from "./Pages/ItemDetailsPage.jsx";
import ProfilePage from './Pages/ProfilePage.jsx';
import AdminTemplatePage from "./Pages/AdminTemplatePage.jsx";
import PrebuildTemplatesPage from './Pages/PrebuildTemplatesPage.jsx';
import ConfigurationPage from "./Pages/ConfigurationPage.jsx";
import RulesPage from "./Pages/RulesPage.jsx";
import DetailedItemsOverview from "./Pages/DetailedItemsOverview.jsx";


function App() {


  return (
    <AuthProviderWithHistory>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Configurator" element={<ConfigurationPage/>}/>
                <Route path="/Items" element={<ItemSelectionOverview/>}/>
                <Route path="/Admin" element={<AdminPage/>}/>
                <Route path="/Homepage" element={<HomePage/>}/>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/Item" element={<ItemDetailsPage/>}/>
                <Route path="/AdminTemplate" element={<AdminTemplatePage/>}/>
                <Route path="/ItemsDetailed" element={<DetailedItemsOverview/>}/>
                <Route path="/PrebuildTemplatesPage" element={<PrebuildTemplatesPage/>}/>
                <Route path="/adminConfig" element={<AdminPage/>}/>
                <Route path="/rules" element={<RulesPage/>}/>
            </Routes>
        </Router>
    </AuthProviderWithHistory>
  )
}

export default App;
