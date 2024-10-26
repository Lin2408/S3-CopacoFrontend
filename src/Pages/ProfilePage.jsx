import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './ProfilePage.css';
import { Button, TextField } from '@mui/material';

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth0();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        userID: user?.sub || "N/A",
        username: user?.name || "N/A",
        email: user?.email || "N/A",
        password: "*******", 
        role: user?.role || "User",
        phoneNumber: user?.phoneNumber || "N/A",
        address: user?.address || "N/A"
    });

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    if (!isAuthenticated) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="profile-details">
                <div className="profile-field">
                    <label>UserID:</label>
                    <p>{formData.userID}</p>
                </div>
                <div className="profile-field">
                    <label>UserName:</label>
                    {isEditing ? (
                        <TextField
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    ) : (
                        <p>{formData.username}</p>
                    )}
                </div>
                <div className="profile-field">
                    <label>Email:</label>
                    {isEditing ? (
                        <TextField
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    ) : (
                        <p>{formData.email}</p>
                    )}
                </div>
                <div className="profile-field">
                    <label>Password:</label>
                    <p>{formData.password}</p>
                </div>
                <div className="profile-field">
                    <label>Role:</label>
                    <p>{formData.role}</p>
                </div>
                <div className="profile-field">
                    <label>PhoneNumber:</label>
                    {isEditing ? (
                        <TextField
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    ) : (
                        <p>{formData.phoneNumber}</p>
                    )}
                </div>
                <div className="profile-field">
                    <label>Address:</label>
                    {isEditing ? (
                        <TextField
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    ) : (
                        <p>{formData.address}</p>
                    )}
                </div>

                <div className="profile-actions">
                    <Button variant="contained" color="primary" onClick={toggleEdit}>
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    {isEditing && (
                        <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
