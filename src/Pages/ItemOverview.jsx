import  ListOfItems  from '../components/listOfItems.jsx';
import Grid from "@mui/material/Grid2";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const filterData = [
    {title: "Brand", options: [{name: "Intel"},{name: "AMD"}]},
    {title: "Cores", options: [{name: "4"},{name: "6"},{name: "8"},{name: "12"},{name: "16"}]},

]
function load(key) {
    const items = sessionStorage.getItem(key);
    return items != null ? JSON.parse(items) : [];
}

function ItemOverview() {
    const [searchTerm, setSearchTerm] = useState([]);
    const [items, setItems] = useState(() => load('items'));
    const navigate = useNavigate();
    const { state } = useLocation();
    const category = state?.category || 'item';

    const handleSearch = () => {
        console.log('Search for:', searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const onSelect = (id, itemDetails) => {
        const newItem = { id, ...itemDetails };
        setItems(prevItems => {
            const updatedItems = {
                ...prevItems,
                [category]: newItem
            };
            sessionStorage.setItem('items', JSON.stringify(updatedItems));
            return updatedItems;
        });
        navigate('/Configurator');

    };

    return (
        <div>
            <h1>Choose {category}</h1>{/*{ /^[aeiou]/i.test(category) ? 'an' : 'a' }*/}
            <div className="item-overview">
                <Grid container spacing={5}>
                    <Grid size={3} className="filter-bar">
                        <div className="filter-searchbar">
                            <h3>Refine result</h3>
                            <TextField variant="outlined"
                                       placeholder="Search..."
                                       value={searchTerm}
                                       onChange={(e) => setSearchTerm(e.target.value)}
                                       onKeyDown={handleKeyPress}
                                       slotProps={{
                                           input: {
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <SearchIcon
                                                           style={{ cursor: 'pointer' }}
                                                           onClick={handleSearch}
                                                       />
                                                   </InputAdornment>
                                               ),
                                           },
                                       }} />
                        </div>
                        {filterData.map((filter, index) => (
                            <Accordion key={index} elevation={0} className="filter">
                                <div className="filter-top">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        className="filter-title"
                                    >
                                        <h3>{filter.title}</h3>
                                    </AccordionSummary>
                                </div>
                                <div className="filter-content">
                                    <AccordionDetails>
                                        <FormGroup>
                                            {filter.options.map((option, index) => (
                                                <FormControlLabel key={index} control={<Checkbox value="value"/>} label={option.name}/>
                                            ))}
                                        </FormGroup>

                                    </AccordionDetails>
                                </div>

                            </Accordion>
                        ))}
                    </Grid>
                    <Grid size={8}>
                        <ListOfItems onSelect={onSelect}/>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default ItemOverview;