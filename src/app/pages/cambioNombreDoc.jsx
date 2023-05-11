import * as React from "react";
import { useEffect, useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { AppContext } from "../../App.jsx";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ApiBack from "../utilities/dominios/ApiBack";
import ServiceAdminDocs from "../servicies/ServiceAdminDocs";
import Procesos from "../entities/Procesos.jsx";

function QuickSearchToolbar() {
  return (
    <Box sx={{ p: 0.5, pb: 0 }}>
      <GridToolbarQuickFilter />
    </Box>
  );
}

const CambioNombreDoc = (props) => {
  const [show, setShow] = React.useState(false);
  const contextData = useContext(AppContext);
  const [procesos, setProcesos] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { nombreProcesos, idProceso } = state; // Read values passed on state
  const [rowModesModel, setRowModesModel] = React.useState({});


  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
   // ************************************************************************
  // Eliminar documento
  // **************************************************************************
  const borrarProducto = async () => {
    console.log(selected)
    console.log(idProceso)
    var sel = procesos[selected[0]]
    const data = new Procesos()
    data.idDocument = selected[0]
            //data.append("body", "{\n	\"idDocument\": \"" + sel  + "\",\n" );
    const urlBorrar = ApiBack.DOCS_DELETE;
    const resultado = await ServiceAdminDocs.peticionDELETE(urlBorrar, data);
    console.log(resultado.status);
    console.log(data);
    if (typeof resultado.status != 200) {
      console.log(resultado);
    } else {
      console.log( "success"+ "Producto: " + " ha sido eliminado" );
    }
    obtenerDocs();
    setShow(false);
  };
  // **************************************************************************
  const obtenerDocs = async () => {
    const resultado = await ServiceAdminDocs.peticionGET(
      ApiBack.DOCS_LIST+"/"+idProceso
    );
    setProcesos(resultado);
  };
  // ************************************************************************

  const columns = [
    { field: "IdDocument", headerName: "ID", flex: 1 },
    { field: "DocumentName", headerName: "Nombre", flex: 1 },
    { field: "KeyWords", headerName: "Keywords", flex: 1 },
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
              onClick={null}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={null}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={null}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={(e) => {
              setShow(true);
              //setDoc(miDoc);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    async function logJSONData() {
      const response = await fetch(
        "http://localhost:3000/api/v1/document/" + idProceso
      );
      const jsonData = await response.json();
      setProcesos(jsonData);
    }
    logJSONData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplication = async () => {
    if ("Escoja un proces" !== "Escoja un proceso") {
      contextData.severity("success");
      contextData.text("Solicitud radicada");
      contextData.show(true);
    } else {
      contextData.severity("warning");
      contextData.text("Llene todos los campos");
      contextData.show(true);
    }
  };

  return (
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
        background: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)",
      }}
    >
      <Grid item xs={12}>
        {" "}
        <Typography
          sx={{ mt: 3, typography: { xs: "h5", sm: "h5", md: "h2", lg: "h2" } }}
        >
          Edición o eliminación de documentos
        </Typography>{" "}
      </Grid>

      <Grid
        item
        xs={2}
        sx={{
          width: "95vw",
          height: "10vh",
          backgroundColor: "#2A2625",
          borderRadius: 1,
          m: 1,
          paddingTop: "0!important",
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
          jdoe
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          width: "95vw",
          height: "10vh",
          backgroundColor: "#2A2625",
          borderRadius: 1,
          m: 1,
          paddingTop: "0!important",
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
          John Doe
        </Typography>
      </Grid>

      <Grid
        item
        xs={2}
        sx={{
          width: "95vw",
          height: "10vh",
          backgroundColor: "#2A2625",
          borderRadius: 1,
          m: 1,
          paddingTop: "0!important",
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
          Id proceso:
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
          {idProceso}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          width: "95vw",
          height: "10vh",
          backgroundColor: "#2A2625",
          borderRadius: 1,
          m: 1,
          paddingTop: "0!important",
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
          Nombre proceso:{" "}
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
          {nombreProcesos}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        align="left"
        maxHeight={"50vh"}
        maxWidth={"99vw!important"}
      >
        <DataGrid
          rows={procesos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          selection
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: QuickSearchToolbar }}
          getRowId={(row) => row.IdDocument}
          onRowSelectionModelChange={(ids) => {
            setSelected(ids);
          }}
        />
      </Grid>

      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        item
        xs={3}
        sx={{ width: "95vw", height: "10vh", m: 1 }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          color="orange"
          sx={{ backgroundColor: "FCDB25" }}
        >
          Retroceder
        </Button>
      </Grid>

      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliiminar Documento"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar el documento seleccionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={borrarProducto} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CambioNombreDoc;
