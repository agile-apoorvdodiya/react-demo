import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Confirm = forwardRef(
  (
    {
      title,
      description,
      confirmText,
      cancelText,
      showCancelButton,
      onDialogClose,
    }: any,
    ref: any
  ) => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<string>('');
    const onClose = () => {
      setOpen(false);
    };

    const onOpen = () => {
      setOpen(true);
    };
    const handleAction = (action: "confirm" | "dismiss") => {
      onDialogClose && onDialogClose({ action, id });
      onClose();
    };

    useImperativeHandle(ref, () => ({
      close: () => {
        onClose();
      },
      open: (id: string) => {
        id && setId(id)
        onOpen();
      },
    }));

    return (
      <>
        <Dialog
          open={open}
          // TransitionComponent={TransitionEvent}
          keepMounted
          onClose={handleAction}
          aria-describedby="alert-dialog-slide-description"
        >
          {id}
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {showCancelButton && (
              <Button onClick={() => handleAction("dismiss")}>
                {cancelText || "Cancel"}
              </Button>
            )}
            <Button onClick={() => handleAction("confirm")}>
              {confirmText || "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
