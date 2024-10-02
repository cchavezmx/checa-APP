// Desc: Vista para generar reportes de los registros de los colaboradores
import { useState } from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { getReport } from "../components/context";

export default function ReportsView() {
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const startDate = form.get("startDate");
    const endDate = form.get("endDate");
    await getReport(startDate, endDate).finally(() => {
      setLoading(false);
    });
  };

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().format("YYYY-MM-DD");

  return (
    <Stack marginTop={8}>
      <Box>
        <Typography variant="h5">Reporteador</Typography>
      </Box>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" mb={3}>
            Genera reportes de los registros de tus Colaboradores
          </Typography>
          <form onSubmit={onSubmitHandler}>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField
                name="startDate"
                label="Fecha Inicial"
                type="date"
                defaultValue={startDate}
              />
              <TextField
                name="endDate"
                label="Fecha Final"
                type="date"
                defaultValue={endDate}
              />
            </Stack>
            <Button type="submit" variant="contained" color="primary">
              Generar Reporte
            </Button>
          </form>
        </Box>
      </Stack>
      { loading && <Typography>Generando Reporte...</Typography> }
    </Stack>
  );
}
