import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemText, Grid, Divider, CircularProgress } from '@mui/material';

const ItemDetailsPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:6060/items/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItemDetails();
    }, [id]);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f4f4f9', p: 3 }}>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 3, maxWidth: 900, width: '100%', p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <img
                                src={item?.image || "default-image.jpg"}
                                alt={item?.name || "Product image"}
                                style={{ maxWidth: '100%', borderRadius: '8px' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {item?.name || "Item Name"}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
                            {item?.description || "No description available."}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'medium', mb: 1 }}>Specifications</Typography>
                        <List dense>
                            {item?.specificationList?.length ? (
                                item.specificationList.map((spec, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={`${spec.name}: ${spec.presentationValue} ${spec.unit}`}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2">No specifications available.</Typography>
                            )}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h5" sx={{ color: '#1e88e5', fontWeight: 'bold', mb: 2 }}>
                            €{item?.price || "N/A"}
                        </Typography>
                        <Button variant="contained" color="primary" size="large" fullWidth>
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ItemDetailsPage;
