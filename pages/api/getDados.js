import {apiUrl,apiId} from '../../utils';

export default async  function getDados (req ) {


    const corpo = await JSON.stringify( {

        acoes: [                        
          { metodo : "dadosanunciante" },		
          { metodo : "finalidades" },
          { metodo : "estados" }, 
          { metodo : "valores"  },
          { metodo : "tipoimoveis" },
          { metodo: "perfilcorretores", params: [] },
      ], id: apiId
      });
    
      const resposta = await fetch(
        
        apiUrl,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: corpo
        }
       
      )
      const list = await resposta.json()
      
      
      return new Response (JSON.stringify(list)) // will be passed to the page component as props


}


 