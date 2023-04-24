import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  User,
} from '../api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

function UsersTable() {
  const { data: users = [], isFetching, isError, error } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<GridRowId | null>(null);

  const handleEdit = (id: GridRowId, field: string, value: any) => {
    updateUser({ id: id as number, [field]: value });
  };

  const handleDelete = (id: GridRowId) => {
    setDeleteConfirmation(id);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(deleteConfirmation as number);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
      // onCellValueEditCommit: (params) =>
      //   handleEdit(params.id, params.field, params.value),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
      // onCellValueEditCommit: (params) =>
      //   handleEdit(params.id, params.field, params.value),
    },
    {
      field: 'favoriteIceCream',
      headerName: 'Favorite Ice Cream',
      width: 200,
      editable: true,
      // onCellValueEditCommit: (params) =>
      //   handleEdit(params.id, params.field, params.value),
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/edit/${params.id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(params.id)} color="error">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {isError && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          {(error as any)?.message || 'An error occurred while fetching users'}
        </p>
      )}
      <div style={{ height: 400, marginTop: 20, position: 'relative' }}>
        <DataGrid
          rows={users}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          loading={isFetching}
        />
        {(isFetching || isUpdating || isDeleting) && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              zIndex: 2,
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
      <Dialog
        open={!!deleteConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersTable;
