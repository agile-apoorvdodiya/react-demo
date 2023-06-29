import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";

export const AppModal = ({ children, open, setOpen, headerText }: any) => {
  return (
    <Modal open={open}>
      <Paper
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {headerText || "Text in a modal"}
          </Typography>
          <IconButton onClick={() => setOpen(null)}>
            <Close />
          </IconButton>
        </Box>
        {children}
      </Paper>
    </Modal>
  );
};
