import Button from '@mui/material/Button';
import {Container} from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import './HomePage.css';
function HomePage() {
  return (
    <div className="home">
      <h1>Welcome</h1>

        <Container maxWidth="md">
            <Grid container justifyContent="center"   spacing={2}>
                <Grid size={3}>
                    <Button
                        variant="contained"
                        href="/"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundImage: `url("https://img.freepik.com/premium-vector/blueprint-plan-outline-draft-pc-set_70347-1369.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px',
                            width: '100%',
                            color: 'white',
                            fontSize: '1.2rem',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://img.freepik.com/premium-vector/blueprint-plan-outline-draft-pc-set_70347-1369.jpg")`,
                                color: 'white',
                                transform: 'scale(1.1)',
                                textDecoration: "underline",

                            },
                        }}
                    >Configure PC</Button>
                </Grid>
                <Grid size={3}>
                    <Button
                        variant="contained"
                        href="/"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundImage: `url("https://fixautousa.com/wp-content/uploads/2020/06/bigstock-Car-Schematic-Or-Car-Blueprint-228148870.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px',
                            width: '100%',
                            color: 'white',
                            fontSize: '1.2rem',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://fixautousa.com/wp-content/uploads/2020/06/bigstock-Car-Schematic-Or-Car-Blueprint-228148870.jpg")`,
                                color: 'white',
                                transform: 'scale(1.1)',
                                textDecoration: "underline",
                            },
                        }}
                    >Configure Car
                 </Button>
                </Grid>


            </Grid>
        </Container>
    </div>
  );
}
export default HomePage;
