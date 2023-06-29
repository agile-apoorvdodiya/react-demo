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
    console.log(data)
    if (data?.refresh) getUserList();
  };

  const handleDeleteUser = (data: any) => {
    // const handleDeleteUser = (action: "confirm" | "dismiss", id: string) => {
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

  const onAddOrEdit = (id: string | null = null) => {
    setEditUser(id);
    setModal(id ? "edit" : "add");
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
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={() => onAddOrEdit(row?._id)}>
                        <Edit sx={{ mx: 1 }} fontSize="small"></Edit>
                      </IconButton>
                      <IconButton
                        onClick={() => dialogRef?.current?.open(row?._id)}
                      >
                        <Delete sx={{ mx: 1 }} fontSize="small"></Delete>
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
        onModalClose={(data: any) => handleModalClose(data)}
      />
      <Confirm
        title="Are you sure you want to delete this account"
        ref={dialogRef}
        onDialogClose={(data: any) => handleDeleteUser(data)}
        showCancelButton={true}
      />
    </div>
  );
};
