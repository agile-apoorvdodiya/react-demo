import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setUser } from "./redux/slices/auth";
import { AppRoutes } from "./routes/route";
import { useInterceptors } from "./utils/interceptors";

function App() {
  const dispatch = useDispatch();
  dispatch(setUser());
  useInterceptors();
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
