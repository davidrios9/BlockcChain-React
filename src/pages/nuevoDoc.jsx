import * as React from 'react';
import { useContext } from "react";
import { Grid, Typography, TextField, Autocomplete, Button } from "@mui/material";
import { AppContext } from '../App.jsx';

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

    const lideres = [
        { label: 'LACARDON', name: 'CARDONA GARZON LUZ ADRIANA' },
        { label: 'ELGIRALD', name: 'GIRALDO DUQUE ELIANA MARIA' },
        { label: 'JCHIN', name: 'CHIN DEGENHARDT JOSE ROLANDO' },
        { label: 'LUZRAMOS', name: 'RAMOS AMAYA LUZ ADRIANA' },
        { label: 'MLANCHER', name: 'LANCHEROS ALVAREZ MAURICIO ANDRES' },
        { label: 'MAVARGAS', name: 'VARGAS MADRIGAL LINA MARCELA' },
        { label: 'APCASTRI', name: 'CASTRILLON ARENAS ANGELA PATRICIA' },
        { label: 'MMGUTIER', name: 'GUTIERREZ BEDOYA MONICA MARIA' },
        { label: 'JUEMOREN', name: 'MORENO CARDONA JUAN ESTEBAN' },
        { label: 'JPCASTAN', name: 'CASTAÑO ALVAREZ JUAN PABLO' }
    ]

    const documentos = [
        { label: 'BPM (editable bizagi)' },
        { label: 'BPM (Visor)' },
        { label: 'Instructivos' },
        { label: 'Anexos' },
        { label: 'Otros' }
    ]

    const [proceso, setProceso] = React.useState('Escoja un proceso');
    const [lider, setLider] = React.useState('Escoja un líder aprobador');
    const [justificacion, setJustificacion] = React.useState('');
    const contextData = useContext(AppContext);

    const handleApplication = async () => {
        if (proceso !== 'Escoja un proceso' && lider !== 'Escoja un líder aprobador' && justificacion !== '') {

            contextData.severity("success")
            contextData.text("Solicitud radicada");
            contextData.show(true)
        }
        else {
            contextData.severity("warning")
            contextData.text("Llene todos los campos");
            contextData.show(true)
        }

    }

    return (
        <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item display='flex' alignItems='center' justifyContent='center' xs={12} >
                <Typography sx={{ typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Nuevo documento</Typography>
            </Grid>
            <Grid item xs={5} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Usuario radicador:</Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>jdoe</Typography>

            </Grid>
            <Grid item xs={5} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Nombre radicador: </Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>John Doe</Typography>
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
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

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        setLider(newValue['name']);
                    }}
                    disablePortal
                    options={lideres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Líder aprobador" />}
                />
            </Grid>
            <Grid display='flex' alignItems='center' justifyContent='center' item xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', mt: 3 } }}>{lider}</Typography>

            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        //setLider(newValue['name']);
                    }}
                    disablePortal
                    options={documentos}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tipo de documento" />}
                />
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" color="green" sx={{ backgroundColor: 'FCDB25' }} >
                    <input type="file" />
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <TextField
                    fullWidth
                    label="Justificación"
                    placeholder="Justificación"
                    multiline
                    rows={2}
                    maxRows={4}
                    onChange={(event) => {
                        setJustificacion(event.target.value);
                    }}
                />
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => handleApplication()} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                    Radicar solicitud para nuevos documentos
                </Button>
            </Grid>




        </Grid>
    )
}

export default NuevoDoc;
