import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Divider, CssBaseline } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import BancolombiaIcon from './/assets/logo-Blanco.svg'



export function AppBarTop() {


    return (
        <div>
            <CssBaseline />
            <AppBar position='static' sx={{ height: '7vh' }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters sx={{ height: '7vh', minHeight: '7vh!important' }}>
                        <Box component="img" src={BancolombiaIcon} alt="Logo de Bancolombia" sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 23 }} />

                        <Typography variant="h7" sx={{ m: 0.5, }}>  GRC</Typography>
                        <Typography variant="h7" sx={{ m: 0.5, }}>|</Typography>
                        <Typography variant="h7" sx={{ m: 0.5, }}>John Doe</Typography>
                        <Typography variant="h7" sx={{ m: 0.5, }}> |</Typography>
                        <LogoutIcon sx={{ fontSize: 15 }} />
                        <Typography variant="h7" sx={{ m: 0.5, }}>Salir</Typography>

                    </Toolbar>
                </Container>
            </AppBar >
            <Divider sx={{ borderBottomWidth: '1vh', backgroundColor: '#FCDB25', borderStyle: 'revert' }} />
        </div>
    )
}