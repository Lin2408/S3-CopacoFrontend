import { Box, Button, TextField, MenuItem, Grid } from '@mui/material';
import ImportButton from "../Components/ImportButton.jsx";

const AdminPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, width: "80%", mx: 'auto', mt: 3}}>
            <Box mt={2}   sx={{ display: 'flex', justifyContent: 'center',}} justifyContent="space-between">

                <ImportButton />
            </Box>
        </Box>
    );
};

export default AdminPage;
