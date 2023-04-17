import * as React from 'react';
import { Typography, Grid, Button, Divider, Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'idProceso', headerName: 'ID Proceso', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 320 },
    { field: 'compañia', headerName: 'Compañia', width: 320, },
    { field: 'nivel', headerName: 'Nivel', type: 'number', width: 90, },
];

const rows = [
    { id: 1, idProceso: 'PCA1', nombre: 'PBCA1 - BANCA DE INVERSIÓN', compañia: 'Banca de Inversíon', nivel: 1 },
    { id: 2, idProceso: 'BCO', nombre: 'BANCOLOMBIA', compañia: 'Bancolombia', nivel: 1 },
    { id: 3, idProceso: 'PFIDU1', nombre: 'FIDUCIARIA BANCOLOMBIA', compañia: 'Fiduciaria Bancolombia', nivel: 1 },
    { id: 4, idProceso: 'PPAN1', nombre: 'PANAMÁ', compañia: 'Panamá', nivel: 1 },
    { id: 5, idProceso: 'PPUER1', nombre: 'PUERTO RICO', compañia: 'Puerto Rico', nivel: 1 },
    { id: 6, idProceso: 'PVAL1', nombre: 'VALORES BANCOLOMBIA', compañia: 'Valores Bancolombia', nivel: 1 },
    { id: 7, idProceso: '16563', nombre: 'TUYA', compañia: 'Tuya', nivel: 1 },
    { id: 8, idProceso: 'AGR0001', nombre: 'BANCO AGRÍCOLA', compañia: 'Banco Agrícola', nivel: 1 },
    { id: 9, idProceso: 'SPAN', nombre: 'SUCURSAL PANAMÁ', compañia: 'Sucursal Panamá', nivel: 1 },
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

    const gestionarDocumentos = () => {
        navigate('solicitud');
    }

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

            <Grid item xs={3} align='left' display={selected.length===1? 'flex': 'none'}>
                <Button variant="contained" onClick={() => gestionarDocumentos()} color="orange" sx={{ fontSize: '13px' }}>
                    Gestionar documentos
                </Button>
            </Grid>

            <Grid item xs={3} align='left' display={selected.length===1? 'flex': 'none'}>
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


            <Grid item xs={12} align='left' minHeight={'60vh'}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    slots={{ toolbar: QuickSearchToolbar }}
                    onRowSelectionModelChange={(ids) => {setSelected(ids); }}

                />
            </Grid>
        </Grid>


    )

}

export default Procesos;
