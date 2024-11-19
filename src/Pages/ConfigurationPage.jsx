import ConfiguratorItem from "../components/configuratorOverview/ConfiguratorItem.jsx";
import {useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import "./CSS/ConfigurationPage.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function load(key, categories) {
    const items = sessionStorage.getItem(key);
    return items != null ? JSON.parse(items) : Object.fromEntries(categories.map(category => [category, {}]));
}

function loadCategories() {
    const categories = ['Processoren', 'VideoKaarten', 'Moederborden', 'Geheugenmodules'];
    return categories;
}


function ConfigurationPage() {
    const categories = loadCategories();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(() => load('items', categories));
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedItems = sessionStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        } else {
            sessionStorage.setItem('items', JSON.stringify(items));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const price = Object.values(items).reduce((total, item) => total + (item.part && item.part.price ? parseFloat(item.part.price) : 0), 0);
        setTotalPrice(price);
    }, [items]);

    function handleSubmit() {
        console.log('Saving configuration:', items);
    }

    return (
        <div>
            <h1>Configuration Page</h1>
            <div className="configuratorTable">
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
                            {categories.map((category, index) => (
                                <ConfiguratorItem key={category} index={index} category={category} items={items}
                                                  setItems={setItems}
                                                  loading={loading}/>
                            ))}
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
            </div>


        </div>
    );
}

export default ConfigurationPage;