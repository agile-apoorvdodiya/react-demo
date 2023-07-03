import { useEffect } from "react";
import { AppModal } from "../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserById, putUser } from "../../redux/actions/user";
import { IRootState } from "../../interfaces/api";
import { Field, FieldProps, Form, Formik } from "formik";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { AppInput } from "../mui-forms";
import * as Yup from "yup";
export const AddEditUser = ({
  modalState,
  setModalState,
  userId,
  onModalClose,
}: any) => {
  const userDetails = useSelector<IRootState, any>((s) => s?.user?.userDetails);
  // const success = useSelector<IRootState, any>(s => s?.user?.success)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   userId && getUserDetails(userId);
  // }, [userId]);

  // const getUserDetails = (userId: string) => {
  //   dispatch(getUserById(userId))
  //     .then((res: any) => {
  //       console.log("user details ", res);
  //     })
  //     .catch((err: any) => {
  //       console.log("err ", err);
  //     });
  // };

  return (
    <AppModal
      open={modalState}
      setOpen={setModalState}
      headerText={modalState === "add" ? "Create user" : "Edit user"}
    >
      <Box
        sx={{
          py: 1,
        }}
      >
        <Formik
          initialValues={userId ? userId : {
            name: "",
            email: "",
            contact: "",
            admin: true,
            password: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            contact: Yup.string().required().length(10),
            // admin: Yup.bpp().required(),
            password: Yup.string().required(),
          })}
          onSubmit={(value: any) => {
            console.log(value);
            (
              (userId
                ? dispatch(putUser(userId?._id, value))
                : dispatch(createUser(value))) as any
            ).then((res: any) => {
              console.log("success", res);
              onModalClose({ refresh: true });
              setModalState(null);
            });
          }}
        >
          {/* {({ errors, touched, isSubmitting, setFieldValue}) => {
            return ( */}
              <Form>
                <Box
                  letterSpacing={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Field
                      id="Name"
                      name="name"
                      sx={{ my: 1 }}
                      type="text"
                      variant="outlined"
                      size="small"
                      label="Name"
                      component={(props: FieldProps) => <AppInput {...props} />}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Field
                      id="email"
                      name="email"
                      sx={{ my: 1 }}
                      type="email"
                      variant="outlined"
                      size="small"
                      label="Email"
                      component={(props: FieldProps) => <AppInput {...props} />}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Field
                      id="contact"
                      name="contact"
                      sx={{ my: 1 }}
                      type="text"
                      variant="outlined"
                      size="small"
                      label="Contact"
                      component={(props: FieldProps) => <AppInput {...props} />}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Field
                      id="password"
                      name="password"
                      sx={{ my: 1 }}
                      type="password"
                      variant="outlined"
                      size="small"
                      label="Password"
                      component={(props: FieldProps) => <AppInput {...props} />}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Field
                      id="admin"
                      name="admin"
                      sx={{ my: 1 }}
                      type="checkbox"
                      size="small"
                      label="Make user an admin"
                      component={({ form, field, ...props }: any) => (
                        <FormControlLabel
                          {...props}
                          {...field}
                          control={<Checkbox />}
                        />
                      )}
                    />
                  </Box>
                  <Button variant="outlined" type="submit">
                    Save
                  </Button>
                </Box>
              </Form>
            {/* );
          }} */}
        </Formik>
      </Box>
    </AppModal>
  );
};
