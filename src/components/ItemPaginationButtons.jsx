import {Pagination, Stack, TextField} from "@mui/material";
import {useState} from "react";

const ItemPaginationButtons = ({pageCount, page, handlePageChange}) => {
    const [inputPage, setInputPage] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const pageNumber = parseInt(inputPage, 10);
            setInputPage('');
            if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageCount) {
                handlePageChange(null, pageNumber);
            }

        }
    };
    return (
        <Stack spacing={5}  sx={{mt: 1, mb: 5, display: 'flex', alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pagination
                className="pagination"
                count={pageCount}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
               /* renderItem={(item) => {
                    if (item.type === 'start-ellipsis' || item.type === 'end-ellipsis') {
                        // Replace ellipsis with a TextField
                        return (

                        );
                    }
                    return <PaginationItem {...item} />;
                }}*/
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
            <TextField
                key="pagination-input"
                variant="outlined"
                size="small"
                placeholder="Page"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                    width: 70,
                    '& input': {
                        textAlign: 'center',
                    },
                }}
            />
        </Stack>
    );
}
export default ItemPaginationButtons;