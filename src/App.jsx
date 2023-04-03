import * as React from 'react';
import { createTheme, ThemeProvider, Snackbar, Alert } from '@mui/material';
import { useState } from "react";
import { AppBarTop } from './AppBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Solicitud from './pages/solicitud'
import Home from './pages/home'
import NuevoDoc from './pages/nuevoDoc'
import ActualizacionDoc from './pages/actualizacionDoc'
import CambioNombreDoc from './pages/cambioNombreDoc'
import EliminacionDoc from './pages/eliminacionDoc'


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
          <AppBarTop></AppBarTop>
          <Routes>
            <Route exact path="POC-Procesos/" element={<Home />} />
            <Route exact path="POC-Procesos/solicitud" element={<Solicitud />} />
            <Route exact path="POC-Procesos/solicitud/nuevoDoc" element={<NuevoDoc />} />
            <Route exact path="POC-Procesos/solicitud/actualizacionDoc" element={<ActualizacionDoc />} />
            <Route exact path="POC-Procesos/solicitud/cambioNombreDoc" element={<CambioNombreDoc />} />
            <Route exact path="POC-Procesos/solicitud/eliminacionDoc" element={<EliminacionDoc />} />
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


