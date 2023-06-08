import * as React from "react";
import { useEffect, useContext } from "react";
import { Grid, Typography, Button, Link } from "@mui/material";
import { AppContext } from "../../App.jsx";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ApiBack from "../utilities/dominios/ApiBack.jsx";
import {PeticionDELETE, PeticionGET} from "../servicies/ServiceAdminDocs.jsx";
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
  const [nombreProcesos, setNombreProcesos] =  React.useState("")
  const [idProceso, setIdProceso] =  React.useState("")


  const handleClose = () => {
    setShow(false);
  };
   // ************************************************************************
  // Eliminar documento
  // **************************************************************************
  const borrarProducto = async () => {
    console.log(selected)
    console.log(idProceso)
    const data = new Procesos()
    data.idDocument = selected[0]
            //data.append("body", "{\n	\"idDocument\": \"" + sel  + "\",\n" );
    const urlBorrar = ApiBack.DOCS_DELETE;
    const resultado = await PeticionDELETE(urlBorrar, data);
    contextData.severity("success")
    contextData.text(resultado.msg)
    contextData.show(true)
    obtenerDocs();
    setShow(false);
  };
  // **************************************************************************
  const obtenerDocs = async () => {
    const resultado = await PeticionGET(
      ApiBack.DOCS_LIST+"/"+idProceso
    );
    setProcesos(resultado);
  };
  // ************************************************************************

  const columns = [
    { field: "idDocument", headerName: "ID", flex: 1 },
    { field: "documentName", headerName: "Nombre", flex: 1 },
    { field: 'category', headerName: 'Categoría', flex: 1 },
    { field: "keyWords", headerName: "Keywords", flex: 1 },
    { field: 'version', headerName: 'Versión', flex: 1 },
    { field: 'urlS3Document', headerName: 'URL', flex: 1, renderCell: (params) => (
      <Link href={params.value}>{params.value}</Link>
    ) },
  ];

  useEffect(() => {
    async function logJSONData() {
      const response = await fetch(
        "http://localhost:3000/api/v1/document/" + state['idProceso']
      );
      const jsonData = await response.json();
      setProcesos(jsonData);
    }

    if(state === null) navigate('../POC-Procesos')
    else {
    setIdProceso(state['idProceso'])
    setNombreProcesos(state['nombreProcesos'])
    logJSONData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          getRowId={(row) => row.idDocument}
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
          color="yellow"
          sx={{ backgroundColor: "FCDB25" }}
        >
          Retroceder
        </Button>
      </Grid>

      <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => setShow(true)} color="orange" sx={{ backgroundColor: 'FCDB25' }}>
                    Eliminar documento
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
