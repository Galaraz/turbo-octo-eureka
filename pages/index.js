
export default function Home(props) {
  const { destaques } = props
  return (
    <>
     {destaques[0].id}
    </>
  )
}

export async function getServerSideProps() {
  const url = "https://turbo-octo-eureka.pages.dev/"
  const resposta = await fetch(url  + "api/home")
  const list = await resposta.json()
  return {
    props: list, 
  }
}