import * as React from 'react';
import { useEffect } from 'react';
import { Typography, Grid, Button, Divider, Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';

const columns = [
    { field: 'Codigo', headerName: 'ID Proceso', flex: 1 },
    { field: 'Nombre', headerName: 'Nombre', flex: 1 },
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
        console.log(selected)
        navigate('solicitud', { state: { nombreProcesos: procesos[selected['0']]['Nombre'], idProceso: procesos[selected['0']]['Codigo'] } });
    }

    useEffect(() => {
        async function logJSONData() {
            const response = await fetch("http://localhost:3000/api/v1/process");
            const jsonData = await response.json();
            var i = 0
            for (i = 0; i < jsonData.length; i++) {
                jsonData[i]["id"] = i;
            }
            setProcesos(jsonData);
        }
        logJSONData()
    }, []);

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

            <Grid item xs={3} align='left' display={selected.length === 1 ? 'block' : 'none'}>
                <Button variant="contained" onClick={() => gestionarDocumentos()} color="orange" sx={{ fontSize: '13px' }}>
                    Gestionar documentos
                </Button>
            </Grid>

            <Grid item xs={3} align='left' display={selected.length === 1 ? 'block' : 'none'}>
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


            <Grid item xs={12} align='left' maxHeight={'60vh'} maxWidth={'99vw!important'}>
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
