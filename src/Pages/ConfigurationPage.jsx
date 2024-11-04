import ConfiguratorItem from "../components/ConfiguratorItem.jsx";
import {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function load(key, categories) {
    const items = window.sessionStorage.getItem(key);
    return items != null ? JSON.parse(items) : Object.fromEntries(categories.map(category => [category, { }]));
}


function ConfigurationPage() {

    const [loading, setLoading] = useState(true);
    /*const {itemss} = useContext(ItemsContext);*/
    const categories = ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'powersupply', 'case', 'cooling']
    const [items, setItems] = useState(() => load('items',categories));

    useEffect(() => {
        const storedItems = window.sessionStorage.getItem('items');
        if (storedItems) {
            console.log("Restoring items from sessionStorage:", JSON.parse(storedItems));
            setItems(JSON.parse(storedItems));
        } else {
            console.log('Initializing items');
            window.sessionStorage.setItem('items', JSON.stringify(items));
        }
        setLoading(false);
    }, []);

  return (
    <div>
      <h1>Configuration Page</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Component</TableCell>
                        <TableCell align="right">Selection</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <ConfiguratorItem key={category} category={category} items={items} setItems={setItems} loading={loading} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <p>Total price: $100</p>
        <button>Save Configuration</button>
    </div>
  );
}
export default ConfigurationPage;