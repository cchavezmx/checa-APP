import * as React from "react";
import {
  Typography,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Dialog,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function QrCodeModal({ qrCode, name }) {
  const qrRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadQR = () => {
    const canva = qrRef.current.querySelector("svg");
    const svg = new XMLSerializer().serializeToString(canva);
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    img.onload = () => {
      const ctx = canvas.getContext("2d");    
      ctx.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `${name}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        Ver QR
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            textAlign="center"
            data={qrCode}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Box ref={qrRef}>
              <QRCodeSVG
                value={qrCode}
                style={{ width: "300px", height: "300px", margin: "0 auto" }}
              />
            </Box>
            <small>{qrCode}</small>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => downloadQR()}>Descargar QR</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
