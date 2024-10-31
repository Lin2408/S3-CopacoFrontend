import Item from "./Item.jsx";
import { Fragment } from 'react';
import "../Pages/ItemOverview.css";

const parts = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor', code: 'HPE-P49653-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y', code: 'HPE-P49598-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
];


function listOfItems(){


    return (
        <>
                {parts.map((part, index) => (
                    <Fragment key={part.id}>
                    <Item key={part.id} name={part.name} code={part.code} details={part.details} price={part.price}/>
                {index < parts.length - 1 && <hr/>}
                </Fragment>
                ))}
        </>
    );

}

export default listOfItems;