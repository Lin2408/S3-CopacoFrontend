import Button from '@mui/material/Button';
import {Container} from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import './HomePage.css';
import prebuiltImage from '../assets/prebuilt.jpg';
import configureImage from '../assets/configure.webp';
import {NavLink} from "react-router-dom";
function HomePage() {
  return (
    <div className="home">
      <h1>Welcome</h1>

        <Container maxWidth="md">
            <Grid container justifyContent="center"   spacing={2}>
                <Grid size={3}>
                    <NavLink to={"Configurator"}>
                    <Button
                        variant="contained"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),url(${configureImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px',
                            width: '100%',
                            color: 'white',
                            fontSize: '1.4rem',
                            transition: 'transform 0.3s ease-in-out',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 1)',
                            '&:hover': {
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${configureImage})`,
                                color: 'white',
                                transform: 'scale(1.1)',
                                textDecoration: "underline",

                            },
                        }}
                    >Configure PC</Button></NavLink>
                </Grid>
                <Grid size={3}>
                    <NavLink to={"PrebuildTemplatesPage"}>
                    <Button
                        variant="contained"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${prebuiltImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'left',
                            height: '200px',
                            width: '100%',
                            color: 'white',
                            fontSize: '1.4rem',
                            transition: 'transform 0.3s ease-in-out',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 1)',
                            '&:hover': {
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${prebuiltImage})`,
                                color: 'white',
                                transform: 'scale(1.1)',
                                textDecoration: "underline",
                            },
                        }}
                    >Pre Built PC&#39;s
                    </Button></NavLink>
                </Grid>


            </Grid>
        </Container>
    </div>
  );
}
export default HomePage;
