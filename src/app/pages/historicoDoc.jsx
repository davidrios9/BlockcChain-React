import * as React from "react";
import { useEffect } from "react";
import { Grid, Typography, Button, Box, Dialog, Card, CardContent, Link } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'idDocument', headerName: 'ID', flex: 1 },
  { field: 'documentName', headerName: 'Nombre', flex: 1 },
  { field: 'category', headerName: 'Categoría', flex: 1 },
  { field: 'keyWords', headerName: 'Keywords', flex: 1 },
  { field: 'version', headerName: 'Versión', flex: 1 },
  { field: 'id', headerName: 'Tracking ID', flex: 1 },
  { field: 'urlS3Document', headerName: 'URL', flex: 1, renderCell: (params) => (
    <Link href={params.value}>{params.value}</Link>) },
];

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}



const EliminacionDoc = (props) => {

  const [procesos, setProcesos] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [nombreProcesos, setNombreProcesos] =  React.useState("")
  const [idProceso, setIdProceso] =  React.useState("")


  useEffect(() => {
    async function logJSONData() {
      const response = await fetch("http://localhost:3000/api/v1/document/" + state['idProceso']);
      const jsonData = await response.json();
      setProcesos(jsonData);
    };
    if(state === null) navigate('../POC-Procesos')
    else {
    setIdProceso(state['idProceso'])
    setNombreProcesos(state['nombreProcesos'])
    logJSONData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelection = async (pSelected) => {
    setOpen(true)
    const response = await fetch("http://localhost:3000/api/v1/document/traking/" + pSelected);
    const jsonData = await response.json();
    jsonData.reverse()
    setDataSelected(jsonData);
    console.log(jsonData)
    
  }


  return (
    <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
      <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Histórico de cambios en documentos</Typography> </Grid>

      <Grid item xs={2} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1, paddingTop: '0!important' }}>
        <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Id proceso:</Typography>
        <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>{idProceso}</Typography>

      </Grid>
      <Grid item xs={2} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1, paddingTop: '0!important' }}>
        <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Nombre proceso: </Typography>
        <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>{nombreProcesos}</Typography>
      </Grid>

      <Grid item xs={12} align='left' maxHeight={'50vh'} maxWidth={'99vw!important'} >
        <DataGrid
          rows={procesos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          selection
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: QuickSearchToolbar }}
          getRowId={(row) => row.id}
          onRowSelectionModelChange={(ids) => { handleSelection(ids); }}

        />
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid container alignItems={'center'} justifyContent={'center'} overflow= 'auto' maxWidth={{sm:'90vw',md:'50vw',lg:'40vw'}} >
          {dataSelected.map((item) =>
            <Grid item key={item.Version}>
              <Card sx={{ minWidth: 275, m:1 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                     {'Versión: '+ item.version}
                  </Typography>
                  <Typography variant="body2" component="div">
                     {'Nombre: '+ item.documentName}
                  </Typography>
                  <Typography variant="body2" component="div">
                     {'Categoría: '+ item.category}
                  </Typography>
                  <Typography variant="body2" component="div">
                     {'Palabras clave: '+ item.keyWords}
                  </Typography>
                  <Typography variant="body2" component="div">
                     {'URL: '+ item.urlS3Document}
                  </Typography>
                 
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Dialog>

      <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
        <Button variant="contained" onClick={() => navigate(-1)} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
          Retroceder
        </Button>
      </Grid>




    </Grid>

  );


}

export default EliminacionDoc;
/** 
import * as React from "react";
import PropTypes from "prop-types";
import { NavLink as ReactNav, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useContext, useState } from "react";
import Documentos from "../entities/Documentos"
import ApiBack from "../utilities/dominios/ApiBack"
import ServiceAdminDocs from "../servicies/ServiceAdminDocs"
import { useFormulario } from "../utilities/hooks/useFormulario";
import {
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Table,
  Modal,
} from "@mui/material";
import { AppContext } from "../../App.jsx";
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

const EliminacionDoc = (props) => {
  const [objDoc, setObjPro] = useState(new Documentos(0,"","","","",0,""));
  const [arrayDocs, setArrayDocs] = useState([]);
  const [todoListo, setTodoListo] = useState(false);
  const [enProceso, setEnProceso] = useState(false);
  let {codigo} = useParams();
  // ********************************************************************************
  // Eliminar Documento
  // ********************************************************************************
  const deleteDoc = async (codigoProducto) =>{
    const urlDelete = ApiBack.DOCS_DELETE + "/"+codigoProducto;
    const result = await ServiceAdminDocs.peticionDELETE(urlDelete);
    console.log(result);
    if (typeof result.eliminado === "undefined"){
      console.log("No se pudo elominar el producto");
    } else{
      console.log(`Producto${objDoc.nombre}ha sido eliminado`)
    }
    obtenerDocumentos();
  };
  // ********************************************************************************
  // Listar los documentos
  // ********************************************************************************
  const obtenerDocumentos = async()=>{
    const result = await ServiceAdminDocs.peticionGET(
      ApiBack.DOCS_LIST
    );
    setArrayDocs(result);
  };
  // ********************************************************************************
  // Obtener un Documento
  // ********************************************************************************
  let {
    nombre,
    categoria,
    keyWords,
    version,
    idTracking,
    url,
    dobleEnlace,
    objeto,
  } = useFormulario<Documentos>(new Documentos(0,"","","","",0,""));
  const obtenerUnDoc = async ()=>{
    const urlCargarUnDoc = ApiBack.DOCS_UNO +"/"+codigo;
    const docRecibido = await ServiceAdminDocs.peticionGET(urlCargarUnDoc);
    if (docRecibido){
      objeto.nombre = docRecibido.nombre;
      objeto.categoria = docRecibido.categoria;
      objeto.keyWords = docRecibido.keyWords;
      if (docRecibido){
        setTodoListo(true);
      }
    }
  }
  // *********************************************************************************
  // Actualizar documentos
  // *********************************************************************************
  const enviarInfo = async () => {
    const urlUpdate = ApiBack.DOCS_UPDATE +"/"+ codigo;
    const docUpdate = new Documentos(objeto.id, objeto.nombre, objeto.categoria,objeto.keyWords,objeto.version, objeto.idTracking,objeto.url);
    const result = await ServiceAdminDocs.peticionPUT(urlUpdate, docUpdate);
    if (result.nuevo){
      setEnProceso(false);
      console.log("Se ha actualizado correctamente");
    } else {
      console.log("No se ha podido actualizar")
    }
  } 


  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const { state } = useLocation();
    const { nombreProcesos, idProceso } = state; // Read values passed on state
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

  const contextData = useContext(AppContext);

  const handleApplication = async () => {
    contextData.severity("success");
      contextData.text("Solicitud radicada");
      contextData.show(true);
    /*if (nombreProcesos !== "Escoja un proceso") {
      
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
    enviarInfo();
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    //setShow(true);
    deleteDoc(id);
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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nombre', headerName: 'categoria', flex: 1 },
    { field: 'categoria', headerName: 'categoria', flex: 1 },
    { field: 'keywords', headerName: 'keywords', flex: 1 },
    { field: 'version', headerName: 'version', flex: 1 },
    { field: 'idTracking', headerName: 'idTracking', flex: 1 },
    { field: 'URL', headerName: 'URL', flex: 1 },
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
  React.useEffect(() =>{
    obtenerDocumentos();
  },[]);
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
          xs={2}
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
          xs={2}
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
            Nombre Usuario:
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
          xs={2}
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
            Id Proceso:
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
            Nombre Proceso:
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
*/