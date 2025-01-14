import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function RulesTableRow({ rule, handleEdit, handleDeleteClick, index }) {
  return (
      <TableRow key={rule.id}
                style={{
                    backgroundColor: index % 2 === 1 ? '#f3faff' : 'white',
                }}>
          <TableCell>{rule.nameFrom !== null? rule.nameFrom : "Multiple values"}</TableCell>
          <TableCell>{rule.categoryFrom.value}</TableCell>
          <TableCell>{rule.categoryTo.value}</TableCell>
          <TableCell>{rule.unit === null ? 'N/A' : rule.unit}</TableCell>
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