import Item from "./Item.jsx";
import {Fragment, useEffect, useState} from 'react';
import "../../Pages/CSS/ItemOverView.css";
import {fetchItemsByCategory} from "../../Apis/get-items-from-category.service.js";

const parts = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor', code: 'HPE-P49653-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y', code: 'HPE-P49598-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
];


function ListOfItems({onSelect,category}){
    const [items,setItems] = useState([]);
    useEffect(() => {
        const getItems = async () => {
            try {
                const data = await fetchItemsByCategory(category);
                setItems(data.data.items);
                console.log("before", data.data.items);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getItems();
    }, [category]);

    return (
        <>
            {items && items.length > 0 ? (
                items.map((part, index) => (
                    <Fragment key={part.id}>
                        <Item
                            part={part}
                            onSelect={onSelect}
                        />
                        {index < items.length - 1 && <hr />}
                    </Fragment>
                ))
            ) : (
                <p>No items available.</p>
            )}
                {/*{items.map((part, index) => (
                    <Fragment key={part.id}>
                    <Item key={part.id} name={part.name} code={part.code} details={part.details} price={part.price} onSelect={onSelect}/>
                {index < parts.length - 1 && <hr/>}
                </Fragment>
                ))}*/}
        </>
    );

}

export default ListOfItems;