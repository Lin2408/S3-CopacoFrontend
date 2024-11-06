import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Divider, Chip, Autocomplete } from '@mui/material';
import { getItemsFromCategories } from '/src/Apis/get-items-from-category.service.js';
import './AdminTemplatePage.css';

const categoryOptions = ['CPU', 'Motherboard', 'GPU', 'RAM', 'Cooling', 'PSU', 'Case', 'Monitor', 'Keyboard', 'Mouse', 'Headset'];

const AdminTemplatePage = () => {
    const [templateName, setTemplateName] = useState('');
    const [items, setItems] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getItemsFromCategories();
            setItems(fetchedItems);
        };

        fetchItems();
    }, []);

    const handleCategoryChange = (event, newValue) => {
        if (newValue && !selectedCategories.includes(newValue)) {
            setSelectedCategories((prev) => [...prev, newValue]);
            setInputValue('');
        }
    };

    const handleDelete = (categoryToDelete) => {
        setSelectedCategories((prev) => prev.filter(category => category !== categoryToDelete));
    };

    const handleSubmit = () => {
        const newTemplate = { templateName, selectedCategories };
        console.log("Template Created:", newTemplate);
        // Send template to backend
    };

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

            <Typography variant="h6" sx={{ mb: 2 }}>Select Categories</Typography>
            <Autocomplete
                options={categoryOptions.filter(option => !selectedCategories.includes(option))}
                onChange={(event, newValue) => handleCategoryChange(event, newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                value={null}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Search Categories" placeholder="Search Categories" />
                )}
                freeSolo
                sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedCategories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        color="primary"
                        onDelete={() => handleDelete(category)}
                    />
                ))}
            </Box>

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
