import * as React from 'react';
import { useContext } from "react";
import { Grid, Typography, TextField, Autocomplete, Button, Table, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from '../App.jsx';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const EliminacionDoc = (props) => {

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

    const archivos = [
        {id:1, label: 'Archivo 1.txt', tipoDoc: 'BPM (editable bizagi)', keyWords:'Leer, escribir, hablar, escuchar'},
        {id:2,label: 'Archivo 2.xslx', tipoDoc: 'Anexos', keyWords:'cuenta ahorros, cuenta corriente, fondo de inversión'},
        {id:3,label: 'Archivo 3.docx', tipoDoc: 'Anexos', keyWords: 'Credito hipotecário, Tarjeta de crédito, Libranza'},
        {id:4,label: 'Archivo 4.rar', tipoDoc: 'Otros', keyWords: 'Cliente, Usuario, Nueva Cuenta'},
        {id:5,label: 'Archivo 5.rar', tipoDoc: 'Otros', keyWords: 'Cliente, Usuario, Nueva Cuenta'},
        {id:6,label: 'Archivo 6.rar', tipoDoc: 'Otros', keyWords: 'Cliente, Usuario, Nueva Cuenta'}
    ]

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);

    const [proceso, setProceso] = React.useState('Escoja un proceso');
    const [archivo, setArchivo] = React.useState('Escoja un proceso');
    const contextData = useContext(AppContext);

    const handleApplication = async () => {
        if (proceso !== 'Escoja un proceso') {

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

    const columns = [

        { field: 'id', headerName: 'id',flex: 0.1},
        {
            field: 'label',
            headerName: 'label',
            flex: 0.2,
            width: 150,
            editable: true,
        },
        {
            field: 'tipoDoc',
            headerName: 'tipoDoc',
            flex: 0.2,
            width: 100,
            editable: true,
        },
        {
            field: 'keyWords',
            headerName: 'keyWords',
            flex: 0.3,
            width: 200,
            editable: true,
        },
        
    ];

    return (
        <><Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item display='flex' alignItems='center' justifyContent='center' xs={12}>
                <Typography sx={{ typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Eliminar documento</Typography>
            </Grid>
            <Grid item xs={5} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Usuario radicador:</Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>elsalina</Typography>

            </Grid>
            <Grid item xs={5} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Nombre radicador: </Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Erika Salinas</Typography>
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        setProceso(newValue['name']);
                    } }
                    disablePortal
                    options={procesos}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Codigo de proceso" />} />
            </Grid>
            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', mt: 3 } }}>{proceso}</Typography>

            </Grid>


            <Grid item display='flex' alignItems='center' justifyContent='center' xs={10} sx={{ width: '95vw', height: '53vh', m: 1 }}>
                
                <DataGrid
                rows={archivos}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                getRowHeight={() => 'auto'} 
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick/>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => setShow(true)} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                    Eliminar Documentos
                </Button>
            </Grid>

        </Grid>
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Eliminar Documento
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    ¿Realmente desea eliminar el documento?
                    <br />
                    <strong>
                    {archivo.label}
                    </strong>

                </Typography>
                <Button
                        variant="secondary"
                        onClick={(e) => {
                            setShow(false);
                        } }
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={(e) => {
                            handleApplication();;
                            setShow(false);
                        } }
                    >
                        Eliminar
                    </Button>
            </Box>
                
            </Modal></>

        
    )
}

export default EliminacionDoc;