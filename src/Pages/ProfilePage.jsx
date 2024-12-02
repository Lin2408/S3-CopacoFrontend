import "./ProfilePage.css";
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from '@mui/material';

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className="profile-page">
            <h2>User Profile</h2>

            <div className="profile-image-container">
                <Avatar
                    src={user?.picture || '/placeholder-image.png'} 
                    alt="Profile Image"
                    sx={{ width: 100, height: 100 }}
                />
            </div>

            <div className="profile-details">
                <div className="profile-field">
                    <label>UserID:</label>
                    <p>{user?.sub || "N/A"}</p>
                </div>
                <div className="profile-field">
                    <label>UserName:</label>
                    <p>{user?.name || "N/A"}</p>
                </div>
                <div className="profile-field">
                    <label>Email:</label>
                    <p>{user?.email || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;