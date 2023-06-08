import ApiBack from "../utilities/dominios/ApiBack";





//Servicio de peticion GET
export const PeticionGET =  (urlServicio) => {

  

  const datosEnviar = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  const url = ApiBack.URL + urlServicio;
  const respuesta = fetch(url, datosEnviar)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      return datos;
    })
    .catch((miError) => {

      return miError
    });
  return respuesta;
}

// Servicio para peticiones POST
export const PeticionPOST = async (urlServicio, miJSON) => {
  const datosEnviar = {
    method: "POST",
    body: JSON.stringify(miJSON),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  const url = ApiBack.URL + urlServicio;
  const respuesta = fetch(url, datosEnviar)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      return datos;
    })
    .catch((miError) => {
      return miError;
    });
  return respuesta;
}
// Servicio para peticiones DELETE
export const PeticionDELETE = async (urlServicio, miJSON) => {
  const datosEnviar = {
    method: "DELETE",
    body: JSON.stringify(miJSON),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  const url = ApiBack.URL + urlServicio;
  const respuesta = fetch(url, datosEnviar)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      return datos;
    })
    .catch((miError) => {
      return miError;
    });
  return respuesta;
}
// Servicio para peticiones PUT
export const PeticionPUT = async (urlServicio, miJSON) => {
  const datosEnviar = {
    method: "PUT",
    body: JSON.stringify(miJSON),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  const url = ApiBack.URL + urlServicio;
  const respuesta = fetch(url, datosEnviar)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      return datos;
    })
    .catch((miError) => {
      return miError;
    });
  return respuesta;
}
