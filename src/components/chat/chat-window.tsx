import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/api";
import { IUser } from "../../interfaces/user";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AppInput } from "../mui-forms";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
export const ChatWindow = (props: any) => {
  const userDetails = useSelector<IRootState, IUser>((s) => s.auth.user);
  const [messages, setMessages] = useState<any[]>([]);
  const messageBottom = useRef<any>();

  useEffect(() => {
    if (socket) {
      socket.emit("getMessages", {
        from: props?.chatUser?.id,
        to: userDetails._id,
      });
      socket.on("messageHistory", (data) => {
        setMessages(data || []);
      });

      return () => {
        socket.off("messageHistory");
      };
    }
  }, [props.chatUser, userDetails]);

  useEffect(() => {
    socket.on("privateMessage", (data) => {
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
      socket.off("privateMessage");
    };
  }, [messages]);

  return (
    <>
      <Box
        sx={{
          height: "100U%",
          width: "100%",
          bgcolor: "darkcyan",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography>{props?.chatUser?.name}</Typography>
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
                        userDetails?._id === m?.sender ? "end" : "start",
                      borderRadius: 3.5,
                      bgcolor: "darkslategray",
                      py: 0.5,
                      px: 1.5,
                      mb: 1,
                      width: "fit-content",
                    }}
                  >
                    {m.message}
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
          {props.chatUser ? (
            <Formik
              initialValues={{
                message: "",
              }}
              onSubmit={(value, form) => {
                socket.emit("messageTo", {
                  to: props?.chatUser?.socketId,
                  message: value?.message || "",
                  receiver: props.chatUser.id,
                  sender: userDetails?._id,
                });
                form.resetForm();
                const updatedMessages = [
                  ...messages,
                  {
                    sender: "self",
                    receiver: props?.chatUser?.id,
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
                    mt: 2,
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
