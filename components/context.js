const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const attendanceRegister = async (qr, location = "") => {
  const payload = {
    qrCode: qr,
    location: "web",
    device: "web",
  };

  const reg = await fetch(`${API_URL}/api/v1/checa/employee/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Código QR no válido");
      }
      return res.json();
    })
    .then((data) => {
      return data.data;
    });

  return reg;
};

export const getLastRegisters = async () => {
  const reg = await fetch(`${API_URL}/api/v1/checa/last-registers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Error al obtener registros");
      }
      return res.json();
    })
    .then((data) => {
      return data.data;
    });

  return reg;
};

export const getColaborators = async () => {
  const reg = await fetch(`${API_URL}/api/v1/checa/all-employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Error al obtener registros");
      }
      return res.json();
    })
    .then((data) => {
      return data.data;
    });

  return reg;
};

export const getReport = async (startDate, endDate) => {
  const reg = await fetch(`${API_URL}/api/v1/checa/reporter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Error al obtener registros");
      }
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte.xlsx";
      document.body.appendChild(a);
      a.click();
    });

  return reg;
}

