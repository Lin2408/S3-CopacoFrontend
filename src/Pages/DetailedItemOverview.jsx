import Grid from "@mui/material/Grid2";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Checkbox, FormControlLabel,
    FormGroup,
    InputAdornment, Radio, RadioGroup,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";
import ListOfDetailedItems from "../components/ListOfDetailedItems.jsx";
import "../Pages/CSS/DetailedItemOverview.css"


const filterData = [
    {title: "Brand", options: [{name: "Intel"},{name: "AMD"}]},
    {title: "Cores", options: [{name: "4"},{name: "6"},{name: "8"},{name: "12"},{name: "16"}]},

]

function DetailedItemOverview() {
    const [searchTerm, setSearchTerm] = useState([]);
    const categories = ['CPU', 'Video Card', 'Memory', 'Storage', 'Motherboard', 'Powersupply', 'Case', 'Cooling'];
    const [categorySelection, setCategorySelection] = useState("CPU");


    const handleSearch = () => {
        console.log('Search for:', searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const handleCategoryChange = (event) => {
        setCategorySelection(event.target.value);
    }
    return (
    <div>
        <h1>{categorySelection}</h1>
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
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={categorySelection}
                                    name="radio-buttons-group"
                                >
                                    {categories.map((category, index) => (
                                        <FormControlLabel key={index} value={category} control={<Radio onChange={handleCategoryChange}/>} label={category}/>
                                    ))}
                                </RadioGroup>

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
                    <ListOfDetailedItems />
                </Grid>
            </Grid>
        </div>

    </div>
)
}

export default DetailedItemOverview;