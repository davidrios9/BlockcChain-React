import * as React from 'react';
import { useEffect, useContext } from 'react';
import { Grid, Typography, Box, Autocomplete, TextField, Button } from "@mui/material"
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { AppContext } from '../../App.jsx';
import { useLocation } from 'react-router-dom';

const columns = [
    { field: 'IdDocument', headerName: 'ID', flex: 1 },
    { field: 'DocumentName', headerName: 'nombre', flex: 1 },
    { field: 'Category', headerName: 'categoria', flex: 1 },
    { field: 'KeyWords', headerName: 'keywords', flex: 1 },
    { field: 'Version', headerName: 'version', flex: 1 },
    { field: 'Id', headerName: 'idTracking', flex: 1 },
    { field: 'UrlS3Document', headerName: 'URL', flex: 1 },
];

const documentos = [
    { label: 'BPM (editable bizagi)' },
    { label: 'BPM (Visor)' },
    { label: 'Instructivos' },
    { label: 'Anexos' },
    { label: 'Otros' }
]

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <GridToolbarQuickFilter />
        </Box>
    );
}




const ActualizacionDoc = (props) => {

    const [procesos, setProcesos] = React.useState([]);
    const [files, setFiles] = React.useState([])
    const [tiposDoc, setTiposDoc] = React.useState([])
    const [keyWords, setKeyWords] = React.useState([])
    const [selected, setSelected] = React.useState([]);
    const { state } = useLocation();
    const { nombreProcesos, idProceso } = state; // Read values passed on state
    const contextData = useContext(AppContext);

    useEffect(() => {
        async function logJSONData() {
            const response = await fetch("http://localhost:3000/api/v1/document/"+idProceso);
            const jsonData = await response.json();
            console.log(jsonData)
            setProcesos(jsonData);
        }
        logJSONData()
    }, []);

    const handleApplication = async () => {
        if (files.length === 1 && tiposDoc.length === 1 && keyWords.length === 1) {

            contextData.severity("success")
            contextData.text("Solicitud radicada");
            contextData.show(true)

            const data = new FormData()
            data.append('idRadicado', "HGA00001")
            data.append('processCode', idProceso)
            data.append('category', tiposDoc[0])
            data.append('userLoggin', 'jdoe')
            data.append('userPublisher', 'JEPAJON')
            data.append('keyWords', keyWords[0])
            data.append('reviewObservations', "N/A")
            data.append('leadObservations', 'Documentos importantes para fin de año')
            data.append('file', files[0])

            

            fetch('https://644842ba50c25337443c1e84.mockapi.io/newDoc', {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(response => console.log(JSON.stringify(response)))

        }
        else {
            contextData.severity("warning")
            contextData.text("Llene todos los campos");
            contextData.show(true)
        }

    }

    const upload = (pFile, fileId) => {
        var pFiles = [...files]
        pFiles[fileId - 1] = pFile
        setFiles(pFiles)
    }
    
    const tipoDoc = (pFile, fileId) => {
        var pFiles = [...tiposDoc]
        pFiles[fileId - 1] = pFile
        setTiposDoc(pFiles)
    }
    
    const keyWord = (pFile, fileId) => {
        var pFiles = [...keyWords]
        if (pFile === '') {
            
            pFiles.pop(keyWords.length - 1)
            setKeyWords(pFiles)
        }
        else {
            
            pFiles[fileId - 1] = pFile
            setKeyWords(pFiles)
        }
    }

    return (
        <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Actualización de documento</Typography> </Grid>

            <Grid item xs={2} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1, paddingTop: '0!important' }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Usuario radicador:</Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>jdoe</Typography>

            </Grid>
            <Grid item xs={2} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1, paddingTop: '0!important' }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Nombre radicador: </Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>John Doe</Typography>
            </Grid>

            <Grid item xs={2} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1, paddingTop: '0!important' }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Id proceso:</Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>{idProceso}</Typography>

            </Grid>
            <Grid item xs={2} sx={{ width: '95vw', height: '10vh', backgroundColor: '#2A2625', borderRadius: 1, m: 1, paddingTop: '0!important' }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>Nombre proceso: </Typography>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', color: 'white' } }}>{nombreProcesos}</Typography>
            </Grid>

            <Grid item xs={12} align='left' maxHeight={'50vh'} maxWidth={'99vw!important'} >
                <DataGrid
                    rows={procesos}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    selection
                    pageSizeOptions={[5, 10, 25]}
                    getRowId={(row) =>  row.Id}
                    slots={{ toolbar: QuickSearchToolbar }}
                    onRowSelectionModelChange={(ids) => { setSelected(ids); }}

                />
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        tipoDoc(newValue['label'], 0)
                    }}
                    disablePortal
                    options={documentos}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tipo de documento" />}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <TextField
                    label="Palabras clave"
                    onChange={(e) => keyWord(e.target.value, 0)}>

                </TextField>
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" color="green" sx={{ backgroundColor: 'FCDB25' }} >
                    <input type="file" onChange={(e) => upload(e.target.files[0], 0)} />
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => handleApplication()} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                    Sustituir documento
                </Button>
            </Grid>


        </Grid>
    )
}

export default ActualizacionDoc;
