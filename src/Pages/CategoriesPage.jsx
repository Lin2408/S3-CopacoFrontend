import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Autocomplete,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
} from '@mui/material';
import { fetchCategories } from '/src/Apis/get-categories.service.js';
import './CategoriesPage.css';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory1, setSelectedCategory1] = useState(null);
    const [selectedCategory2, setSelectedCategory2] = useState(null);
    const [specifications] = useState(['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4']);
    const [specification1, setSpecification1] = useState('');
    const [specification2, setSpecification2] = useState('');
    const [match, setMatch] = useState(null);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            const { data, error } = await fetchCategories();
            if (data) {
                setCategories(data);
            } else {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategoriesData();
    }, []);

    const handleCheckMatch = () => {
        setMatch(specification1 === specification2);
    };

    return (
        <Box className="categories-container">
            <Card className="outer-card">
                <CardContent>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                            WebkitBackgroundClip: 'text',
                            color: 'black',
                        }}
                    >
                        Categories Page
                    </Typography>
                    <Box className="inner-card-container">
                        <Box className="categories-box">
                            <Autocomplete
                                options={categories.map((category) => category.name)}
                                value={selectedCategory1}
                                onChange={(e, value) => setSelectedCategory1(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Autofill Categories" variant="outlined" />
                                )}
                                className="autocomplete"
                            />
                            <TextField
                                label="Autofill unique specifications"
                                variant="outlined"
                                value={specification1}
                                onChange={(e) => setSpecification1(e.target.value)}
                                className="specification-input"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Weird naming scheme"
                            />
                            <List className="list-box">
                                {specifications.map((spec, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        selected={specification1 === spec}
                                        onClick={() => setSpecification1(spec)}
                                    >
                                        <ListItemText primary={spec} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box className="categories-box">
                            <Autocomplete
                                options={categories.map((category) => category.name)}
                                value={selectedCategory2}
                                onChange={(e, value) => setSelectedCategory2(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Autofill Categories" variant="outlined" />
                                )}
                                className="autocomplete"
                            />
                            <TextField
                                label="Autofill unique specifications"
                                variant="outlined"
                                value={specification2}
                                onChange={(e) => setSpecification2(e.target.value)}
                                className="specification-input"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Weird naming scheme"
                            />
                            <List className="list-box">
                                {specifications.map((spec, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        selected={specification2 === spec}
                                        onClick={() => setSpecification2(spec)}
                                    >
                                        <ListItemText primary={spec} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckMatch}
                        className="check-button"
                    >
                        Check Match
                    </Button>
                    {match !== null && (
                        <Typography className="result-message">
                            {match ? 'Specifications Match!' : 'Specifications Do Not Match.'}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default CategoriesPage;
