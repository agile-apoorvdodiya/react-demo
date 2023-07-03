import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../../redux/actions/user";
import { IRootState } from "../../interfaces/api";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { AddEditUser } from "../../components/user/add-edit";
import { Confirm } from "../../components/common/confirm";
import { CheckCircle, Cancel } from "@mui/icons-material";
export const User = () => {
  const users: any[] = useSelector<IRootState, any>((s) => s?.user?.userList);
  const [modal, setModal] = useState<null | string>(null);
  const [editUser, setEditUser] = useState<any>(null);
  const dispatch = useDispatch();
  const dialogRef = useRef<any>();

  const fetchUsers = () => {
    dispatch(getUserList());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleModalClose = (data: any) => {
    console.log(data);
    if (data?.refresh) fetchUsers();
  };

  const handleDeleteUser = (data: any) => {
    console.log(data);
    if (data?.action === "confirm")
      dispatch(deleteUser(data?.id))
        ?.then((res: any) => {
          fetchUsers();
          console.log("delete res ", res);
        })
        ?.catch((err: any) => {
          console.log("err res", err);
        });
  };

  const onAddOrEdit = (user: string | null = null) => {
    setEditUser(user);
    setModal(user ? "edit" : "add");
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Users</Typography>
          <Button variant="outlined" onClick={() => onAddOrEdit()}>
            Add
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((row: any) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.admin ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : (
                      <Cancel color="error" fontSize="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={() => onAddOrEdit(row)}>
                        <Edit color="info" sx={{ mx: 1 }} fontSize="small"></Edit>
                      </IconButton>
                      <IconButton
                        onClick={() => dialogRef?.current?.open(row?._id)}
                      >
                        <Delete color="error" sx={{ mx: 1 }} fontSize="small"></Delete>
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <AddEditUser
        modalState={modal}
        setModalState={setModal}
        userId={editUser}
        open={false}
        onModalClose={(data: any) => handleModalClose(data)}
      />
      <Confirm
        title="Are you sure you want to delete this account"
        open={false}
        ref={dialogRef}
        onDialogClose={(data: any) => handleDeleteUser(data)}
        showCancelButton={true}
      />
    </div>
  );
};
