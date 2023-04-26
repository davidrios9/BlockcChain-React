import {useState, ChangeEvent} from "react";
export const useFormulario = (objetoInicial) =>{
    const [obeto, setObjeto]=useState(objetoInicial);
    function dobleEnlace({ target }) {
        const { name, value } = target;
        setObjeto({ ...objetoInicial, [name]: value });
    };
    return {
        objeto,
        dobleEnlace,
        ...objeto,
    };
;
}