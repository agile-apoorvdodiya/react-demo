import "./App.css";
import { Login } from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { isUserLoggedIn } from "./helper/auth.service";
import { useEffect, useState } from "react";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    isUserLoggedIn().then((res) => {
      setLoginStatus(!!res);
    });
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {loginStatus ? (
            <Route path="/">
              <Route path="*" element={<Layout />} />
            </Route>
          ) : (
            <Route path="/">
              <Route path="*" element={<Login />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
