import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Divider, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { getItemsFromCategories } from '/src/Apis/get-items-from-category.service.js';
import './AdminTemplatePage.css';

const AdminTemplatePage = () => {
    const [templateName, setTemplateName] = useState('');
    const [selectedItems, setSelectedItems] = useState({});
    const [items, setItems] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({
        CPU: false,
        Motherboard: false,
        GPU: false,
        RAM: false,
    });

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getItemsFromCategories();
            setItems(fetchedItems);
            setSelectedItems({
                CPU: '',
                Motherboard: '',
                GPU: '',
                RAM: '',
            });
        };

        fetchItems();
    }, []);

    const handleSelectChange = (category, value) => {
        setSelectedItems({ ...selectedItems, [category]: value });
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories({ ...selectedCategories, [category]: !selectedCategories[category] });
    };

    const handleSubmit = () => {
        const newTemplate = { templateName, selectedItems };
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
            {Object.keys(selectedCategories).map((category) => (
                <FormControlLabel
                    key={category}
                    control={
                        <Checkbox
                            checked={selectedCategories[category]}
                            onChange={() => handleCategoryToggle(category)}
                            color="primary"
                        />
                    }
                    label={category}
                />
            ))}

            {Object.keys(selectedCategories).map((category) => (
                selectedCategories[category] && (
                    <FormControl fullWidth variant="outlined" sx={{ mb: 3 }} key={category}>
                        <InputLabel>{category}</InputLabel>
                        <Select
                            value={selectedItems[category]}
                            onChange={(e) => handleSelectChange(category, e.target.value)}
                            label={category}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {items[category]?.map((item) => (
                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
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
