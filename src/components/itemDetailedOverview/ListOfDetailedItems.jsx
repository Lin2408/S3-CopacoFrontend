import {Fragment, useEffect, useState} from "react";
import DetailedItem from "./DetailedItem.jsx";
import * as React from "react";
import {fetchItemsByCategory} from "../../Apis/get-items-from-category.service.js";
import {Alert, Box, CircularProgress, Pagination, Stack} from "@mui/material";
import ItemPaginationButtons from "../ItemPaginationButtons.jsx";

/*const parts = [
    { id: 1, name: 'HPE Intel Xeon‑Silver 4514Y', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 2, name: 'HPE P49610-B21 processor', code: 'HPE-P67092-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 3, name: 'HPE P49653-B21 processor', code: 'HPE-P49653-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
    { id: 4, name: 'HPE Intel Xeon-Gold 6426Y', code: 'HPE-P49598-B21', details: [{title: "Memory", description:"30mb"},{title: "Clock-speed", description: "2 GHz"}], price: 500 },
];*/

const ListOfDetailedItems = ({selectedCategory}) => {
    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [itemPerPage] = useState(15);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPage(1);
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory === null) {
            return;
        }
        const getItems = async () => {

            try {
                setLoading(true);
                setError(null);
                const data = await fetchItemsByCategory({
                    category: selectedCategory.value,
                    itemPerPage: itemPerPage,
                    page: page
                });

                setItems(data.data.items);
                setPageCount(Math.ceil(data.data.itemCount / itemPerPage));
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Something went wrong while trying to get items");
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, [page, selectedCategory]);

    function handlePageChange(event, value) {
        setPage(value);
        console.log("pageOh", page)
        window.scrollTo(0, 0);
    }

    return (
        loading ? (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
            }}>
                <CircularProgress/>
            </Box>
        ) : (error ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ) : (
                <div>
                    <div className="listDisplay">
                        {items.map((part, index) => (
                            <Fragment key={part.id}>
                                <DetailedItem key={part.id} image={part.image} name={part.name}
                                              manufacturer={part.manufacturer} price={part.price}
                                              specifications={part.specifications}/>
                                {index < items.length - 1 && <hr/>}
                            </Fragment>
                        ))}
                    </div>
                    <ItemPaginationButtons page={page} pageCount={pageCount} handlePageChange={handlePageChange}/>
                </div>
            )

        )
    );
}
export default ListOfDetailedItems;