import { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Divider, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './AdminTemplatePage.css';

const AdminTemplatePage = () => {
    const [templateName, setTemplateName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const handleAddCategory = () => {
        if (category && !categories.includes(category)) {
            setCategories([...categories, category]);
            setCategory('');
        }
    };

    const handleDeleteCategory = (cat) => {
        setCategories(categories.filter((c) => c !== cat));
    };

    const handleSubmit = () => {
        const newTemplate = { templateName, price, categories };
        console.log("Template Created:", newTemplate);
        // Send template to backend
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '30px auto', p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Create New Template</Typography>

            <TextField
                label="Template Name"
                variant="outlined"
                fullWidth
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                sx={{ mb: 3 }}
            />

            <TextField
                label="Price (€)"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <TextField
                        label="Add Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddCategory}
                        sx={{ height: '100%' }}
                    >
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>

            <List sx={{ mt: 3 }}>
                {categories.map((cat, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => handleDeleteCategory(cat)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={cat} />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
            >
                Create Template
            </Button>
        </Box>
    );
};

export default AdminTemplatePage;
