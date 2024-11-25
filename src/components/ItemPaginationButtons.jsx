import {Pagination, Stack} from "@mui/material";
import * as React from "react";
import {useEffect} from "react";

const ItemPaginationButtons = ({pageCount, page, handlePageChange}) => {

    return (
        <Stack spacing={5}  sx={{mt: 1, mb: 5, display: 'flex', alignItems: 'flex-end',}}>
            <Pagination
                className="pagination"
                count={pageCount}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        width: 43, // Custom width
                        height: 43, // Custom height
                        fontSize: '1.1rem',
                        color: '#6b6b6b',
                        marginRight: 1,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#003f74',
                            borderColor: '#003f74',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: '#e1eaf8',
                        color: '#003f74',
                        fontWeight: 'bold',
                        pointerEvents: 'none',
                        borderColor: '#003f74',
                        position: 'relative',
                        '&:hover': {
                            backgroundColor: '#e5f6ff',
                        },
                    },
                }}
            />
        </Stack>
    );
}
export default ItemPaginationButtons;