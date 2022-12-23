import {apiUrl,apiId} from '../../utils';

export default async  function utils (metodo , valor) {
  
    
  // valor = 2
  // metodo= "valores";
  
  const reqMetodo = metodo;
 
  const corpo = await JSON.stringify( {
        acoes: [    
            //  metodo: "cidades",  //  metodo: "bairros",  //  metodo: "valores", 
            { metodo: reqMetodo, params: [{ registro: valor }]}
        ], id: apiId
      });
    
    const response =  await fetch(
        apiUrl,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: corpo
        }
    
    );
    const list = await response.json()
  
    return new Response (JSON.stringify(list)) 
}

