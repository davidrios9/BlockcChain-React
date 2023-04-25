import * as React from "react";
import PropTypes from "prop-types";
import NuevoDoc from "./nuevoDoc.jsx";
import { NavLink as ReactNav } from 'react-router-dom'
import { useContext } from "react";
import {
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Table,
  Modal,
} from "@mui/material";
import { AppContext } from "../App.jsx";
import { Box } from "@mui/system";
//import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { randomId } from "@mui/x-data-grid-generator";
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid-pro";

function QuickSearchToolbar() {
  return (
    <Box sx={{ p: 0.5, pb: 0 }}>
      <GridToolbarQuickFilter />
    </Box>
  );
}

const archivos = [
  {
    id: 1,
    label: "Archivo 1.txt",
    tipoDoc: "BPM (editable bizagi)",
    keyWords: "Leer, escribir, hablar, escuchar",
  },
  {
    id: 2,
    label: "Archivo 2.xslx",
    tipoDoc: "Anexos",
    keyWords: "cuenta ahorros, cuenta corriente, fondo de inversión",
  },
  {
    id: 3,
    label: "Archivo 3.docx",
    tipoDoc: "Anexos",
    keyWords: "Credito hipotecário, Tarjeta de crédito, Libranza",
  },
  {
    id: 4,
    label: "Archivo 4.rar",
    tipoDoc: "Otros",
    keyWords: "Cliente, Usuario, Nueva Cuenta",
  },
  {
    id: 5,
    label: "Archivo 5.rar",
    tipoDoc: "Otros",
    keyWords: "Cliente, Usuario, Nueva Cuenta",
  },
  {
    id: 6,
    label: "Archivo 6.rar",
    tipoDoc: "Otros",
    keyWords: "Cliente, Usuario, Nueva Cuenta",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, label: "", tipoDoc: "", keyWords: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

const EliminacionDoc = (props) => {
  const [rows, setRows] = React.useState(archivos);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const procesos = [
    { label: "T160268", name: "Abrir Canal Corresponsales Bancarios" },
    {
      label: "T160263",
      name: "Abrir, cerrar, trasladar y fusionar canal sucursales",
    },
    { label: "T160177", name: "Abrir CDT - Bono Desmaterializado" },
    { label: "T160203", name: "Abrir CDT Físico" },
    { label: "T160178", name: "Abrir CDT virtual" },
    { label: "T160029", name: "Abrir cuentas en sucursal" },
    { label: "T160176", name: "Abrir cuentas masivas y centralizadas" },
    { label: "T160277", name: "Abrir el canal Punto de atención móvil" },
    { label: "T160220", name: "Abrir Productos Bancaseguros" },
    { label: "T160556", name: "Abrir productos Factoring" },
  ];

  const documentos = [
    { label: "BPM (editable bizagi)" },
    { label: "BPM (Visor)" },
    { label: "Instructivos" },
    { label: "Anexos" },
    { label: "Otros" },
  ];

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

  const [proceso, setProceso] = React.useState("Escoja un proceso");
  const contextData = useContext(AppContext);

  const handleApplication = async () => {
    if (proceso !== "Escoja un proceso") {
      contextData.severity("success");
      contextData.text("Solicitud radicada");
      contextData.show(true);
    } else {
      contextData.severity("warning");
      contextData.text("Llene todos los campos");
      contextData.show(true);
    }
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    //setShow(true);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "id", flex: 0.1 },
    {
      field: "label",
      headerName: "label",
      flex: 0.2,
      width: 150,
      editable: true,
    },
    {
      field: "tipoDoc",
      headerName: "tipoDoc",
      flex: 0.2,
      width: 100,
      editable: true,
    },
    {
      field: "keyWords",
      headerName: "keyWords",
      flex: 0.3,
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        padding={0}
        justifyContent="center"
        align="center"
        maxWidth="xl"
        direction={{ xs: "column", md: "row" }}
        sx={{
          display: "flex",
          bgcolor: "#cfe8fc",
          minHeight: "80vh",
          borderRadius: 1,
          mt: 3,
          background: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)",
        }}
      >
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          <Typography
            sx={{ typography: { xs: "h5", sm: "h5", md: "h2", lg: "h2" } }}
          >
            Eliminar documento
          </Typography>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            width: "95vw",
            height: "10vh",
            backgroundColor: "#2A2625",
            borderRadius: 1,
            m: 1,
          }}
        >
          <Typography
            sx={{
              typography: {
                xs: "p",
                sm: "p",
                md: "h5",
                lg: "h5",
                color: "white",
              },
            }}
          >
            Usuario radicador:
          </Typography>
          <Typography
            sx={{
              typography: {
                xs: "p",
                sm: "p",
                md: "h5",
                lg: "h5",
                color: "white",
              },
            }}
          >
            elsalina
          </Typography>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            width: "95vw",
            height: "10vh",
            backgroundColor: "#2A2625",
            borderRadius: 1,
            m: 1,
          }}
        >
          <Typography
            sx={{
              typography: {
                xs: "p",
                sm: "p",
                md: "h5",
                lg: "h5",
                color: "white",
              },
            }}
          >
            Nombre radicador:{" "}
          </Typography>
          <Typography
            sx={{
              typography: {
                xs: "p",
                sm: "p",
                md: "h5",
                lg: "h5",
                color: "white",
              },
            }}
          >
            Erika Salinas
          </Typography>
        </Grid>

        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          xs={5}
          sx={{ width: "95vw", height: "10vh", m: 1 }}
        >
          <Autocomplete
            onChange={(event, newValue) => {
              setProceso(newValue["name"]);
            }}
            disablePortal
            options={procesos}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Codigo de proceso" />
            )}
          />
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          xs={5}
          sx={{ width: "95vw", height: "10vh", m: 1 }}
        >
          <Typography
            sx={{ typography: { xs: "p", sm: "p", md: "h5", lg: "h5", mt: 3 } }}
          >
            {proceso}
          </Typography>
        </Grid>

        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          xs={10}
          sx={{ width: "95vw", height: "53vh", m: 1 }}
        >
          <DataGridPro
            slots={{ toolbar: QuickSearchToolbar }}
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowHeight={() => "auto"}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>

        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          item
          xs={10}
          sx={{ width: "95vw", height: "10vh", m: 1 }}
        >
          <Button
            variant="contained"
            onClick={() => setShow(true)}
            color="yellow"
            sx={{ backgroundColor: "FCDB25" }}
          >
            Eliminar Documentos
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Eliminar Documento
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Realmente desea eliminar el documento?
            <br />
            <strong>{rows.label}</strong>
          </Typography>
          <Button
            variant="secondary"
            onClick={(e) => {
              setShow(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              handleApplication();
              setShow(false);
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EliminacionDoc;
