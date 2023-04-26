export const ConvertirBase64 = async (docCargado) =>{
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(docCargado);
        fileReader.onload = () =>{resolve(fileReader.result);};
        fileReader.onerror = (error) => {reject(error);};
    });
};