import { QrReader } from 'react-qr-reader';
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function Home() {
  const [data, setData] = useState('No result');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
      const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
      setHours(hours);
      setMinutes(minutes);
    }, 1000);
    return () => clearInterval(interval);
  }, [])
 

  const webcamRef = useRef(null);  

  return (
    <div className="App">
      <div className="qr-panel">
        <div className='reloj'>
          <h1>{hours}:{minutes}</h1>
          { data !== 'No result' && <p>Bienvenido: {data}</p>}
        </div>
      <span className='canvas' ref={webcamRef}>
       <QrReader
        delay={300}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);            
            html2canvas(webcamRef.current).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              console.log("🚀 ~ file: index.js:32 ~ Home ~ imgData", imgData)
              const a = document.createElement('a');
              a.href = imgData;
              a.download = 'image.png';
              a.click();
            })

          }

          // if (!!error) {
          //   console.info(error);
          // }
        }}
        style={{ width: '100%' }}
      />
      </span>
      </div>
    </div>
  )
}
