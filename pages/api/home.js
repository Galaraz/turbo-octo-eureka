const apiId = "992";
const apiUrl = "https://dev.infoimoveis.com.br/webservice/hotsites.php";

export default async  function requisicoes (req, res) {

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
    res.status(200).json(list)
}
