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
import { deleteForm, getFormsList } from "../../redux/actions/form";
import { IRootState } from "../../interfaces/api";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { Confirm } from "../../components/common/confirm";
import { AddEditForm } from "../../components/forms/add-edit";

export const Forms = () => {
  const forms: any[] = useSelector<IRootState, any>((s) => s?.form?.formList);
  const [modal, setModal] = useState<null | string>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const dispatch = useDispatch();
  const dialogRef = useRef<any>();

  const fetchForms = () => {
    dispatch(getFormsList());
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleModalClose = (data: any) => {
    console.log(data);
    if (data?.refresh) fetchForms();
  };

  const handleDeleteForm = (data: any) => {
    console.log(data);
    if (data?.action === "confirm")
      dispatch(deleteForm(data?.id))
        ?.then((res: any) => {
          fetchForms();
          console.log("delete res ", res);
        })
        ?.catch((err: any) => {
          console.log("err res", err);
        });
  };

  const onAddOrEdit = (form: string | null = null) => {
    console.log('edit ', form)
    setEditForm(form);
    setModal(form ? "edit" : "add");
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Forms</Typography>
          <Button variant="outlined" onClick={() => onAddOrEdit()}>
            Add
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Submission Link</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms?.map((row: any) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row._id}</TableCell>
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
      <AddEditForm
        modalState={modal}
        setModalState={setModal}
        formDetails={editForm}
        open={false}
        onModalClose={(data: any) => handleModalClose(data)}
      />
      <Confirm
        title="Are you sure you want to delete this form"
        open={false}
        ref={dialogRef}
        onDialogClose={(data: any) => handleDeleteForm(data)}
        showCancelButton={true}
      />
    </div>
  );
};
