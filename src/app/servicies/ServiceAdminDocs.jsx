import ApiBack from "../utilities/dominios/ApiBack";

class ServiceAdminDocs {

  //Servicio de peticion GET
  static async peticionGET(urlServicio) {
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
        return miError;
      });
    return respuesta;
  }

  // Servicio para peticiones POST
  static async peticionPOST(urlServicio, miJSON){
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
  static async peticionDELETE(urlServicio){
    const datosEnviar = {
        method: "DELETE",
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
  static async peticionPUT(urlServicio, miJSON){
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
}
export default ServiceAdminDocs;
