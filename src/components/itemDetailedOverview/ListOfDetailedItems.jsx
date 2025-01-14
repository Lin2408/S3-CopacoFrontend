import {Fragment, useEffect, useState} from "react";
import DetailedItem from "./DetailedItem.jsx";
import * as React from "react";
import {fetchItemsByCategory} from "../../Apis/get-items-from-category.service.js";
import {Alert, Box, CircularProgress, Typography} from "@mui/material";
import ItemPaginationButtons from "../ItemPaginationButtons.jsx";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import NoSearchResults from "../NoSearchResults.jsx";


const ListOfDetailedItems = ({selectedCategory, search, loading, setLoading}) => {
    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
   /* const [loading, setLoading] = useState(true);*/
    const [itemPerPage] = useState(15);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPage(1);
    }, [selectedCategory, search]);

    useEffect(() => {
        if (selectedCategory === null) {
            return;
        }
        const getItems = async () => {

            try {
                setLoading(true);
                setError(null);
                console.log("search", search)
                const request = {
                    category: selectedCategory.value,
                    itemPerPage: itemPerPage,
                    page: page,
                    searchString: search
                }
                const data = await fetchItemsByCategory(request);
                setItems(data.data.items);
                setPageCount(Math.ceil(data.data.itemCount / itemPerPage));
                console.log("data", data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Something went wrong while trying to get items");
            } finally {
                setLoading(false);
                console.log(items);
            }
        };
        getItems();
    }, [page, selectedCategory, search]);


    function handlePageChange(event, value) {
        setPage(value);
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
                items.length > 0 ? (
                <div>
                    <div className="listDisplay">
                        {items.map((part, index) => (
                            <Fragment key={part.id}>
                                <DetailedItem key={part.id} image={part.image} name={part.name}
                                              manufacturer={part.manufacturer} price={part.price}
                                              specifications={part.specifications} id={part.id}/>
                                {index < items.length - 1 && <hr/>}
                            </Fragment>
                        ))}
                    </div>
                    <ItemPaginationButtons page={page} pageCount={pageCount} handlePageChange={handlePageChange}/>
                </div>) :(<NoSearchResults/>
                   )
            )

        )
    );
}
export default ListOfDetailedItems;