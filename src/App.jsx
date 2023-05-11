import * as React from 'react';
import { createTheme, ThemeProvider, Snackbar, Alert  } from '@mui/material';
import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Solicitud from './app/pages/solicitud'
import Home from './app/pages/home'
import NuevoDoc from './app/pages/nuevoDoc'
import ActualizacionDoc from './app/pages/edicionDoc'
import CambioNombreDoc from './app/pages/eliminacionDoc'
import EliminacionDoc from './app/pages/historicoDoc'
import Procesos from './app/pages/procesos'
import PersistentDrawerLeft from './AppDrawer';


export const AppContext = React.createContext(null)

export function App() {

  //State variables
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  var [alert] = useState({
    text: setAlertText,
    severity: setAlertSeverity,
    show: setOpen,
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  return (
    <AppContext.Provider value={alert}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <PersistentDrawerLeft />
            <Routes>
              <Route exact path="POC-Procesos/" element={<Home />} />
              <Route exact path="POC-Procesos/procesos" element={<Procesos/>} />
              <Route exact path="POC-Procesos/procesos/solicitud" element={<Solicitud />} />
              <Route exact path="POC-Procesos/procesos/solicitud/nuevoDoc" element={<NuevoDoc />} />
              <Route exact path="POC-Procesos/procesos/solicitud/actualizacionDoc" element={<ActualizacionDoc />} />
              <Route exact path="POC-Procesos/procesos/solicitud/cambioNombreDoc" element={<CambioNombreDoc />} />
              <Route exact path="POC-Procesos/procesos/solicitud/eliminacionDoc" element={<EliminacionDoc />} />
              <Route exact path="*" element={<Navigate to='POC-Procesos/' />} />
            </Routes>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertText}
              </Alert>
            </Snackbar>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    yellow: createColor('#FCDB25'),
    green: createColor('#03C389'),
    pink: createColor('#F4B6CD'),
    orange: createColor('#FF7F41'),
    blue: createColor('#59CAE7'),
    primary: {
      main: '#2A2625',
      darker: '#FFDB00',
    },
    neutral: {
      main: '#FFFFFF',
      contrastText: '#FF8120',
    },
  },

});


