import React, { useMemo } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { ApiRoutes } from "./routes";
import { ThemeProvider } from "@emotion/react";
import { getAppTheme } from "./theme";
import { useSelector } from "react-redux";
import { IRootState } from "./interfaces/api";
import { useInterceptors } from "./utils/interceptors";

function App() {
  const isDarkMode = useSelector<IRootState, boolean>(s => s?.common?.isDarkMode);
  useInterceptors()
  const theme = useMemo(() => getAppTheme(true), []);
  return (
    <ThemeProvider theme={getAppTheme}>
      <BrowserRouter>
        <ApiRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
