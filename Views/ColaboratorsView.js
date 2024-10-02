import { useState, useCallback, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { getColaborators } from "../components/context";
import { EmployeesRows as columns } from "../utils";
import { DataGrid, esES } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

export default function ColaboratorsView() {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = useCallback(() => {
    setLoading(true);
    Promise.resolve(getColaborators())
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
    getData();
  }, []);

  console.log(registers.length);

  const rows = (employees) => {
    if (employees.length === 0) return [];
    return employees.map((register) => ({
      id: register._id,
      ...register,
    }));
  };

  return (
    <Stack marginTop={8}>
      <Box>
        <Typography variant="h5">Colaboradores Registrados</Typography>
      </Box>
      <Box height="70vh">
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
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "common.secondary500",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              padding: "16px 0",
              textAlign: "center",
            },
            "& .MuiDataGrid-overlayWrapperInner": {
              bgcolor: "rgba(255,255,255,0.25)",
            },
          }}
        />
      </Box>
    </Stack>
  );
}
