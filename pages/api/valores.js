import {apiUrl,apiId} from '../../utils';

export default async  function valores(metodo , valor) {
  
    
  // valor = 2
  // metodo= "valores";
  
   const reqMetodo = metodo;
   
     
     if (valor == "Aluguel"){
      valor =1;
     }
     else valor =2; 
  
 
  const corpo = await JSON.stringify( {
        acoes: [    
            
            { metodo: reqMetodo, params: [{finalidade : valor }]}
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

