import { createTheme } from "@mui/material";

export const getAppTheme = (isDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });
};
