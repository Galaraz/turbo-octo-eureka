
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
  let resposta = []
  try{
    const urlLocal = "http://localhost:3000/"
    resposta = await fetch(urlLocal +  "api/home")
  }catch(e){
   const url = "https://turbo-octo-eureka.pages.dev/"
    resposta = await fetch(url +  "api/home")
  }
  const list = await resposta.json()

 
  return {
    props: list, 
  }
}
