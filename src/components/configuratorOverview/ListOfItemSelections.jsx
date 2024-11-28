import Item from "./Item.jsx";
import {Fragment, useEffect, useState} from 'react';
import "../../Pages/CSS/ItemOverView.css";
import {fetchItemsByCategory} from "../../Apis/get-items-from-category.service.js";
import ItemPaginationButtons from "../ItemPaginationButtons.jsx";
import * as React from "react";
import {Alert, Box, CircularProgress} from "@mui/material";
import NoSearchResults from "../NoSearchResults.jsx";
import {getItemsByCompatibilty} from "../../Apis/get-items-by-compatibilty.js";

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

        const itemSelection = JSON.parse(sessionStorage.getItem('items'));
        const partsList = [];
        for (const value of Object.values(itemSelection)) {
            if (value.part) {
                partsList.push(value.part);
            }
        }
        console.log('ItemSelection:', itemSelection);
        console.log(partsList);

        if(partsList.length > 0) {

            console.log('ItemSelection:', {category: category, items: partsList});
            getItemsByCompatibilty({category: category, items: partsList}).then(data => {
                setItems(data.data.items);
                setPageCount(Math.ceil(data.data.itemCount / itemPerPage));
            }).catch(error => {
                console.error("Error fetching categories:", error);
                setError("Something went wrong while trying to get items");
            });
            return;
        }

        const getItems = async () => {

            try {
                setLoading(true);
                setError(null);
                const data = await fetchItemsByCategory({category: category.value, itemPerPage: itemPerPage, page: page, searchString: search});

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
    /*useEffect(() => {


    }, []);*/

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
                <NoSearchResults/>
            ))))}
        </>
    );

}

export default ListOfItemSelections;