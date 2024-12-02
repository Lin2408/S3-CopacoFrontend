import {Box, Typography} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import * as React from "react";

function NoSearchResults() {
  return (
      <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 8,
              textAlign: 'center',
              padding: 2,
          }}
      >
          <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>
              No Items Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Sorry, we couldn't find any items matching your search. Try again with different keywords.
          </Typography>
      </Box>
  );
}
export default NoSearchResults;