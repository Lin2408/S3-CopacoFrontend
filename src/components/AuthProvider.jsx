import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProviderWithHistory=({children}) => {
 const redirectUri = window.location.origin;

 return (
     <Auth0Provider
         domain="dev-vesakq2d1qaixg0k.eu.auth0.com"
         clientId="jiK0m3jaivBwe0LJW2vvpHRD0gJaXWZ9"
         authorizationParams={{
          redirect_uri: redirectUri,
             audience:"https://rule-engine.nl/"
         }}
     >
      {children}
     </Auth0Provider>
 );
};

export default AuthProviderWithHistory;