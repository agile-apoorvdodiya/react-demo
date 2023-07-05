import { Outlet } from "react-router-dom";
import { IProps } from "../../interfaces/common";
import { Footer } from "./footer";
import { Header } from "./header";
import { PageWrapper } from "../common/page-wrapper";
import { socket } from "./../../socket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../redux/slices/socket";
import { IRootState } from "../../interfaces/api";
import { IUser } from "../../interfaces/user";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { setSnackBar } from "../../redux/slices/common";
import { green } from "@mui/material/colors";

export const Layout = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const userDetails = useSelector<IRootState, IUser>((s) => s.auth.user);
  const snackBar: any = useSelector<IRootState>((s) => s?.common?.snackBar);

  useEffect(() => {
    if (userDetails?.name) {
      socket.connect();
      socket.on("connect", () => {
        // alert('you re connected to socket')
        dispatch(setStatus({ status: true }));
        socket.emit("setStatus", {
          id: userDetails._id,
          name: userDetails.name,
        });
      });
      socket.on("disconnect", () => {
        dispatch(setStatus({ status: true }));
      });
      window.addEventListener("beforeunload", () => {
        // alert('unload happens')        console.log("before unload");
        // socket.disconnect();
      });
      // window.onbeforeunload = () => alert('stop')
      window.addEventListener("unload", () => {
        process.exit(0);
        // alert('unload happens')
        // socket.disconnect();
        process.exit(0);
      });
    }

    return () => {
      // socket.off("connect");
      // socket.off("disconnect");
      // socket.disconnect()
    };
  }, []);

  useEffect(() => {
    window.addEventListener("unload", () => alert("123"));
    return () => {
      if (socket) {
        socket.disconnect();
        // alert('disconnected ')
      }
    };
  }, []);

  return (
    <PageWrapper>
      <div>
        <Header />
      </div>
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      <Snackbar
        {...(snackBar?.timeout ? { autoHideDuration: 5000 } : {})}
        onClose={() =>
          dispatch(
            setSnackBar({
              open: false,
            })
          )
        }
        open={snackBar?.open}
        message={snackBar?.message || "no message"}
        action={
          <IconButton
            onClick={() =>
              dispatch(
                setSnackBar({
                  open: false,
                })
              )
            }
          >
            <Close></Close>
          </IconButton>
        }
      />
      {/* <Snackbar
        {...(snackBar?.timeout ? { autoHideDuration: 3000 } : {})}
        onClose={() =>
          dispatch(
            setSnackBar({
              open: false,
            })
          )
        }
        open={snackBar?.open}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackBar?.message}
        </Alert>
      </Snackbar> */}
    </PageWrapper>
  );
};
