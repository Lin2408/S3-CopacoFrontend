import { Box, Typography, Button, List, ListItem, ListItemText, Grid } from '@mui/material';

const ItemDetailsPage = () => {
    return (
        <Box className="product-container" sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box className="product-image" sx={{ textAlign: 'center' }}>
                        <img
                            src="path_to_image.jpg"
                            alt="AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className="product-details">
                        <Typography variant="h4" gutterBottom>
                            AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor
                        </Typography>
                        <Box className="features" sx={{ mb: 2 }}>
                            <Typography variant="h5">Features</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Processor Speed: 4.20 GHz" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Processor Cores: 8" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Socket: AM5" />
                                </ListItem>
                            </List>
                        </Box>
                        <Box className="price" sx={{ mb: 2 }}>
                            <Typography variant="h6" color="primary">
                                €558.58
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary">
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ItemDetailsPage;
