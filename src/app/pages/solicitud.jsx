import { Typography, Grid, Button } from "@mui/material"
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Solicitud = (props) => {
    const { state } = useLocation();
    const { nombreProcesos, idProceso } = state; // Read values passed on state
    const navigate = useNavigate();
    const navegar = (ruta) => {
        navigate(ruta, { state: { nombreProcesos: nombreProcesos, idProceso: idProceso } });
    }

    return (
        <Grid container rowSpacing={1} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Genera una solicitud</Typography> </Grid>
            <Grid item xs={6} > <Button onClick={() => navegar("nuevoDoc")} variant="contained" sx={{ width: { xs: '90vw', sm: '90vw', md: '40vw' }, height: { xs: '10vh', sm: '10vh', md: '20vh' } }} color="green" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Nuevos documentos</Typography></Button></Grid>
            <Grid item xs={6} > <Button onClick={() => navegar("actualizacionDoc")} variant="contained" sx={{ width: { xs: '90vw', sm: '90vw', md: '40vw' }, height: { xs: '10vh', sm: '10vh', md: '20vh' } }} color="pink" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Edición de documentos</Typography></Button></Grid>
            <Grid item xs={6} > <Button onClick={() => navegar("cambioNombreDoc")} variant="contained" sx={{ width: { xs: '90vw', sm: '90vw', md: '40vw' }, height: { xs: '10vh', sm: '10vh', md: '20vh' } }} color="orange" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Eliminación de documentos</Typography></Button></Grid>
            <Grid item xs={6} > <Button onClick={() => navegar("eliminacionDoc")} variant="contained" sx={{ width: { xs: '90vw', sm: '90vw', md: '40vw' }, height: { xs: '10vh', sm: '10vh', md: '20vh' } }} color="blue" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Histórico de cambios en documentos</Typography></Button></Grid>
            <Grid item xs={6} > <Button onClick={() => navigate(-1)} variant="contained" sx={{ width: { xs: '50vw', sm: '50vw', md: '10vw' }, height: { xs: '5vh', sm: '5vh', md: '10vh' } }} color="yellow" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}> { <ArrowBackIcon fontSize="large"/>} </Typography></Button></Grid>
        
        </Grid>


    )

}

export default Solicitud;
