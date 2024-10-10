// src/pages/ComputerPartsList.jsx
import ComputerPart from '../components/ComputerPart';

const parts = [
    { id: 1, name: 'Intel Core i9', type: 'CPU', price: 500 },
    { id: 2, name: 'NVIDIA RTX 3080', type: 'GPU', price: 1200 },
    { id: 3, name: 'Corsair 32GB RAM', type: 'Memory', price: 150 },
    { id: 4, name: 'Samsung 970 Evo', type: 'Storage', price: 200 },
];

const listOfItems = () => {
    return (
        <div className="parts-list">
            {parts.map((part) => (
                <ComputerPart key={part.id} name={part.name} type={part.type} price={part.price} />
            ))}
        </div>
    );
};

export default listOfItems;