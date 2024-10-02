import QrCodeModal from "../Modal/QrCodeModal";

const LastRegisters = [
  {
    field: "id",
    sortable: false,
    disableColumnMenu: true,
    headerName: "id",
    width: 200,
    flex: 1,
  },
  {
    field: "location",
    headerName: "Ubicación",
    width: 200,
    flex: 1,
  },
  {
    field: "employee",
    headerName: "Colaborador",
    width: 200,
    flex: 1,
  },
  {
    field: "timestamp",
    headerName: "Fecha de Registro",
    width: 200,
    flex: 1,
  },
];

const EmployeesRows = [
  {
    field: "id",
    sortable: false,
    disableColumnMenu: true,
    headerName: "id",
    width: 200,
    flex: 1,
  },
  {
    field: "isActive",
    headerName: "Activo",
    width: 200,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 200,
    flex: 1,
  },
  {
    field: "departmen",
    headerName: "Departamento",
    width: 200,
    flex: 1,
  },
  {
    field: "qrCode",
    headerName: "Código QR",
    width: 200,
    flex: 1,
    renderCell: (params) => {
      return <QrCodeModal qrCode={params.row.qrCode} name={params.row.name} />;
    },
  },
  {
    field: "role",
    headerName: "Rol",
    width: 200,
    flex: 1,
  },
];

export { LastRegisters, EmployeesRows };
