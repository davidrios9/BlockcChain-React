import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BancolombiaIcon from './/assets/logo.svg'
import { useEffect, useContext } from "react";
//import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';
import { NavLink as ReactNav } from 'react-router-dom'
import { PeticionGET } from './app/servicies/ServiceAdminDocs.jsx'
import { AppContext } from '../src/App';

export function AppBarTop() {

    useEffect(() => {

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();
    const pages = [];
    //const contextData = useContext(AppContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const contextData = useContext(AppContext);

    const handleCloseNavMenu = (page) => {
        page = page.toLowerCase();
        page = page.replace(" ", "")
        navigate('POC-Procesos/' + page);
        setAnchorElNav(null);
    };

    const login = async () => {
        const respuesta = await PeticionGET('/api/v1/auth/dsamboni')
        console.log(respuesta)
        if (respuesta.msg != null) {
            contextData.severity("error")
            contextData.text(respuesta.msg)
            contextData.show(true)
        }
        else {
            sessionStorage.setItem("user", "dsamboni");
            sessionStorage.setItem("token", respuesta.access_token);
            window.location.reload(false);
        }

    };



    return (
        <AppBar position="static" sx={{ borderRadius: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component="img" src={BancolombiaIcon} alt="Logo de Bancolombia" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, maxWidth: 40 }} />

                    <MenuItem onClick={() => handleCloseNavMenu("")} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': { bgcolor: 'white', color: 'black' },
                                borderRadius: 1
                            }}
                        >
                            GESTIÓN DE PROCESOS
                        </Typography>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu("")}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)} autoFocus >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => handleCloseNavMenu("")}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GESTIÓN DE PROCESOS
                    </Typography>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                component={ReactNav}
                                to={"POC-Procesos/" + page.replace(" ", "")}
                                key={page}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ mr: 1, my: 2, color: 'white', active: 'true', display: 'block', '&:hover': { bgcolor: 'white', color: 'black' }, '&.active': { bgcolor: 'white', color: 'black' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Button variant="contained" id="walletButton" onClick={() => login()} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                            {sessionStorage.getItem("user") === null ? "Login" : sessionStorage.getItem("user")}
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <Button variant="contained" id="walletButton" onClick={() => login()} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                            {sessionStorage.getItem("user") === null ? "Login" : sessionStorage.getItem("user")}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}