import Item from "./Item.jsx";
import * as React from 'react';
import "../Pages/ItemOverview.css";
import Grid from '@mui/material/Grid2';
import {useEffect} from "react";
import {fetchCategories} from "../Apis/get-item-categories.service.js";
import {fetchItems} from "../Apis/Get-Items.service.js";
useEffect(() => {
    const fetchItems = async () => {
        try {
            const data = await fetchItems();
            console.log(data)
            setCategoryOptions(data.data.items);
            console.log(categoryOptions)
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    fetchItems();
}, []);

const parts = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y processor 2 GHz 30 MB', code: 'HPE-P67092-B21', details: ["Intel® Xeon® Silver","FCLGA4677 socket","16 cores"], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor 2 GHz 30 MB', code: 'HPE-P67092-B21', details: ["Intel® Xeon® Silver","FCLGA4677 socket","16 cores"], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor 2 GHz 30 MB', code: 'HPE-P49653-B21', details: ["Intel® Xeon® Gold","LGA 3647 (Socket P) socket","3,8 GHz kloksnelheid"], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y processor 2,5 GHz 37,5 MB', code: 'HPE-P49598-B21', details: ["Intel® Xeon® Silver","FCLGA4677 socket","16 cores"], price: 500 },
];

function listOfItems(){
    const [items,setItems] = React.useState([]);
    useEffect(() => {
        const getItems = async () => {
            try {
                const data = await fetchItems();
                console.log(data)
                setItems(data.data.items);
                console.log(items)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getItems();
    }, []);
    return (
        <>
            <div className="item-list">
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <p>filters section</p>
                    </Grid>
                    <Grid size={8}>
                        {items && items.count >0 && parts.map((part) => (
                            <Item key={part.id} name={part.name} code={part.code} details={part.details} price={part.price}/>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default listOfItems;