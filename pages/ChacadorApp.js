import { useState, useLayoutEffect, useRef, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { attendanceRegister } from "../components/context";
import { QrReader } from "react-qr-reader";

export default function ChecadorAPP({ playSuccess }) {
  const [data, setData] = useState({
    name: "Esperando código QR",
    color: "#000000",
  });
  const [hours, setHours] = useState(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  const [qr, setQr] = useState({ text: "" });
  const webcamRef = useRef(null);

  const setRegister = useCallback(async (qr) => {
    try {
      playSuccess();
      const data = await attendanceRegister(qr);
      console.log(data);
      setData({
        name: data,
        color: "#4BB543",
      });
    } catch (err) {
      console.error(err);
      setData({
        name: "Código QR no válido",
        color: "#FF0000",
      });
    }

    setTimeout(() => {
      setQr({ text: "" });
      setData({
        name: "Esperando código QR",
        color: "#000000",
      });
    }, 900);
  }, [playSuccess]);


  useEffect(() => {
    if (!qr.text) return;
    setRegister(qr.text);
  }, [qr?.text, setRegister]);


  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setHours(dayjs().format("DD/MM/YYYY HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const getMedia = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = webcamRef.current;
        console.log(video);
      } catch (err) {
        console.error(err);
      }
    };

    getMedia();
  }, []);

  return (
    <div className="App mt-3">
      <div className="qr-panel">
        <div className="reloj">
          <h3>{hours}</h3>
        </div>
        <div className="camera">
          <span className="canvas" ref={webcamRef}>
            <QrReader
              delay={1200}
              onResult={(result) => {
                if (!!result) {
                  setQr(result);
                }
              }}
              style={{ width: "100%" }}
            />
          </span>
        </div>
        <div className="wellcome_tile" style={{ backgroundColor: data.color }}>
          {data?.name && <p>Bienvenido: {data.name}</p>}
        </div>
      </div>
    </div>
  );
}
