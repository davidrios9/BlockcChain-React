import * as React from 'react';
import { Collapse, Container, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import BancolombiaIcon from './/assets/logo-Blanco.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openSubMenu, setOpenSubMenu] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubMenuOpen = () => {
        setOpenSubMenu((prev) => !prev)
    }

    const handleMenuClick = (text) => {
        if (text === 'Procesos') {
            setOpen(false);
            navigate('POC-Procesos/procesos');
        }
        if (text === 'Home') {
            setOpen(false);
            navigate('POC-Procesos/');
        }

    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="static" open={open} sx={{ height: '7vh' }}>
                <Toolbar sx={{ height: '7vh', minHeight: '7vh!important' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Container maxWidth="xl" >
                        <Toolbar disableGutters sx={{ height: '7vh', minHeight: '7vh!important' }}>
                            <Box component="img" src={BancolombiaIcon} alt="Logo de Bancolombia" sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 23 }} onClick={() => handleMenuClick('Home')} />

                            <Typography variant="h7" sx={{ m: 0.5, }}>  GRC</Typography>
                            <Typography variant="h7" sx={{ m: 0.5, }}>|</Typography>
                            <Typography variant="h7" sx={{ m: 0.5, }}>John Doe</Typography>
                            <Typography variant="h7" sx={{ m: 0.5, }}> |</Typography>
                            <LogoutIcon sx={{ fontSize: 15 }} />
                            <Typography variant="h7" sx={{ m: 0.5, }}>Salir</Typography>

                        </Toolbar>
                    </Container>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '1vh', backgroundColor: '#FCDB25', borderStyle: 'revert' }} />
            </AppBar>

            <Drawer
                sx={{
                 
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.main'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ backgroundColor: 'primary.main' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "neutral.main" }} /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Box>
                    <List sx={{ backgroundColor: 'primary.main' }}>
                        <ListItem disablePadding sx={{ display: 'inherit' }}>
                            <Stack direction="column" spacing={2}>
                                <ListItemButton >
                                    <ListItemText sx={{ color: "#FCDB25" }} primary={"Riesgos y Controles"} />
                                    <ExpandMoreIcon sx={{ color: "neutral.main", mr: 1, alignSelf: 'right' }} />
                                </ListItemButton>
                            </Stack>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'inherit' }}>
                            <Stack direction="column" spacing={2}>
                                <ListItemButton >
                                    <ListItemText sx={{ color: "#FCDB25" }} primary={"Riesgos y Controles"} />
                                    <ExpandMoreIcon sx={{ color: "neutral.main", mr: 1, alignSelf: 'right' }} />
                                </ListItemButton>
                            </Stack>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'inherit' }}>
                            <Stack direction="column" >
                                <ListItemButton onClick={() => handleSubMenuOpen()}>
                                    <ListItemText sx={{ color: "#FCDB25" }} primary={"Maestros"} />
                                    <ExpandMoreIcon sx={{ color: "neutral.main", mr: 1, alignSelf: 'right' }} />
                                </ListItemButton>
                                <Collapse in={openSubMenu}>
                                    <List sx={{ backgroundColor: 'primary.main' }}>
                                        {['Unidades de Riesgo', 'Áreas organizacionales', 'Procesos', 'Producto', 'Canal', 'Objeto de Costo', 'Proveedores', 'Cuenta Contable'].map((text, index) => (
                                            <ListItem key={text} disablePadding>
                                                <ListItemButton onClick={() => handleMenuClick(text)} >
                                                    <ListItemText sx={{ color: "neutral.main" }} primary={text} />
                                                </ListItemButton>

                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </Stack>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'inherit' }}>
                            <Stack direction="column" spacing={2}>
                                <ListItemButton >
                                    <ListItemText sx={{ color: "#FCDB25" }} primary={"Otros Elementos Riesgo"} />
                                    <ExpandMoreIcon sx={{ color: "neutral.main", mr: 1, alignSelf: 'right' }} />
                                </ListItemButton>
                            </Stack>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'inherit' }}>
                            <Stack direction="column" spacing={2}>
                                <ListItemButton >
                                    <ListItemText sx={{ color: "#FCDB25" }} primary={"Administración riesgoss"} />
                                    <ExpandMoreIcon sx={{ color: "neutral.main", mr: 1, alignSelf: 'right' }} />
                                </ListItemButton>
                            </Stack>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'inherit' }}>
                            <Stack direction="column" spacing={2}>
                                <ListItemButton >
                                    <ListItemText sx={{ color: "#FCDB25" }} primary={"Administración aplicativo    "} />
                                    <ExpandMoreIcon sx={{ color: "neutral.main", mr: 1, alignSelf: 'right' }} />
                                </ListItemButton>
                            </Stack>
                        </ListItem>

                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}