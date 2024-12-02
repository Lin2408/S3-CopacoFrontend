import Grid from "@mui/material/Grid2";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Autocomplete, Checkbox, FormControlLabel,
    FormGroup,
    InputAdornment,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useEffect, useState} from "react";
import ListOfDetailedItems from "../components/itemDetailedOverview/ListOfDetailedItems.jsx";
import "../Pages/CSS/DetailedItemOverview.css"
import {fetchCategories} from "../Apis/get-item-categories.service.js";


const filterData = [
    {title: "Brand", options: [{name: "Intel"},{name: "AMD"}]},
    {title: "Cores", options: [{name: "4"},{name: "6"},{name: "8"},{name: "12"},{name: "16"}]},

]

function DetailedItemsOverview() {
    const [searchTerm, setSearchTerm] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [categorySelection, setCategorySelection] = useState(null);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                if(data.length === 0){
                    console.log("no data")
                    setCategoryOptions(['Processoren','VideoKaarten','Moederborden','Geheugenmodules'])
                    }else{
                    setCategorySelection(data.data.categories.find(option => option.value === 'Processoren'));
                    setCategoryOptions(data.data.categories);
                    }
                } catch (error) {
                console.error("Error fetching categories:", error);
                }
        };
        getCategories();
    }, []);


    const handleSearch = () => {
        console.log('Search for:', searchTerm);
        setSearch(searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const handleCategoryChange = (event, value) => {
        if(!value){
            return;
        }
        setCategorySelection(value);
        setSearchTerm('');
        setSearch('');
    }
    return (
    <div>
        <h1>{categorySelection ? categorySelection.value : "Item overview"}</h1>
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
                                                       style={{cursor: 'pointer'}}
                                                       onClick={handleSearch}
                                                   />
                                               </InputAdornment>
                                           ),
                                       },
                                   }}/>
                    </div>
                    <Accordion elevation={0} className="filter">
                        <div className="filter-top">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                className="filter-title"
                            >
                                <h3>Category</h3>
                            </AccordionSummary>
                        </div>
                        <div className="filter-content">
                            <AccordionDetails>
                                <Autocomplete
                                    options={categoryOptions}
                                    getOptionLabel={(option) => option.value}
                                    onChange={handleCategoryChange}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                                    value={categorySelection ? categorySelection : null}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined"  placeholder="Select category" />
                                    )}
                                    sx={{mt: 1 }}
                                />

                            </AccordionDetails>
                        </div>

                    </Accordion>
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
                                            <FormControlLabel key={index} control={<Checkbox value="value"/>}
                                                              label={option.name}/>
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </div>

                        </Accordion>
                    ))}
                </Grid>
                <Grid size={8}>
                    <ListOfDetailedItems selectedCategory={categorySelection} search={search}/>
                </Grid>
            </Grid>
        </div>

    </div>
)
}

export default DetailedItemsOverview;