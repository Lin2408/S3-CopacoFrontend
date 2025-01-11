import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, TextField, Autocomplete, CircularProgress,
} from "@mui/material";
import RulesTableRow from "../components/RulesTableRow.jsx";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog.jsx";
import ItemPaginationButtons from "../components/ItemPaginationButtons.jsx";
import {useNavigate} from "react-router-dom";
import {fetchRules} from "../Apis/Get-rules-service.js";
import {deleteRule} from "../Apis/delete-rule.service.js";
import ClearIcon from '@mui/icons-material/Clear';
import {fetchCategories} from "../Apis/get-categories.service.js";



function RulesOverviewPage(){
    const [rules, setRules] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [itemPerPage] = useState(20);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState(null);

  /*  const [rules, setRules] = useState([
        { id: 1, name: "Rule 1", description: "This is rule 1", priority: 1 },
        { id: 2, name: "Rule 2", description: "This is rule 2", priority: 2 },
        { id: 3, name: "Rule 3", description: "This is rule 3", priority: 3 },
    ]);*/

    const handleEdit = (id) => {
        navigate(`/updaterules/${id}`);
    };


    useEffect(() => {
        GetRules();
        getCategories()
    }, []);

    useEffect(() => {
        console.log("Selected Category:", selectedCategory);
        GetRules();
    },[selectedCategory]);

    function GetRules(){
        setLoading(true);
        console.log("start");
        fetchRules({categoryId: selectedCategory ? selectedCategory.id : null, page: page, itemPerPage: itemPerPage}).then(data => {
            setRules(data.data.rules);
            setPageCount(data.data.totalPages);
        }).catch(error => {
            console.error("Error fetching rules:", error);
        }).finally(() => {
            setLoading(false);
        });
    }
    function getCategories() {
        fetchCategories().then(data => {
            console.log("Categories:", data);
            setCategories(data.data.categories);
        }).catch(error => {
            console.error("Error fetching categories:", error);
        })
    }
    const handleDeleteClick = (id) => {
        setSelectedRuleId(id);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteRule(selectedRuleId).then(() => {
            GetRules();
            }
        );
        setDialogOpen(false);
        setSelectedRuleId(null);
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
        setSelectedRuleId(null);
    };
    function handlePageChange(event, value) {
        if(value === page){
            return;
        }
        setPage(value);
        window.scrollTo(0, 0);
    }
    function handleCategoryChange(event, value) {
        setSelectedCategory(value);
    }
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Configurator Rules
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 0 }}>
                <Autocomplete
                    disablePortal
                    options={categories}
                    sx={{ width: 300, mb: 3}}
                    getOptionLabel={(option) => option.value}
                    disabled={!categories}
                    onChange={handleCategoryChange}
                    renderInput={(params) => <TextField {...params} label="Sort by Category" InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {params.InputProps.endAdornment}
                                {params.InputProps.value ? (
                                    <Button onClick={() => setSelectedCategory(null)}>
                                        <ClearIcon />
                                    </Button>
                                ) : null}
                            </>
                        ),
                    }}/>}

                />
                <Button variant="contained" onClick={() => navigate('/createRules')} size='large' sx={{ mb: 2, backgroundColor:"#003f74", float: "right"}}>
                    Add New Rule
                </Button>
            </Box>


            <TableContainer component={Paper} sx={{minHeight: '100vh',  boxShadow: 10, width: '90%', margin: '0 auto'}}>
                <Table >
                    <TableHead sx={{backgroundColor: '#003f74', color: 'white', '& .MuiTableCell-root': { color: 'white' }}}>
                        <TableRow>
                            <TableCell><strong>Rule Type</strong></TableCell>
                            <TableCell><strong>Category From</strong></TableCell>
                            <TableCell><strong>Category To</strong></TableCell>
                            <TableCell><strong>Unit</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '50vh',
                                    width: '100%'
                                }}>
                                    <CircularProgress/>
                                </Box>
                            </TableCell>
                        </TableRow>
                        ) : (
                        rules && rules.length !== 0 ? (
                        rules.map((rule, index) => (
                            <RulesTableRow rule={rule} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} index={index} key={rule.id} />
                        ))
                    ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                                        No rules found
                                    </Typography>
                                </TableCell>
                            </TableRow>

                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <Box sx={{ marginTop: 4, textAlign: "center" }}>
            <ItemPaginationButtons page={page} pageCount={pageCount} handlePageChange={handlePageChange} />
        </Box>
            <ConfirmDeleteDialog dialogOpen={dialogOpen} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />
        </Box>
    );
}

export default RulesOverviewPage;