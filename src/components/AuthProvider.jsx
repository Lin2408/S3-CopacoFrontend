import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import App from '../App.jsx';
const AuthProviderWithHistory=({children}) => {
 const redirectUri = window.location.origin;

 return (
     <Auth0Provider
         domain="dev-vesakq2d1qaixg0k.eu.auth0.com"
         clientId="jiK0m3jaivBwe0LJW2vvpHRD0gJaXWZ9"
         authorizationParams={{
          redirect_uri: redirectUri
         }}
     >
      {children}
     </Auth0Provider>
 );
};

export default AuthProviderWithHistory;