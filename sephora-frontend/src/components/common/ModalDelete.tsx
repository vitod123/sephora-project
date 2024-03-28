import { FC, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface Props {
  id: number;
  text: string;
  deleteFunc: (id: number) => void;
}

const ModalDelete: FC<Props> = ({ id, text, deleteFunc }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    handleClose();
    deleteFunc(id);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Видалить
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Видалення</DialogTitle>
        <DialogContent>
          <DialogContentText>Ви дійсно бажаєте видалити {text}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Скасувати
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Я так хочу
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalDelete;
