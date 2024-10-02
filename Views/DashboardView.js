import { useState, useCallback, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { getLastRegisters } from "../components/context";
import { LastRegisters as columns } from "../utils";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

export default function DashboardView() {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllRegisters = useCallback(() => {
    setLoading(true);
    Promise.resolve(getLastRegisters())
      .then((data) => {
        setRegisters(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getAllRegisters();
  }, []);

  console.log(registers.length);

  const rows = (employees) => {
    if (employees.length === 0) return [];
    return employees.map((register) => ({
      id: register._id,
      location: register.location,
      employee: register.employee,
      timestamp: dayjs(register.timestamp).format("DD/MM/YYYY HH:mm:ss"),
    }));
  };

  return (
    <Stack marginTop={8}>
      <Box>
        <Typography variant="h5">Últimos Registros</Typography>
      </Box>
      <Box height="80vh">
        <DataGrid
          density="standard"
          rows={rows(registers)}
          columns={columns}
          loading={loading}          
          //localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
}
