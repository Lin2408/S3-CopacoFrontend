import { useAuth0 } from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import {getAdminResource} from "../Apis/message.service.js";


const Profile = () => {
    const { user, isAuthenticated, isLoading,getAccessTokenSilently } = useAuth0();

    const [message, setMessage] = useState("");

    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {

            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getAdminResource(accessToken);

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }


        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div color="white">
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {message && <p>{message}</p>}
            </div>
        )
    );
};

export default Profile;