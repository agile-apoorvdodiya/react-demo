import { Server } from "http";
import { io } from "socket.io-client";

export const socket = io(`${process.env.REACT_APP_USER_MGMT_URL}`, {
  transports: ["websocket"],
  autoConnect: false,
});