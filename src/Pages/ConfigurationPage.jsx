import ConfiguratorItem from "../components/configuratorOverview/ConfiguratorItem.jsx";
import {useEffect, useState} from "react";
import {
    Autocomplete,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import "./CSS/ConfigurationPage.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {fetchTemplates} from "../Apis/get-templates.service.js";

function ConfigurationPage() {
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setLoading(true);
        loadTemplates();
        const storedItems = sessionStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        } else {
            sessionStorage.setItem('items', JSON.stringify(items));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (template?.categories) {
            load(template.categories);
        }
    }, [template]);

    async function loadTemplates() {
        const data = await fetchTemplates();
        if (data.error) {
            console.error('Error fetching templates:', data.error);
        }
        const initialTemplates = data.data.templates;
        setTemplates(initialTemplates);

        const initialTemplate = JSON.parse(sessionStorage.getItem('template')) || initialTemplates[0];
        setTemplate(initialTemplate);

        load(initialTemplate.categories);
    }
    function load(categories) {
        if (!categories) return;
        const itemFromStorage = sessionStorage.getItem('items');
        setItems(itemFromStorage != null ? JSON.parse(itemFromStorage) : Object.fromEntries(categories.map(category => [category.value, {}])));
    }

    useEffect(() => {
        const price = Object.values(items || {}).reduce(
            (total, item) => total + (item.part?.price ? parseFloat(item.part.price) : 0),
            0
        );
        setTotalPrice(price);
    }, [items]);

    function handleSubmit() {
        console.log('Saving configuration:', items);
    }

    function handleTemplateChange(event, newValue) {
        setTemplate(newValue);
        console.log(newValue);
        sessionStorage.removeItem('items');
        if(!newValue){
            sessionStorage.removeItem('template');
            setItems({});
            return;
        }
        setItems(Object.fromEntries(newValue.categories.map(category => [category.value, {}])));
        sessionStorage.setItem('template', JSON.stringify(newValue));

    }
    return (
        <div>
            <h1>Configuration</h1>
            {
                loading ? (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                ) : (


            <div className="configuratorTable">
                <Autocomplete
                    disablePortal
                    options={templates}
                    value={template}
                    sx={{ width: 300, mb: 3}}
                    getOptionLabel={(option) => option.name}
                    onChange={handleTemplateChange}
                    renderInput={(params) => <TextField {...params} label="Templates" />}
                />
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 550}} aria-label="simple table">
                        <TableHead>
                            <TableRow>{/*style={{backgroundColor: "#F5FBFD"}}*/}
                                <TableCell>Component</TableCell>
                                <TableCell>Selection</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {template ?(

                            template.categories.map((category, index) => (
                                <ConfiguratorItem key={category.id} index={index} category={category.value} items={items}
                                                  setItems={setItems}
                                                  loading={loading}/>
                            ))
                        ):(
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{backgroundColor: "lightgrey"}}>
                                    <Typography variant="subtitle1" color="black">
                                        Please select a template
                                    </Typography>
                                </TableCell>
                            </TableRow>)
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="tableBottom">
                    <p>Total price: €{totalPrice.toFixed(2)}</p>
                    <Button startIcon={<ShoppingCartIcon/>} variant="contained" sx={{
                        backgroundColor: '#2BAD70',
                        color: '#ffffff',
                        '&:hover': {backgroundColor: '#278f5f',},
                    }} onClick={handleSubmit}>Save Configuration</Button>
                </div>
            </div>)}


        </div>
    );
}

export default ConfigurationPage;