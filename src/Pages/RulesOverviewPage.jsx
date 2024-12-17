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
    Paper,
} from "@mui/material";
import RulesTableRow from "../components/RulesTableRow.jsx";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog.jsx";
import ItemPaginationButtons from "../components/ItemPaginationButtons.jsx";
import {useNavigate} from "react-router-dom";
import {fetchRules} from "../Apis/Get-rules-service.js";
import {deleteRule} from "../Apis/delete-rule.service.js";



function RulesOverviewPage(){
    const [rules, setRules] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [itemPerPage] = useState(20);
    const navigate = useNavigate();

  /*  const [rules, setRules] = useState([
        { id: 1, name: "Rule 1", description: "This is rule 1", priority: 1 },
        { id: 2, name: "Rule 2", description: "This is rule 2", priority: 2 },
        { id: 3, name: "Rule 3", description: "This is rule 3", priority: 3 },
    ]);*/

    const handleEdit = (id) => {
        alert(`Edit rule with ID: ${id}`);
    };
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState(null);

    useEffect(() => {
        GetRules();
    }, []);

    function GetRules(){
        setLoading(true);
        console.log("start");
        fetchRules().then(data => {
            console.log("2", data.data.rules);
            setRules(data.data.rules);
            /*setPageCount(Math.ceil(data.data.length / itemPerPage));*/
        }).catch(error => {
            console.error("Error fetching rules:", error);
        }).finally(() => {
            setLoading(false);
        });
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
        setPage(value);
        window.scrollTo(0, 0);
    }
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Configurator Rules
            </Typography>
            <Button variant="contained" onClick={() => navigate('/createRules')} size='large' sx={{ mb: 2, backgroundColor:"#003f74", float: "right", mr: '10%'}}>
                Add New Rule
            </Button>
            {rules && rules.length !== 0 ? (
<>
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
                        {rules.map((rule, index) => (
                            <RulesTableRow rule={rule} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick} index={index} key={rule.id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <Box sx={{ marginTop: 4, textAlign: "center" }}>
            <ItemPaginationButtons page={page} pageCount={pageCount} handlePageChange={handlePageChange} />
        </Box>
        </>
                ) : (
                <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                    No rules found
                </Typography>
                )}

            <ConfirmDeleteDialog dialogOpen={dialogOpen} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />


        </Box>
    );
}

export default RulesOverviewPage;