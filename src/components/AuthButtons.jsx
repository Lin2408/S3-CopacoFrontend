import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import {Button} from "@mui/material";

export const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
    return(
        <Button variant="contained" color="secondary.light" onClick={() => loginWithRedirect()}>Log In</Button>
    )
}

export const LogoutButton = () => {
    const {logout} = useAuth0();
    return(
        <Button variant="contained" color="primary" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
    )
}