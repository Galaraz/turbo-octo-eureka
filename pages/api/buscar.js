import {apiUrl,apiId} from '../../utils';

export default async  function buscar(req ) {
  
  let aux = {...req}
  aux.finalidade = aux.finalidade == "Venda"? 2:1;


    const corpo = await JSON.stringify( {
        acoes: [  
            
           { 
                metodo: "busca", 
                params: [ 
                    {                             
                        resultados: 12,
                        ...aux
                    }]
            }
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
