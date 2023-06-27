import { Box, Container, Paper, colors } from "@mui/material";
import { isNumber } from "util";

export const PageWrapper = ({ children, dashboardPage }: any) => {
  return (
    <Paper
      sx={{
        height: dashboardPage ? "calc(100vh - 48px)" : "100vh",
        borderRadius: 0,
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: "background.paper",
        color: "text.primary",
        paddingTop: dashboardPage ? "48px": "",
        // padding: !padding && padding !== 0 ? '10px' : padding
        // bgcolor: "primary.dark"
      }}
    >
      {children}
    </Paper>
  );
};
