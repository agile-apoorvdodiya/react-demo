import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { PageWrapper } from "../../components/common/page-wrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/api";
import { socket } from "../../socket";
import { IUser } from "../../interfaces/user";
import { ChatWindow } from "../../components/chat/chat-window";
import { RoomWindow } from "../../components/chat/room-window";

export const Chat = () => {
  const userDetails = useSelector<IRootState, IUser>((s) => s?.auth?.user);
  const isSocketConnected = useSelector<IRootState, boolean>(
    (s) => s.socket.status
  );

  useEffect(() => {
    socket.on("userList", (data: any) => {
      data?.length && setChats(data);
    });

    socket.emit("getAllRooms", { userId: userDetails?._id });

    socket.on("roomsList", (data: any) => {
      data?.length && setRooms(data);
    });

    return () => {
      socket.off("userList");
      socket.off("getAllRooms");
    };
  }, [isSocketConnected]);

  const [chats, setChats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  useEffect(() => {
    if ((chats.length, rooms.length)) {
      setActiveChat(chats[0]);
    } else if (rooms.length) {
      setActiveChat(rooms[0]);
    } else {
      setActiveChat(null);
    }
  }, [chats, rooms]);

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item={true} xs={4} p={1}>
            <Accordion sx={{ bgcolor: "darkcyan" }}>
              <AccordionSummary>
                <Typography
                  sx={{
                    textAlign: "center",
                    p: 0,
                    width: "100%",
                  }}
                >
                  Chat
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ height: "35vh", overflowY: "auto" }}>
                {chats?.length ? (
                  chats.map((c: any, index: number) => (
                    <Button
                      onClick={() => setActiveChat(c)}
                      key={c.socketId + index}
                      sx={{
                        my: 1,
                        width: "100%",
                        backgroundColor: "darkslategray",
                        display: "flex",
                      }}
                    >
                      <Typography>{c.name}</Typography>
                    </Button>
                  ))
                ) : (
                  <Box
                    sx={{
                      backgroundColor: "darkslategray",
                      minHeight: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography>No one to chat here</Typography>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ bgcolor: "darkcyan" }}>
              <AccordionSummary>
                <Typography
                  sx={{
                    textAlign: "center",
                    p: 0,
                    width: "100%",
                  }}
                >
                  Rooms
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ height: "35vh", overflowY: "auto" }}>
                {rooms?.length ? (
                  rooms.map((r: any, index: number) => (
                    <Button
                      onClick={() => setActiveChat(r)}
                      key={r.socketId + index}
                      sx={{
                        my: 1,
                        width: "100%",
                        backgroundColor: "darkslategray",
                        display: "flex",
                      }}
                    >
                      <Typography>{r.name}</Typography>
                    </Button>
                  ))
                ) : (
                  <Box
                    sx={{
                      backgroundColor: "darkslategray",
                      minHeight: "100px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography>No rooms available</Typography>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item={true} xs={8} p={1}>
            {activeChat?.members ? (
              <RoomWindow room={activeChat} />
            ) : (
              <ChatWindow chatUser={activeChat} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
