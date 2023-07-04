import { useEffect } from "react";
import { AppModal } from "../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { createForm, putForm } from "../../redux/actions/form";
import { IRootState } from "../../interfaces/api";
import { Field, FieldProps, Form, Formik, useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { AppInput } from "../mui-forms";
import * as Yup from "yup";
import { ArrangeForm } from "./arrange-form";
export const AddEditForm = ({
  modalState,
  setModalState,
  formDetails,
  onModalClose,
}: any) => {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      title: "",
      form: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      form: Yup.array(),
    }),
    onSubmit: (value: any) => {
      (
        (formDetails
          ? dispatch(putForm(formDetails?._id, value))
          : dispatch(createForm(value))) as any
      ).then((res: any) => {
        console.log("success", res);
        onModalClose({ refresh: true });
        setModalState(null);
      });
    },
  });
  useEffect(() => {
    if (formDetails) form.setValues(formDetails);
    else form.resetForm();
    console.log("updated form values", form?.values);
  }, [formDetails]);

  return (
    <AppModal
      size="lg"
      open={modalState}
      setOpen={setModalState}
      headerText={modalState === "add" ? "Create form" : "Edit form"}
    >
      <Box
        sx={{
          py: 1,
        }}
      >
        <>
          <form onSubmit={form.handleSubmit}>
            <Box
              letterSpacing={1}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="title"
                  name="title"
                  sx={{ my: 1 }}
                  type="text"
                  variant="outlined"
                  size="small"
                  label="Title"
                  onChange={form.handleChange}
                  value={form?.values?.title}
                />
              </Box>
              <ArrangeForm
                selectedList={formDetails?.form || []}
                onListUpdate={form.setFieldValue}
              />
              <Button variant="outlined" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </>
      </Box>
    </AppModal>
  );
};
