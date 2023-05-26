import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button, Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid, GridToolbarQuickFilter, GridRowModes,  GridActionsCellItem} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


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




const Procesos = (props) => {
    const navigate = useNavigate();
    const [procesos, setProcesos] = React.useState([]);

    const gestionarDocumentos = (selected) => {
        navigate('solicitud', { state: { nombreProcesos: procesos[selected['0']]['ProcessName'], idProceso: procesos[selected['0']]['ProcessCode'] } });
    }

    useEffect(() => {
        async function logJSONData() {
            const response = await fetch("http://localhost:3000/api/v1/process/?page=1&limit=30");
            const jsonData = await response.json();
            var i = 0
            for (i = 0; i < jsonData.length; i++) {
                jsonData[i]["id"] = i;
            }
            setProcesos(jsonData);
        }
        logJSONData()
    }, []);



    // CRUD

    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setProcesos(procesos.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = procesos.find((row) => row.id === id);
        if (editedRow.isNew) {
            setProcesos(procesos.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setProcesos(procesos.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    //COLUMNS 

    const columns = [
        { field: 'ProcessCode', headerName: 'ID Proceso', flex: 1, headerAlign: 'center', align: 'center', editable: true },
        { field: 'ProcessName', headerName: 'Nombre', flex: 1, headerAlign: 'center', align: 'center', editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent="center" textAlign="center" maxWidth="xl" sx={{ bgcolor: '#cfe8fc', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>


            <Grid item xs={12} m={3} maxWidth={'95vw!important'} >
                <DataGrid

                    rowHeight={39}
                    rows={procesos}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: QuickSearchToolbar }}
                    slotProps={{
                        toolbar: { setProcesos, setRowModesModel },
                    }}
                    onRowSelectionModelChange={(ids) => { gestionarDocumentos(ids); }}

                />
            </Grid>


            <Grid item xs={12} mb={3}>
                <Button variant="contained" onClick={null} color="green" sx={{ fontSize: '20px' }}>
                    <AddCircleOutlineIcon sx={{ fontSize: 30, mr: 3 }} />
                    Crear un nuevo proceso

                </Button>
            </Grid>



        </Grid>


    )

}

export default Procesos;
