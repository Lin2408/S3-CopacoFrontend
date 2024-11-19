import {Fragment, useEffect, useState} from "react";
import DetailedItem from "./DetailedItem.jsx";
import * as React from "react";
import {fetchItemsByCategory} from "../../Apis/get-items-from-category.service.js";

/*const parts = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor', code: 'HPE-P49653-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y', code: 'HPE-P49598-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
];*/

const ListOfDetailedItems = ({selectedCategory}) => {
    const [items,setItems] = useState([]);
    useEffect(() => {
        if(selectedCategory === null){
            return;
        }
        const getItems = async () => {
            try {
                const data = await fetchItemsByCategory(selectedCategory.value);
                setItems(data.data.items);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getItems();
    }, [selectedCategory]);
  return (
    <div>
      <>
        {items.map((part, index) => (
            <Fragment key={part.id}>
              <DetailedItem key={part.id} image={part.image} name={part.name} manufacturer={part.manufacturer} price={part.price} specifications={part.specifications}/>
              {index < items.length - 1 && <hr/>}
            </Fragment>
        ))}
      </>
    </div>
  );
}
export default ListOfDetailedItems;