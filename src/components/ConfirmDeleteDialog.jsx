import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

function ConfirmDeleteDialog({ dialogOpen, handleCancelDelete, handleConfirmDelete }) {
  return (
      <Dialog
          open={dialogOpen}
          onClose={handleCancelDelete}
          aria-labelledby="confirm-delete-dialog-title"
      >
          <DialogTitle id="confirm-delete-dialog-title">
              Confirm Deletion
          </DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Are you sure you want to delete this rule? This action cannot be undone.
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                  Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error">
                  Delete
              </Button>
          </DialogActions>
      </Dialog>
  );
}
export default ConfirmDeleteDialog;