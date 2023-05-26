import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button, Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';

const columns = [
    { field: 'ProcessCode', headerName: 'ID Proceso', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'ProcessName', headerName: 'Nombre', flex: 1, headerAlign: 'center', align: 'center' },
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
    const [procesos, setProcesos] = React.useState([]);

    const gestionarDocumentos = (selected) => {
        navigate('solicitud', { state: { nombreProcesos: procesos[selected['0']]['ProcessName'], idProceso: procesos[selected['0']]['ProcessCode'] } });
    }

    useEffect(() => {
        async function logJSONData() {
            const response = await fetch("http://localhost:3000/api/v1/process/?page=1&limit=30");
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
        <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent="center" textAlign="center" maxWidth="xl" sx={{ bgcolor: '#cfe8fc', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>


            <Grid item xs={12} m={3} maxWidth={'95vw!important'} >
                <DataGrid

                    rowHeight={39}
                    rows={procesos}
                    columns={columns}
                    slots={{ toolbar: QuickSearchToolbar }}
                    onRowSelectionModelChange={(ids) => { gestionarDocumentos(ids); }}

                />
            </Grid>


            <Grid item xs={12} mb={3}>
                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '20px' }}>
                    <AddCircleOutlineIcon sx={{ fontSize: 30, mr:3 }} />
                    Crear un nuevo proceso

                </Button>
            </Grid>



        </Grid>


    )

}

export default Procesos;
