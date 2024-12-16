import React, { useState } from "react";
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



function RulesOverviewPage(){
   /* const [rules, setRules] = useState([]);*/
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [itemPerPage] = useState(20);
    const navigate = useNavigate();

    const [rules, setRules] = useState([
        { id: 1, name: "Rule 1", description: "This is rule 1", priority: 1 },
        { id: 2, name: "Rule 2", description: "This is rule 2", priority: 2 },
        { id: 3, name: "Rule 3", description: "This is rule 3", priority: 3 },
    ]);

    const handleEdit = (id) => {
        alert(`Edit rule with ID: ${id}`);
    };
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState(null);

    function GetRules(){

    }

    const handleDeleteClick = (id) => {
        setSelectedRuleId(id);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setRules((prev) => prev.filter((rule) => rule.id !== selectedRuleId));
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

            <TableContainer component={Paper} sx={{minHeight: '100vh',  boxShadow: 10}}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Rule Name</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Priority</strong></TableCell>
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

            <ConfirmDeleteDialog dialogOpen={dialogOpen} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />

            <Box sx={{ marginTop: 4, textAlign: "center" }}>
                <ItemPaginationButtons page={page} pageCount={pageCount} handlePageChange={handlePageChange} />
            </Box>
        </Box>
    );
}

export default RulesOverviewPage;