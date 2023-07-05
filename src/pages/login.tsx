import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../interfaces/api";
import { IUserLogin } from "../interfaces/user";
import { PageWrapper } from "../components/common/page-wrapper";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { Field, Formik, Form, FieldProps } from "formik";
import * as Yup from "yup";
import { AppInput } from "../components/mui-forms";
import { attemptLogin } from "../redux/actions/auth";

export const Login = () => {
  const isLoggedIn = useSelector<IRootState>((s) => s?.auth?.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/users", { replace: false });
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();
  return (
    <PageWrapper>
      <Container maxWidth="md" className="h-100">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required().email(),
              password: Yup.string().required(),
            })}
            onSubmit={(form) => {
              (dispatch(attemptLogin(form)) as any).then((res: any) => {
              }).catch((err: any) => {

              });
            }}
          >
            <Form action="">
              <Card elevation={2} sx={{ backgroundColor: "darkslategray" }}>
                <CardHeader title="Login">A</CardHeader>
                <CardContent>
                  <Box
                    letterSpacing={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Field
                        id="email"
                        name="email"
                        sx={{ my: 1 }}
                        type="text"
                        variant="outlined"
                        size="small"
                        label="Email"
                        component={(props: FieldProps) => (
                          <AppInput {...props} />
                        )}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Field
                        id="password"
                        name="password"
                        sx={{ my: 1 }}
                        type="password"
                        variant="outlined"
                        size="small"
                        label="Password"
                        component={(props: FieldProps) => (
                          <AppInput {...props} />
                        )}
                      />
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="small"
                  >
                    Login
                  </Button>
                </CardActions>
              </Card>
            </Form>
          </Formik>
        </Box>
      </Container>
    </PageWrapper>
  );
};
