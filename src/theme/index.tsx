import { SimplePaletteColorOptions, createTheme } from "@mui/material";

export const getAppTheme = (isDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#f00",
        "500": "#193147",
        light: "#0384fc",
        dark: "#0f0",
      } as SimplePaletteColorOptions
    },
  });
};
