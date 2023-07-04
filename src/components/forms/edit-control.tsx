import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useFormik } from "formik";
import { AppModal } from "../common/modal";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

export const EditControl = ({
  modalState,
  setModalState,
  controlDetails,
  onModalClose,
}: any) => {
  const [control, setControl] = useState<any | null>(null);
  const [id, setId] = useState(null);

  // remove
  // useImperativeHandle(ref, () => ({
  //   open: (control, id) => {
  //     setControl(control);
  //     controlForm.setValues(control);
  //     setId(id);
  //     modal.current.open();
  //   },
  // }));
  const modal = useRef();
  const form = useFormik({
    initialValues: {
      label: "",
      placeholder: "",
      controls: [] as any[],
      type: "",
    },
    onSubmit: (value) => {
      onModalClose({
        ...control,
        ...value,
        name: `${Date.now()}-${control?.type}`,
      });
      console.log("works",id, {
        ...control,
        ...value,
        name: `${Date.now()}-${control?.type}`,
      });
      setModalState(null);
    },
  });
  useEffect(() => {
    console.log("controlDetails", controlDetails);
    controlDetails && form.setValues(controlDetails);
  }, [controlDetails]);

  const deleteControl = (index: any) => {
    const updatedControls = [...form.values.controls];
    updatedControls.splice(index, 1);
    form.setFieldValue("controls", updatedControls);
  };
  const addControl = () => {
    const updatedControls: any = form.values.controls;
    updatedControls.push({
      label: "",
      value: "",
    });
    form.setFieldValue("controls", updatedControls);
  };
  return (
    <AppModal
      open={modalState}
      setOpen={setModalState}
      headerText={modalState === "add" ? "Create control" : "Edit control"}
    >
      <Grid container>
        <Grid item={true} sm={12}>
          <form onSubmit={form.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
              TYPE: {form.values?.type?.toUpperCase() || "-"}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ mb: 1 }}
                variant="outlined"
                name="label"
                label="Display label"
                value={form.values.label}
                onChange={form.handleChange}
              />
            </Box>
            {!["checkbox", "radio"].includes(form.values?.type) ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  sx={{ mb: 1 }}
                  variant="outlined"
                  name="placeholder"
                  label="Placeholder"
                  value={form.values.placeholder}
                  onChange={form.handleChange}
                />
              </Box>
            ) : (
              <Grid container>
                <Grid
                  item={true}
                  sm={6}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  OPTIONS
                </Grid>
                <Grid item={true} sm={6}>
                  <IconButton
                    sx={{ float: "right" }}
                    onClick={addControl}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Grid>
                {form?.values?.controls?.map((c: any, index: any) => (
                  <>
                    <Grid item={true} sm={6}>
                      <TextField
                        label="Label"
                        type="text"
                        name={`controls[${index}.label]`}
                        onChange={form.handleChange}
                        value={form.values.controls[index]?.label}
                      />
                    </Grid>
                    <Grid item={true} sm={6}>
                      <TextField
                        label="Value"
                        type="text"
                        name={`controls[${index}].value`}
                        onChange={form.handleChange}
                        value={form.values.controls[index]?.value}
                      />
                    </Grid>
                  </>
                ))}
              </Grid>
            )}
            <Button sx={{ width: "100%" }} variant="outlined" type="submit">
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </AppModal>
  );
};
