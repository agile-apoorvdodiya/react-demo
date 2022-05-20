import "./App.css";
import { Login } from "./pages/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { isUserLoggedIn } from "./helper/auth.service";
import React, { useEffect, useState } from "react";

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { loginStatus: false };
//     console.log('constructor');
//   }


//   componentDidMount() {
//     console.log(this.state.loginStatus);
//     console.log(123123);

//     isUserLoggedIn().then((res) => {
//       this.state.loginStatus = res;
//     });
//   }

//   componentDidUpdate() {
//     console.log("updateas");
//   }

//   render() {
//     return (
//       <div>
//         <BrowserRouter>
//           <Routes>
//             {this.state.loginStatus ? (
//               <Route>
//                 <Route
//                   path="*"
//                   element={
//                     <Layout
//                       handleLogout={(data) =>
//                         (this.state.LoginStatus = data.status)
//                       }
//                     />
//                   }
//                 />
//                 <Route path="*" element={<Navigate to="/users" replace />} />
//               </Route>
//             ) : (
//               <Route>
//                 <Route
//                   path="/login"
//                   element={
//                     <Login
//                       handleLogin={(data) =>
//                         (this.state.LoginStatus = data.status)
//                       }
//                     />
//                   }
//                 />
//                 <Route path="*" element={<Navigate to="/login" replace />} />
//               </Route>
//             )}
//           </Routes>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    console.log(loginStatus);
    console.log(123123);

    isUserLoggedIn().then((res) => {
      setLoginStatus(!!res);
    });
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {loginStatus ? (
            <Route>
              <Route
                path="*"
                element={
                  <Layout
                    handleLogout={(data) => setLoginStatus(data.status)}
                  />
                }
              />
              {/* <Route path="*" element={<Navigate to="/users" replace />} /> */}
            </Route>
          ) : (
            <Route>
              {/* <Route
                path="/login"
                element={
                  <Login handleLogin={(data) => setLoginStatus(data.status)} />
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} /> */}
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
