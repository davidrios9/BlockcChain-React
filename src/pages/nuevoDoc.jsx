import { Grid, Typography } from "@mui/material"


const NuevoDoc = (props) => {
    return (
        <Grid container rowSpacing={1} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Nuevo documento</Typography> </Grid>
        </Grid>
    )
}

export default NuevoDoc;
 