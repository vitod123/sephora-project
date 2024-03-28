import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./PasswordRecovery.scss";
import textFieldStyle from '../../../common/textFieldStyle';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function PasswordRecovery() {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { t } = useTranslation();

  return (
    <Stack className="passwordRecovery" alignItems='center'>
      <Button
        id="forgotPassword"
        onClick={handleOpen}
        sx={{ marginBottom:10 }}
      >
        {t("forgotPassword")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" className="text" variant="h5" component="h2" textAlign={"center"}>
            {t("passwordRecovery")}
          </Typography>
          <Typography id="modal-modal-description" className="text" sx={{ mt: 4, mb: 2, fontSize: 16, maxWidth: '490px'}}>
            {t("passwordRecoveryText")}
          </Typography>
          <FormControl
            sx={{ ...textFieldStyle, m: 0, mb: 2.5 }}
            variant="outlined"
            fullWidth
          >
            <TextField
              margin="normal"
              // required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              // onChange={handleChange}
              // value={values.email}
              // error={touched.email && !!errors.email}
              // helperText={touched.email && errors.email}
            />
          </FormControl>
          <Button
            id="send"
            onClick={handleOpen}
            fullWidth
            sx={{marginBottom:'10px'}}
          >
            {t("send")}
          </Button>
        </Box>
      </Modal>
    </Stack>
  );
}
