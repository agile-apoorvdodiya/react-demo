import { Outlet } from "react-router-dom";
import { css } from "../constants/classes";
import { Header } from "./header";

export const Layout = (props) => {
  return (
    <div className={css.LAYOUT_WRAPPER}>
      <Header />
      <div className="mx-10 my-2">
        <Outlet />
      </div>
    </div>
  );
};
