
export default function Home(props) {
  const { destaques } = props
  return (
    <>
     {destaques[0].id}
    </>
  )
}

export async function getStaticProps() {
  // let resposta = []
  // try{
  //   const urlLocal = "http://localhost:3000/"
  //   resposta = await fetch(urlLocal +  "api/home")
  // }catch(e){
  //  const url = "https://turbo-octo-eureka.pages.dev/"
  //   resposta = await fetch(url +  "api/home")
  // }
  // const list = await resposta.json()

  const list = { destaques :[{id: 123}] }
  return {
    props: list, 
  }
}