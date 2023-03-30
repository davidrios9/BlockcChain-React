import { Typography, Grid, Button } from "@mui/material"
import { NavLink as ReactNav } from 'react-router-dom'

const Solicitud = (props) => {

    return (
        <Grid container rowSpacing={1} justifyContent="center"  align='center' maxWidth="xl" direction={{xs: 'column', md: 'row' }}  sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Genera una solicitud</Typography> </Grid>
            <Grid item xs={6} > <Button component={ReactNav} to={"nuevoDoc"} variant="contained" sx={{ width: {xs:'90vw', sm:'90vw', md:'40vw'}, height: {xs:'10vh', sm:'10vh', md:'20vh'}}} color="green" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Nuevo documento</Typography></Button></Grid>
            <Grid item xs={6} > <Button component={ReactNav} to={"actualizacionDoc"} variant="contained" sx={{ width: {xs:'90vw', sm:'90vw', md:'40vw'}, height: {xs:'10vh', sm:'10vh', md:'20vh'}}} color="pink" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Actualización de documento</Typography></Button></Grid>
            <Grid item xs={6} > <Button component={ReactNav} to={"cambioNombreDoc"} variant="contained" sx={{ width: {xs:'90vw', sm:'90vw', md:'40vw'}, height: {xs:'10vh', sm:'10vh', md:'20vh'}}} color="orange" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Cambio de nombre</Typography></Button></Grid>
            <Grid item xs={6} > <Button component={ReactNav} to={"eliminacionDoc"} variant="contained" sx={{ width: {xs:'90vw', sm:'90vw', md:'40vw'}, height: {xs:'10vh', sm:'10vh', md:'20vh'}}} color="blue" ><Typography sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h3', lg: 'h3' } }}>Eliminación</Typography></Button></Grid>
        </Grid>


    )

}

export default Solicitud;
