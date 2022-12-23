import {apiUrl,apiId} from '../../utils';
export default async  function requisicoes (req ) {
  
    const corpo = await JSON.stringify( {
        acoes: [                        
          { metodo: "destaques", params: [ { resultados: "4" }] },
          { metodo: "ultimasnoticias", params: [ { resultados: "4" }] },
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

