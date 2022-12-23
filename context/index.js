
import { createContext, useState ,useEffect} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
   const [anunciante,setAnunciante] = useState([])
   const [finalidades, setFinalidades]= useState([])
   const [estados,setEstados] = useState([])
   const [valores,setValores] = useState([])
   const [tipoimoveis,setTipoImoveis] = useState([])
   const [perfilcorretores,setPerfilcorretores] = useState([])
   const [loadingDados, setLoadingDados] = useState(true)

   useEffect(() => {
    
    getDados();
    
   },[]);
  

   async function getDados (){
    setLoadingDados(true)
    const apiUrlLocal = 'http://localhost:3000/';
    const response = await fetch(apiUrlLocal+"/api/getDados")
    const list = await response.json()
      
      Object.keys(list).includes('anunciante') && setAnunciante(list.anunciante)
      Object.keys(list).includes('finalidades') && setFinalidades(list.finalidades.map( (item) => {return item.label} ))
      Object.keys(list).includes('estados')&& setEstados(list.estados);
      Object.keys(list).includes('valores')&& setValores(list.valores);
      Object.keys(list).includes('tipoimoveis')&& setTipoImoveis(list.tipoimoveis) ;
      Object.keys(list).includes('perfilcorretores') && setPerfilcorretores(list.perfilcorretores)
      setLoadingDados(false) ;
}

    return (
        
        <AuthContext.Provider value={{ anunciante, finalidades, estados,valores,tipoimoveis,perfilcorretores, loadingDados,setValores }} >
            { children }
        </AuthContext.Provider>
    );
};
export default AuthProvider