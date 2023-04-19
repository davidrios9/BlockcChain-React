import {  Typography, Grid, Box  } from "@mui/material"
import POClogo from '../assets/Logo POC.png'

const Home = (props) => {
    return (
        <Grid container justifyContent="center" maxWidth="xl" direction={{xs: 'column', md: 'row' }}  sx={{ display: 'flex', alignItems: 'center', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={6} >
                <Typography sx={{ mt: 3, display: 'flex', alignItems: 'center', ml: 3, typography: {xs:'h5', sm: 'h5', md:'h2', lg:'h2'  }, fontWeight: 'bold' }}>POC - Documentación de Procesos</Typography>
                <Typography sx={{ mt: 3, display: 'flex', alignItems: 'center', ml: 3, typography: {xs:'h6', sm: 'h6', md:'h4', lg:'h4'  } }}>Gestión documental con BLOCKCHAIN</Typography>
            </Grid>
            <Grid item xs={6} container alignItems="center" justifyContent="center">
                <Box component="img"
                    sx={{maxHeight: { xs: 200, md: 350 }}}
                    alt="NFT Ticketing logo."
                    src={POClogo}
                />
            </Grid>
        </Grid>
    )
}

export default Home;
    
