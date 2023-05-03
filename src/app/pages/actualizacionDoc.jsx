import * as React from 'react';
import { useEffect, useContext } from 'react';
import { Grid, Typography, Box, Autocomplete, TextField, Button } from "@mui/material"
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { AppContext } from '../../App.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const [procesos, setProcesos] = React.useState([]);
    const [files, setFiles] = React.useState("")
    const [tiposDoc, setTiposDoc] = React.useState("")
    const [keyWords, setKeyWords] = React.useState("")
    const [selected, setSelected] = React.useState([]);
    const { state } = useLocation();
    const { nombreProcesos, idProceso } = state; // Read values passed on state
    const contextData = useContext(AppContext);

    useEffect(() => {
        async function logJSONData() {
            const response = await fetch("http://localhost:3000/api/v1/document/" + idProceso);
            const jsonData = await response.json();
            setProcesos(jsonData);
        };
        logJSONData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   

    const handleApplication = async () => {
        if (files !== "" && tiposDoc !== "" && keyWords !== "" && selected.length === 1) {

            const data = new FormData()
            data.append("body", "{\n	\"idDocument\": \"" + selected[0] + "\",\n	\"processCode\": \"" + idProceso + "\",\n	\"Category\": \"" + tiposDoc + "\",\n	\"KeyWords\": \"" + keyWords + "\",\n	\"reviewObservations\": \"N/A\",\n	\"leadObservations\": \"Documentos importantes para fin de año\"\n}\n");
            data.append("document", files)


            fetch('http://localhost:3000/api/v1/document/', {
                method: 'PUT',
                body: data
            })
                .then(response => response.json(),
                    contextData.severity("success"),
                    contextData.text("Solicitud radicada"),
                    contextData.show(true),
                    navigate(-1)
                )
        }
        else {
            contextData.severity("warning")
            contextData.text("Llene todos los campos");
            contextData.show(true)
           
        }
    }

    return (
        <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Sustitución de documentos</Typography> </Grid>

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
                    selection
                    pageSizeOptions={[5, 10, 25]}
                    slots={{ toolbar: QuickSearchToolbar }}
                    getRowId={(row) => row.IdDocument}
                    onRowSelectionModelChange={(ids) => { setSelected(ids); }}

                />
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        setTiposDoc(newValue['label'])
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
                    onChange={(e) => setKeyWords(e.target.value)}>

                </TextField>
            </Grid>

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" color="green" sx={{ backgroundColor: 'FCDB25' }} >
                    <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => navigate(-1)} color="orange" sx={{ backgroundColor: 'FCDB25' }}>
                    Retroceder
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => handleApplication()} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                    Sustituir documento
                </Button>
            </Grid>

            


        </Grid>
    )
}

export default ActualizacionDoc;
