import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/api";
import { IUser } from "../../interfaces/user";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AppInput } from "../mui-forms";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
export const RoomWindow = (props: any) => {
  const userDetails = useSelector<IRootState, IUser>((s) => s.auth.user);
  const [messages, setMessages] = useState<any[]>([]);
  const messageBottom = useRef<any>();

  useEffect(() => {
    if (socket) {
      socket.emit("getRoomMessages", {
        room: props.room?._id,
      });
      socket.on("roomMessageHistory", (data) => {
        setMessages(data || []);
      });

      return () => {
        socket.off("roomMessageHistory");
      };
    }
  }, [props.room, userDetails]);

  useEffect(() => {
    socket.on("roomMessage", (data) => {
      const updatedMessages = [];
      data.sender = "";
      updatedMessages.push(...messages, data);
      setMessages(updatedMessages);
    });
    window.scrollTo({
      top: messageBottom.current?.offsetTop,
      behavior: "smooth",
    });
    return () => {
      socket.off("roomMessage");
    };
  }, [messages]);

  return (
    <>
      <Box sx={{ height: "100U%", width: "100%", bgcolor: "darkcyan", p: 2, borderRadius: 1 }}>
        <Typography>{props?.room?.name}</Typography>
        <Box
          sx={{
            py: 2,
            height: "50vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            scrollbarWidth: 1,
          }}
        >
          {messages.length ? (
            <span ref={messageBottom}>
              {messages.map((m: any) => {
                return (
                  <Typography
                    key={m._id}
                    sx={{
                      alignSelf:
                        userDetails?._id === m?.sender?._id ? "end" : "start",
                      borderRadius: 3.5,
                      bgcolor: "darkslategray",
                      py: 0.5,
                      px: 1.5,
                      mb: 1,
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        fontStyle: "italic",
                        marginBottom: "-4px",
                      }}
                    >
                      f{m?.sender?.name}
                    </div>
                    <div>{m.message}</div>
                  </Typography>
                );
              })}
            </span>
          ) : (
            <Box>
              <Typography>No messages</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          {props.room ? (
            <Formik
              initialValues={{
                message: "",
              }}
              onSubmit={(value, form) => {
                socket.emit("messageToRoom", {
                  room: props?.room?._id,
                  message: value?.message || "",
                  sender: userDetails?._id,
                  name: userDetails?.name,
                });
                form.resetForm();
                const updatedMessages = [
                  ...messages,
                  {
                    sender: userDetails,
                    receiver: props?.room?.id,
                    ...value,
                    _id: Date.now(),
                  },
                ];
                setMessages(updatedMessages)
              }}
              validationSchema={Yup.object().shape({
                message: Yup.string().required(),
              })}
            >
              <Form action="">
                <Field
                  id="message"
                  name="message"
                  sx={{
                    px: 1,
                    py: 0.5,
                    bgcolor: "darkslategray",
                    flexGrow: 1,
                  }}
                  type="text"
                  variant="standard"
                  size="small"
                  placeholder="Send message"
                  component={(props: FieldProps) => <AppInput {...props} />}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: "darkslategray", color: "white", ml: 2 }}
                  type="submit"
                >
                  Send
                </Button>
              </Form>
              {/* {(formik: any) => {
              return (
              );
            }} */}
            </Formik>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};
