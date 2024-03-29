import * as React from 'react';
import { useContext, useEffect } from "react";
import { Grid, Typography, TextField, Autocomplete, Button, Divider } from "@mui/material";
import { AppContext } from '../../App.jsx';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { PeticionPOST } from '../servicies/ServiceAdminDocs.jsx';

const NuevoDoc = (props) => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [nombreProcesos, setNombreProcesos] = React.useState("")
    const [idProceso, setIdProceso] = React.useState("")


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

    const [lider, setLider] = React.useState('Escoja un líder aprobador');
    const [userLider, setUserLider] = React.useState('');
    const [justificacion, setJustificacion] = React.useState('');
    const [fileAmount, setFileAmount] = React.useState([1]);
    const [files, setFiles] = React.useState([])
    const [tiposDoc, setTiposDoc] = React.useState([])
    const [keyWords, setKeyWords] = React.useState([])
    const contextData = useContext(AppContext);

    useEffect(() => {


        if (state === null) navigate('../POC-Procesos')
        else {
            setIdProceso(state['idProceso'])
            setNombreProcesos(state['nombreProcesos'])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleApplication = async () => {
        if (lider !== 'Escoja un líder aprobador' && justificacion !== '' && files.length === fileAmount.length && tiposDoc.length === fileAmount.length && keyWords.length === fileAmount.length) {
            const data = new FormData()
            var body = ''
            for (var i = 0; i < fileAmount.length; i++) {
                body += "{\n	\"documentName\": \"" + files[i].name + "\",\n	\"processCode\": \"" + idProceso + "\",\n	\"category\": \"" + String(tiposDoc[i]) + "\",\n	\"userLoggin\": \"jdoe\",\n	\"leadUserApprover\": \"" + String(userLider) + "\",\n	\"userPublisher\":\"JEPAJON\",\n	\"keyWords\": \"" + String(keyWords[i]) + "\",\n	\"justificationRequest\": \"" + String(justificacion) + "\",\n	\"reviewObservations\": \"N/A\",\n	\"leadObservations\": \"N/A\"\n}"
                if (i < fileAmount.length - 1) {
                    body += ',\n'
                }
                else {
                    body += '\n'
                }
                data.append("documents", files[i])
            }


            data.append("body", "[" + body + "]");


            const respuesta = await PeticionPOST('/api/v1/document', data)
            if (respuesta.msg != null) {
                contextData.severity("error")
                contextData.text(respuesta.msg)
                contextData.show(true)
            }
            else {
                contextData.severity("success")
                contextData.text(respuesta.Message)
                contextData.show(true)
                navigate(-1)
            }
        }
        else {
            contextData.severity("warning")
            contextData.text("Llene todos los campos");
            contextData.show(true)
        }

    }

    const addFile = () => {
        var fAmount = [...fileAmount]
        fAmount.push(fAmount[fAmount.length - 1] + 1)
        setFileAmount(fAmount)
    }

    const removeFile = () => {
        var fAmount = [...fileAmount]
        fAmount.pop(fAmount[fAmount.length - 1])
        setFileAmount(fAmount)

        if (files.length > fAmount[fAmount.length - 1]) {
            var pFiles = [...files]
            pFiles.pop(files.length - 1)
            setFiles(pFiles)
        }

        if (tiposDoc.length > fAmount[fAmount.length - 1]) {
            pFiles = [...tiposDoc]
            pFiles.pop(tiposDoc.length - 1)
            setTiposDoc(pFiles)
        }

        if (keyWords.length > fAmount[fAmount.length - 1]) {
            pFiles = [...keyWords]
            pFiles.pop(keyWords.length - 1)
            setKeyWords(pFiles)
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
        <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ mt: '1vh', display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item display='flex' alignItems='center' justifyContent='center' xs={12} >
                <Typography sx={{ typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Nuevo documento</Typography>
            </Grid>

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



            <Grid item display='flex' alignItems='center' justifyContent='center' xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        setLider(newValue['name']);
                        setUserLider(newValue['label'])
                    }}
                    disablePortal
                    options={lideres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Líder aprobador" />}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
            </Grid>
            <Grid display='flex' alignItems='center' justifyContent='center' item xs={5} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Typography sx={{ typography: { xs: 'p', sm: 'p', md: 'h5', lg: 'h5', mt: 3 } }}>{lider}</Typography>

            </Grid>

            <Grid item xs={12} align='left'>
                <Divider sx={{ borderBottomWidth: '0.3vh' }} />
            </Grid>

            {fileAmount.map((filesId) => (
                <Grid container key={filesId} rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} >
                    <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                tipoDoc(newValue['label'], filesId)
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
                            onChange={(e) => keyWord(e.target.value, filesId)}>

                        </TextField>
                    </Grid>

                    <Grid item display='flex' alignItems='center' justifyContent='center' xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                        <Button variant="contained" color="blue" sx={{ backgroundColor: 'FCDB25' }} >
                            <input type="file" onChange={(e) => upload(e.target.files[0], filesId)} />
                        </Button>
                    </Grid>
                </Grid>
            ))}

            <Grid item display='flex' alignItems='center' justifyContent='center' xs={1} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button disabled={fileAmount.length < 2 ? true : false} variant="contained" onClick={() => removeFile()} color="pink" >
                    <RemoveIcon />
                </Button>
            </Grid>
            <Grid item display='flex' alignItems='center' justifyContent='center' xs={1} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => addFile()} color="pink" >
                    <AddIcon />
                </Button>
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <TextField
                    fullWidth
                    label="Justificación"
                    placeholder="Justificación"
                    multiline
                    maxRows={4}
                    onChange={(event) => {
                        setJustificacion(event.target.value);
                    }}
                />
            </Grid>

            <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => navigate(-1)} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
                    Retroceder
                </Button>
            </Grid>



            <Grid display='flex' alignItems='center' justifyContent='center' item xs={3} sx={{ width: '95vw', height: '10vh', m: 1 }}>
                <Button variant="contained" onClick={() => handleApplication()} color="green" sx={{ backgroundColor: 'FCDB25' }}>
                    Radicar solicitud para nuevos documentos
                </Button>
            </Grid>




        </Grid>
    )
}

export default NuevoDoc;
