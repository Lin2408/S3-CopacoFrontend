import React from 'react';
import './PrebuildTemplatesPage.css';

const PrebuildTemplatesPage = () => {
    const templates = [
        {
            id: 1,
            budget: '100 euros',
            cpu: 'AMD Ryzen 5',
            ram: '8GB',
            storage: '256GB SSD',
            gpu: 'NVIDIA GTX 1050',
            description: 'A budget-friendly gaming PC for light gaming and daily tasks.',
        },
        {
            id: 2,
            budget: '250 euros',
            cpu: 'Intel i5',
            ram: '16GB',
            storage: '512GB SSD',
            gpu: 'NVIDIA GTX 1660',
            description: 'A mid-range PC for gaming and productivity.',
        },
        {
            id: 3,
            budget: '500 euros',
            cpu: 'AMD Ryzen 7',
            ram: '32GB',
            storage: '1TB SSD',
            gpu: 'NVIDIA RTX 3060',
            description: 'High-performance PC for gaming, streaming, and content creation.',
        },
        {
            id: 4,
            budget: '150 euros',
            cpu: 'Intel i3',
            ram: '8GB',
            storage: '256GB SSD',
            gpu: 'Intel UHD Graphics',
            description: 'Affordable office PC for browsing, documents, and streaming.',
        },
        {
            id: 5,
            budget: '300 euros',
            cpu: 'AMD Ryzen 5',
            ram: '16GB',
            storage: '512GB SSD',
            gpu: 'AMD Radeon RX 570',
            description: 'A balanced PC for mid-tier gaming and multitasking.',
        },
        {
            id: 6,
            budget: '750 euros',
            cpu: 'Intel i7',
            ram: '32GB',
            storage: '1TB NVMe SSD',
            gpu: 'NVIDIA RTX 3070',
            description: 'A high-end PC for serious gaming and professional work.',
        },
        {
            id: 7,
            budget: '200 euros',
            cpu: 'AMD Ryzen 3',
            ram: '8GB',
            storage: '512GB HDD',
            gpu: 'AMD Vega 8 Graphics',
            description: 'Entry-level PC for basic tasks and light gaming.',
        },
        {
            id: 8,
            budget: '600 euros',
            cpu: 'Intel i5',
            ram: '16GB',
            storage: '1TB SSD',
            gpu: 'NVIDIA GTX 1660 Ti',
            description: 'Great performance for gaming and content creation on a budget.',
        },
    ];

    const handleBuyNow = (template) => {
        alert(`Buying template: ${template.budget} - ${template.cpu}`);
    };

    return (
        <div className="templates-page">
            <h2>Prebuilt PC Configuration</h2>
            <div className="template-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        <h3>Budget: {template.budget}</h3>
                        <p><strong>CPU:</strong> {template.cpu}</p>
                        <p><strong>RAM:</strong> {template.ram}</p>
                        <p><strong>Storage:</strong> {template.storage}</p>
                        <p><strong>GPU:</strong> {template.gpu}</p>
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
