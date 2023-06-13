import * as React from "react";
import { useEffect } from "react";
import { Grid, Typography, Button, Box, Dialog, Card, CardContent, Link } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PeticionGET } from '../servicies/ServiceAdminDocs.jsx';

const columns = [
  { field: 'idDocument', headerName: 'ID', flex: 1 },
  { field: 'documentName', headerName: 'Nombre', flex: 1 },
  { field: 'category', headerName: 'Categoría', flex: 1 },
  { field: 'keyWords', headerName: 'Keywords', flex: 1 },
  { field: 'version', headerName: 'Versión', flex: 1 },
  { field: 'id', headerName: 'Tracking ID', flex: 1 },
  {
    field: 'urlS3Document', headerName: 'URL', flex: 1, renderCell: (params) => (
      <Link href={params.value}>{params.value}</Link>)
  },
];

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



const EliminacionDoc = (props) => {

  const [procesos, setProcesos] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [nombreProcesos, setNombreProcesos] = React.useState("")
  const [idProceso, setIdProceso] = React.useState("")


  useEffect(() => {
    async function logJSONData() {
      const jsonData = await PeticionGET('/api/v1/document/' + state['idProceso']);
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

  const handleSelection = async (pSelected) => {
    setOpen(true)
    const jsonData = await PeticionGET("/api/v1/document/traking/" + pSelected);
    jsonData.reverse()
    setDataSelected(jsonData);
    console.log(jsonData)

  }


  return (
    <Grid container rowSpacing={1} padding={0} justifyContent="center" align='center' maxWidth="xl" direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt:1, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
      <Grid item xs={12}> <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h2', lg: 'h2' } }}>Histórico de cambios en documentos</Typography> </Grid>

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
          getRowId={(row) => row.id}
          onRowSelectionModelChange={(ids) => { handleSelection(ids); }}

        />
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid container alignItems={'center'} justifyContent={'center'} overflow='auto' maxWidth={{ sm: '90vw', md: '50vw', lg: '40vw' }} >
          {dataSelected.map((item) =>
            <Grid item key={item.Version}>
              <Card sx={{ minWidth: 275, m: 1 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {'Versión: ' + item.version}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {'Nombre: ' + item.documentName}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {'Categoría: ' + item.category}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {'Palabras clave: ' + item.keyWords}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {'URL: ' + item.urlS3Document}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Dialog>

      <Grid display='flex' alignItems='center' justifyContent='center' item xs={10} sx={{ width: '95vw', height: '10vh', m: 1 }}>
        <Button variant="contained" onClick={() => navigate(-1)} color="yellow" sx={{ backgroundColor: 'FCDB25' }}>
          Retroceder
        </Button>
      </Grid>




    </Grid>

  );


}

export default EliminacionDoc;
