import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './PrebuildTemplatesPage.css';
import { fetchItemsByCategory } from '../Apis/get-items-from-category.service.js';

const PrebuildTemplatesPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        const loadTemplates = async () => {
            setLoading(true);
            const request = {
                category: "PC's/werkstations",
                page: 1,
                itemPerPage: 10,
                searchString: ""
            };

            const { data, error } = await fetchItemsByCategory(request);
            if (error) {
                console.error('Error fetching items by category:', error);
            } else {
                console.log('Templates:', data);
                setTemplates(data.items || []);
            }
            setLoading(false);
        };
        loadTemplates();
    }, []);

    const handleExpandClick = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="templates-page">
            <Typography variant="h4" gutterBottom>
                Prebuilt PC Configuration
            </Typography>
            {loading ? (
                <Typography>Loading templates...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {templates.map((template) => (
                        <Grid item xs={12} sm={6} md={4} key={template.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={template.image || 'placeholder.jpg'}
                                    alt={template.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {template.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {template.description || 'No description available.'}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Manufacturer:</strong> {template.manufacturer || 'Unknown'}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Price:</strong> €{template.price || 'N/A'}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        endIcon={<ExpandMoreIcon />}
                                        onClick={() => handleExpandClick(template.id)}
                                    >
                                        {expanded[template.id] ? 'Hide Specs' : 'Show Specs'}
                                    </Button>
                                </CardActions>

                                <Collapse in={expanded[template.id]} timeout="auto" unmountOnExit>
                                    {/* Add maxHeight & overflowY to make the specs scrollable */}
                                    <CardContent style={{ maxHeight: 200, overflowY: 'auto' }}>
                                        {template.specifications && template.specifications.length > 0 ? (
                                            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                                {template.specifications.map((spec, index) => (
                                                    <li key={index}>
                                                        <strong>{spec.name}:</strong> {spec.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Typography variant="body2">No specifications available.</Typography>
                                        )}
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default PrebuildTemplatesPage;
