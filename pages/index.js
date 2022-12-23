
export default function Home(props) {
  const { destaques } = props
  return (
    <>
      <h1>Home</h1>
      <div>
        {destaques[0].id} - Veio da API
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const apiId = "992";
  const apiUrl = "https://dev.infoimoveis.com.br/webservice/hotsites.php";

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
 
  return {
    props: list, 
  }
}
