import { Box, Button, TextField, MenuItem, Grid } from '@mui/material';

const AdminPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Rule Name"
                        id="ruleName"
                        placeholder="Enter rule name"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        label="Rule Condition"
                        id="ruleCondition"
                        required
                    >
                        <MenuItem value="">
                            <em>Select condition</em>
                        </MenuItem>
                        {/* Add options here */}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Discount Percentage"
                        id="discountPercentage"
                        placeholder="Enter percentage"
                        inputProps={{ min: 0 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Discount Value"
                        id="discountValue"
                        placeholder="Enter value"
                        inputProps={{ min: 0 }}
                        required
                    />
                </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                    Create item
                </Button>
                <Button type="button" variant="outlined">
                    Import
                </Button>
            </Box>
        </Box>
    );
};

export default AdminPage;
