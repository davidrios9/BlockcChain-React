import * as React from 'react';
import { useEffect, useContext } from 'react';
import { Grid, Typography, Box, Autocomplete, TextField, Button, Link } from "@mui/material"
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { AppContext } from '../../App.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PeticionPUT, PeticionGET } from '../servicies/ServiceAdminDocs.jsx';

const columns = [
    { field: 'idDocument', headerName: 'ID', flex: 1 },
    { field: 'documentName', headerName: 'Nombre', flex: 1 },
    { field: 'category', headerName: 'Categoría', flex: 1 },
    { field: 'keyWords', headerName: 'Keywords', flex: 1 },
    { field: 'version', headerName: 'Versión', flex: 1 },
    { field: 'id', headerName: 'Tracking ID', flex: 1 },
    {
        field: 'urlS3Document', headerName: 'URL', flex: 1, renderCell: (params) => (
            <Link href={params.value}>{params.value}</Link>
        )
    },
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
    const [nombreProcesos, setNombreProcesos] = React.useState("")
    const [idProceso, setIdProceso] = React.useState("")
    const contextData = useContext(AppContext);

    useEffect(() => {
        async function logJSONData() {
            const jsonData = await PeticionGET('/api/v1/document/' + state['idProceso']);
            var i = 0
            for (i = 0; i < jsonData.length; i++) {
                jsonData[i]["Id"] = i;
            }
            setProcesos(jsonData);
        };

        if (state === null) navigate('../POC-Procesos')
        else {
            setIdProceso(state['idProceso'])
            setNombreProcesos(state['nombreProcesos'])
            logJSONData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleApplication = async () => {
        if ((files !== "" || tiposDoc !== "" || keyWords !== "") && selected.length === 1) {

            var sel = procesos[selected[0]]['idDocument']
            var cat = procesos[selected[0]]['category']
            var key = procesos[selected[0]]['keyWords']
            if (tiposDoc !== "") cat = tiposDoc
            if (keyWords !== "") key = keyWords

            const data = new FormData()
            data.append("body", "{\n	\"idDocument\": \"" + sel + "\",\n	\"Category\": \"" + cat + "\",\n	\"KeyWords\": \"" + key + "\",\n	\"UserPublisher\": \"jDoe\"\n}\n");
            if (files !== "") data.append("document", files)

            
            const respuesta = await PeticionPUT('/api/v1/document', data)
            console.log(respuesta)
            if (respuesta.status !== 200) {
                contextData.severity("error")
                contextData.text(respuesta.msg)
                contextData.show(true)
            }
            else {
                contextData.severity("success")
                contextData.text(respuesta.msg)
                contextData.show(true)
                obtenerDocs()
            }
        }
        else {
            contextData.severity("warning")
            contextData.text("Llene todos los campos");
            contextData.show(true)

        }
    }

    const obtenerDocs = async () => {
        const jsonData = await PeticionGET('/api/v1/document/' + state['idProceso']);
        var i = 0
        for (i = 0; i < jsonData.length; i++) {
            jsonData[i]["Id"] = i;
        }
        setProcesos(jsonData);
    }

    return (
        <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', mt: 1, borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
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
                    getRowId={(row) => row.Id}
                    slots={{ toolbar: QuickSearchToolbar }}
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
                <Button variant="contained" color="blue" sx={{ backgroundColor: 'FCDB25' }} >
                    <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => navigate(-1)} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                    Retroceder
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => handleApplication()} color="pink" sx={{ backgroundColor: 'FCDB25' }}>
                    Confirmar edición
                </Button>
            </Grid>




        </Grid>
    )
}

export default ActualizacionDoc;
