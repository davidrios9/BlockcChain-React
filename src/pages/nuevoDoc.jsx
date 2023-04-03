import * as React from 'react';
import { Grid, Typography, TextField, Autocomplete } from "@mui/material"


const NuevoDoc = (props) => {

    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const procesos = [
        { label: 'T160268', name: 'Abrir Canal Corresponsales Bancarios' },
        { label: 'T160263', name: 'Abrir, cerrar, trasladar y fusionar canal sucursales' },
        { label: 'T160177', name: 'Abrir CDT - Bono Desmaterializado' },
        { label: 'T160203', name: 'Abrir CDT Físico' },
        { label: 'T160178', name: 'Abrir CDT virtual' },
        { label: 'T160029', name: 'Abrir cuentas en sucursal' },
        { label: 'T160176', name: 'Abrir cuentas masivas y centralizadas' },
        { label: 'T160277', name: 'Abrir el canal Punto de atención móvil' },
        { label: 'T160220', name: 'Abrir Productos Bancaseguros' },
        { label: 'T160556', name: 'Abrir productos Factoring' }
    ]

    const [proceso, setProceso] = React.useState('Escoja un proceso');

    return (
        <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item display='flex' alignItems='center' justifyContent='center'  xs={12} >
                <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Nuevo documento</Typography>
            </Grid>
            <Grid item  xs={5} sx={{ width: '95vw', height: '10vh', backgroundColor: 'primary.main', borderRadius: 1, m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Usuario radicador:</Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>jdoe</Typography>

            </Grid>
            <Grid item  xs={5} sx={{ width: '95vw', height: '10vh', backgroundColor: 'primary.main', borderRadius: 1, m: 1 }}>
                <Typography  sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Nombre radicador: </Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>John Doe</Typography>
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center'  xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        setProceso(newValue['name']);
                    }}
                    disablePortal
                    options={procesos}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Codigo de proceso" />}
                />
            </Grid>
            <Grid display='flex' alignItems='center' justifyContent='center' item xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', mt: 3 } }}>{proceso}</Typography>

            </Grid>


        </Grid>
    )
}

export default NuevoDoc;
