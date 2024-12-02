import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrebuildTemplatesPage.css';

const defaultItems = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor', code: 'HPE-P49653-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y', code: 'HPE-P49598-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
];

const PrebuildTemplatesPage = () => {
    const navigate = useNavigate();

    const templates = [
        {
            id: 1,
            budget: '100 euros',
            items: {
                CPU: defaultItems[0],
                'Video Card': defaultItems[1],
                Memory: defaultItems[2],
                Storage: defaultItems[3],
                Motherboard: defaultItems[0],
                Powersupply: defaultItems[1],
                Case: defaultItems[2],
                Cooling: defaultItems[3],
            },
            description: 'A budget-friendly gaming PC for light gaming and daily tasks.',
        },
        {
            id: 2,
            budget: '250 euros',
            items: {
                CPU: defaultItems[1],
                'Video Card': defaultItems[2],
                Memory: defaultItems[3],
                Storage: defaultItems[0],
                Motherboard: defaultItems[1],
                Powersupply: defaultItems[2],
                Case: defaultItems[3],
                Cooling: defaultItems[0],
            },
            description: 'A mid-range PC for gaming and productivity.',
        },
        {
            id: 3,
            budget: '500 euros',
            items: {
                CPU: defaultItems[2],
                'Video Card': defaultItems[3],
                Memory: defaultItems[0],
                Storage: defaultItems[1],
                Motherboard: defaultItems[2],
                Powersupply: defaultItems[3],
                Case: defaultItems[0],
                Cooling: defaultItems[1],
            },
            description: 'A high-performance PC for serious gaming and multitasking.',
        },
        {
            id: 4,
            budget: '750 euros',
            items: {
                CPU: defaultItems[3],
                'Video Card': defaultItems[0],
                Memory: defaultItems[1],
                Storage: defaultItems[2],
                Motherboard: defaultItems[3],
                Powersupply: defaultItems[0],
                Case: defaultItems[1],
                Cooling: defaultItems[2],
            },
            description: 'An enthusiast-level PC with excellent processing power.',
        },
        {
            id: 5,
            budget: '1000 euros',
            items: {
                CPU: defaultItems[0],
                'Video Card': defaultItems[1],
                Memory: defaultItems[3],
                Storage: defaultItems[2],
                Motherboard: defaultItems[1],
                Powersupply: defaultItems[2],
                Case: defaultItems[3],
                Cooling: defaultItems[0],
            },
            description: 'A well-rounded, powerful setup for gaming and productivity.',
        },
        {
            id: 6,
            budget: '1250 euros',
            items: {
                CPU: defaultItems[1],
                'Video Card': defaultItems[2],
                Memory: defaultItems[0],
                Storage: defaultItems[3],
                Motherboard: defaultItems[0],
                Powersupply: defaultItems[3],
                Case: defaultItems[2],
                Cooling: defaultItems[1],
            },
            description: 'A workstation-level PC for advanced users and creatives.',
        },
        {
            id: 7,
            budget: '1500 euros',
            items: {
                CPU: defaultItems[2],
                'Video Card': defaultItems[3],
                Memory: defaultItems[1],
                Storage: defaultItems[0],
                Motherboard: defaultItems[2],
                Powersupply: defaultItems[1],
                Case: defaultItems[0],
                Cooling: defaultItems[3],
            },
            description: 'An ultra-powerful gaming and streaming PC.',
        },
        {
            id: 8,
            budget: '2000 euros',
            items: {
                CPU: defaultItems[3],
                'Video Card': defaultItems[0],
                Memory: defaultItems[2],
                Storage: defaultItems[1],
                Motherboard: defaultItems[3],
                Powersupply: defaultItems[0],
                Case: defaultItems[1],
                Cooling: defaultItems[2],
            },
            description: 'A top-of-the-line configuration for ultimate performance.',
        },
    ];


    const handleBuyNow = (template) => {
        sessionStorage.setItem('items', JSON.stringify(template.items));
        navigate('/Configurator');
    };

    return (
        <div className="templates-page">
            <h1>Prebuilt PC Configuration</h1>
            <div className="template-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        <div className="budget-container">
                            <h3>Budget: {template.budget}</h3>
                        </div>
                        <ul>
                            {Object.entries(template.items).map(([key, item], index) => (
                                <li key={index}><strong>{key}:</strong> {item.name}</li>
                            ))}
                        </ul>
                        <p className="description">{template.description}</p>
                        <button
                            className="buy-now-button"
                            onClick={() => handleBuyNow(template)}
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrebuildTemplatesPage;
