import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function RulesTableRow({ rule, handleEdit, handleDeleteClick, index }) {
  return (
      <TableRow key={rule.id}
                style={{
                    backgroundColor: index % 2 === 0 ? '#F5FBFD' : 'white',
                }}>
          <TableCell>{rule.name}</TableCell>
          <TableCell>{rule.description}</TableCell>
          <TableCell>{rule.priority}</TableCell>
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