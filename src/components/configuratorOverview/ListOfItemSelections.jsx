import Item from "./Item.jsx";
import {Fragment, useEffect, useState} from 'react';
import "../../Pages/CSS/ItemOverView.css";
import {fetchItemsByCategory} from "../../Apis/get-items-from-category.service.js";
import ItemPaginationButtons from "../ItemPaginationButtons.jsx";
import * as React from "react";
import {Alert, Box, CircularProgress, Typography} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function ListOfItemSelections({onSelect, category, search}) {
    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [itemPerPage] = useState(20);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPage(1);
    }, [category, search]);

    useEffect(() => {
        if (category === null) {
            return;
        }
        const getItems = async () => {

            try {
                setLoading(true);
                setError(null);
                const data = await fetchItemsByCategory({category: category, itemPerPage: itemPerPage, page: page, searchString: search});

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
    }, [page, category, search]);

    function handlePageChange(event, value) {
        setPage(value);
        window.scrollTo(0, 0);
    }

    return (
        <>{loading ? (
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
            (items && items.length > 0 ? (
                <>

                    {items.map((part, index) => (
                        <Fragment key={part.id}>
                            <Item
                                part={part}
                                onSelect={onSelect}
                            />
                            {index < items.length - 1 && <hr/>}
                        </Fragment>
                    ))}
                    <ItemPaginationButtons page={page} pageCount={pageCount} handlePageChange={handlePageChange}/>
                </>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50vh',
                        textAlign: 'center',
                        padding: 2,
                    }}
                >
                    <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        No Items Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Sorry, we couldn't find any items matching your search. Try again with different keywords.
                    </Typography>
                </Box>
            ))))}
        </>
    );

}

export default ListOfItemSelections;