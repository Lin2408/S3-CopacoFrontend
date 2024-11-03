import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getItemsFromCategories } from '/src/Apis/get-items-from-category.service.js';
import './AdminTemplatePage.css';

const AdminTemplatePage = () => {
    const [templateName, setTemplateName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedItems, setSelectedItems] = useState({
        CPU: '',
        GPU: '',
        Motherboard: '',
        RAM: '',
    });
    const [items, setItems] = useState({
        CPU: [],
        GPU: [],
        Motherboard: [],
        RAM: [],
    });

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getItemsFromCategories();
            setItems(fetchedItems);
        };

        fetchItems();
    }, []);

    const handleSelectChange = (category, value) => {
        setSelectedItems({ ...selectedItems, [category]: value });
    };

    const handleSubmit = () => {
        const newTemplate = { templateName, price, selectedItems };
        console.log("Template Created:", newTemplate);
        // Send template to backend
    };

    const categories = Object.keys(selectedItems);

    return (
        <Box sx={{ maxWidth: 600, margin: '40px auto', p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
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

            <Typography variant="h6" sx={{ mb: 2 }}>Select Components</Typography>
            {categories.map((category) => (
                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }} key={category}>
                    <InputLabel>{category}</InputLabel>
                    <Select
                        value={selectedItems[category]}
                        onChange={(e) => handleSelectChange(category, e.target.value)}
                        label={category}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {items[category].map((item) => (
                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}

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
