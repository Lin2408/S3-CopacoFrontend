import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function RulesTableRow({ rule, handleEdit, handleDeleteClick, index }) {
  return (
      <TableRow key={rule.id}
                style={{
                    backgroundColor: index % 2 === 1 ? '#F5FBFD' : 'white',
                }}>
          <TableCell>{rule.nameFrom}</TableCell>
          <TableCell>{rule.categoryFrom.value}</TableCell>
          <TableCell>{rule.categoryTo.value}</TableCell>
          <TableCell>{rule.unit === 'unit' ? 'N/A' : rule.unit}</TableCell>
          <TableCell>
              <IconButton
                  onClick={() => handleEdit(rule.id)}
              >
                  <EditIcon />
              </IconButton>
              <IconButton
                  color="error"
                  onClick={() => handleDeleteClick(rule.id)}
              >
                  <DeleteIcon />
              </IconButton>
          </TableCell>
      </TableRow>
  );
}
export default RulesTableRow;