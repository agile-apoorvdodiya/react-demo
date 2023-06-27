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

export const Layout = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const userDetails = useSelector<IRootState, IUser>((s) => s.auth.user);

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
    </PageWrapper>
  );
};
