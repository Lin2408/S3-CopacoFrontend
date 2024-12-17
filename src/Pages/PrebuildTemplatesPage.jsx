import React, { useEffect, useState } from 'react';
import { fetchItemsByCategory } from '../Apis/get-templates.service.js';
import './PrebuildTemplatesPage.css';

const PrebuildTemplatesPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setTemplates(data || []);
            }
            setLoading(false);
        };
        loadTemplates();
    }, []);

    return (
        <div className="templates-page">
            <h1>Prebuilt PC Configuration</h1>
            {loading ? (
                <p>Loading templates...</p>
            ) : (
                <div className="template-grid">
                    {templates.map((template) => (
                        <div key={template.id} className="template-card">
                            <div className="budget-container">
                                <h3>{template.name}</h3>
                            </div>
                            <img src={template.image || "placeholder.jpg"} alt={template.name} className="template-image" />
                            <p className="description">{template.description || 'No description available.'}</p>
                            <p><strong>Manufacturer:</strong> {template.manufacturer || 'Unknown'}</p>
                            <p><strong>Price:</strong> €{template.price || 'N/A'}</p>
                            <ul>
                                {template.specifications.map((spec, index) => (
                                    <li key={index}><strong>{spec.name}:</strong> {spec.value}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PrebuildTemplatesPage;
