import {Fragment, useEffect, useState} from "react";
import DetailedItem from "./DetailedItem.jsx";
import * as React from "react";
import {fetchItems} from "../Apis/Get-Items.service.js";

const parts = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor', code: 'HPE-P49653-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y', code: 'HPE-P49598-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
];

const ListOfDetailedItems = () => {
    const [items,setItems] = useState([]);
    useEffect(() => {
        const getItems = async () => {
            try {
                const data = await fetchItems();
                console.log(data.data.items)
                setItems(data.data.items);
                console.log(items)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getItems();
    }, []);
  return (
    <div>
      <>
        {parts.map((part, index) => (
            <Fragment key={part.id}>
              <DetailedItem key={part.id} name={part.name} code={part.code} details={part.details} price={part.price}/>
              {index < parts.length - 1 && <hr/>}
            </Fragment>
        ))}
      </>
    </div>
  );
}
export default ListOfDetailedItems;