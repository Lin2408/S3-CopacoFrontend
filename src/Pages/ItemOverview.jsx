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

const filterData = [
    {title: "Brand", options: [{name: "Intel"},{name: "AMD"}]},
    {title: "Cores", options: [{name: "4"},{name: "6"},{name: "8"},{name: "12"},{name: "16"}]},

]


function ItemOverview() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Search for:', searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <h1>Choose a CPU</h1>
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
                        <ListOfItems/>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default ItemOverview;