import * as React from 'react';
import  { useEffect } from 'react';
import { Typography, Grid, Button, Divider, Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'idProceso', headerName: 'ID Proceso', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
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




const Procesos = (props) => {
    const navigate = useNavigate();
    const [selected, setSelected] = React.useState([]);
    const [procesos, setProcesos] = React.useState([]);

    const gestionarDocumentos = () => {
        navigate('solicitud', { state: { nombreProcesos: procesos[selected['0']-1]['nombre'], idProceso: procesos[selected['0']-1]['idProceso'] } });
    }

    useEffect(() => {
        async function logJSONData() {
            const response = await fetch("https://644842ba50c25337443c1e84.mockapi.io/procesos");
            const jsonData = await response.json();
            setProcesos(jsonData);
          }
          logJSONData()
      },[]);

    return (
        <Grid container rowSpacing={1} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', minHeight: '80vh', p: 1 }}>
            <Grid item xs={12} align='left'> <Typography sx={{ mt: 3, typography: { xs: 'h7', sm: 'h7', md: 'h5', lg: 'h5' }, }}>Procesos</Typography>
                <Divider sx={{ borderBottomWidth: '0.3vh' }} />
            </Grid>

            <Grid item xs={3} align='left'>
                <Typography sx={{ typography: { xs: 'h7', sm: 'h7', md: 'h7', lg: 'h7' }, }}>Descargar formato</Typography>

            </Grid>
            <Grid item xs={3} align='left'>
                <Typography sx={{ typography: { xs: 'h7', sm: 'h7', md: 'h7', lg: 'h7' }, }}>Seleccione archivo</Typography>

            </Grid>
            <Grid item xs={3} align='left'>
                <Button variant="text"  >
                    <input type="file" />
                </Button>

            </Grid>
            <Grid item xs={3} align='left'>
            </Grid>
            <Grid item xs={3} align='left'>
                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '13px' }}>
                    Descargar formato <DownloadIcon />
                </Button>
            </Grid>
            <Grid item xs={3} align='left'>
                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '13px' }}>
                    Cargar procesos masivamente
                </Button>


            </Grid>
            <Grid item xs={3} align='left'>
                <Button variant="contained" onClick={null} color="green" disabled sx={{ fontSize: '13px' }}>
                    Actualizar procesos masicamente
                </Button>


            </Grid>
            <Grid item xs={3} align='left'>

                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '13px' }}>
                    Descargar informe de cargue <DownloadIcon />
                </Button>
            </Grid>
            <Grid item xs={12} align='left'>
                <Divider sx={{ borderBottomWidth: '0.3vh' }} />
            </Grid>

            <Grid item xs={3} align='left' display={selected.length === 1 ? 'flex' : 'none'}>
                <Button variant="contained" onClick={() => gestionarDocumentos()} color="orange" sx={{ fontSize: '13px' }}>
                    Gestionar documentos
                </Button>
            </Grid>

            <Grid item xs={3} align='left' display={selected.length === 1 ? 'flex' : 'none'}>
                <Button variant="contained" onClick={null} color="orange" sx={{ fontSize: '13px' }}>
                    Ver / Editar
                </Button>
            </Grid>

            <Grid item xs={3} align='left'>
                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '13px' }}>
                    Descargar procesos <DownloadIcon />
                </Button>
            </Grid>

            <Grid item xs={3} align='left'>
                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '13px' }}>
                    Nuevo
                </Button>
            </Grid>


            <Grid item xs={12} align='left' maxHeight={'60vh'}  maxWidth={'99vw!important'}>
                <DataGrid
                    rows={procesos}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    pageSizeOptions={[5, 10, 25]}
                    slots={{ toolbar: QuickSearchToolbar }}
                    onRowSelectionModelChange={(ids) => { setSelected(ids); }}

                />
            </Grid>

            
        </Grid>


    )

}

export default Procesos;
