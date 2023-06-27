import { TextField } from "@mui/material";
import { FieldProps } from "formik";

export const AppInput = ({ form,   field, ...props }: FieldProps) => {
  return (
    <TextField
    error={Boolean(form?.errors[field?.name])}
      {...field}
      {...props}
    />
  );
};
