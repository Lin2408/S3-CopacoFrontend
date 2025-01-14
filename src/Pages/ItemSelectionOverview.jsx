import  ListOfItemSelections  from '../components/configuratorOverview/ListOfItemSelections.jsx';
import Grid from "@mui/material/Grid2";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {fetchManufacturerFilter} from "../Apis/Get-ManufacturerFilter.js";

function load(key) {
    const items = sessionStorage.getItem(key);
    return items != null ? JSON.parse(items) : [];
}

function ItemSelectionOverview() {
    const [searchTerm, setSearchTerm] = useState([]);
    const [items] = useState(() => load('items'));
    const navigate = useNavigate();
    const { state } = useLocation();
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);
    const category = state?.category || '';
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log('Category:', category);
    const handleSearch = () => {
        console.log('Search for:', searchTerm);
        setSearch(searchTerm);
    };
    useEffect(() => {
        console.log(category?.id);
        const getManufacturerFilter = async () => {
            fetchManufacturerFilter(category.id).then(data => {
                const filterItems = Array.isArray(data.data.filterItem)
                    ? data.data.filterItem
                    : [data.data.filterItem];
                setFilterData(filterItems);
            }).catch(error => {
                console.error("Error fetching manufacturer filter:", error);
            });
        }
        getManufacturerFilter();
    }, [category]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const onSelect = (part) => {
        const newItem = {part};
        const updatedItems = {
            ...items,
            [category.value]: newItem
        };
        console.log(updatedItems)
        sessionStorage.setItem('items', JSON.stringify(updatedItems));
        navigate('/Configurator');
    };
    const handleCheckboxChange = (event, option) => {
        if (event.target.checked) {
            setSelectedManufacturers((prev) => [...prev, option]);
        } else {
            setSelectedManufacturers((prev) => prev.filter(manufacturer => manufacturer !== option));
        }
    };
    return (
        <div>
            <h1>Choose {category.value}</h1>{/*{ /^[aeiou]/i.test(category) ? 'an' : 'a' }*/}
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
                                                <FormControlLabel key={index} control={<Checkbox disabled={loading} onChange={(e) => handleCheckboxChange(e, option)} value="value"/>} label={option}/>
                                            ))}
                                        </FormGroup>

                                    </AccordionDetails>
                                </div>

                            </Accordion>
                        ))}
                    </Grid>
                    <Grid size={8}>
                        <ListOfItemSelections onSelect={onSelect} category={category} search={search} selectedManufacturers={selectedManufacturers} loading={loading} setLoading={setLoading}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ItemSelectionOverview;