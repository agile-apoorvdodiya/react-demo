import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setUser } from "./redux/slices/auth";
import { AppRoutes } from "./routes/route";

function App() {
  const dispatch = useDispatch();
  dispatch(setUser());
  
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
