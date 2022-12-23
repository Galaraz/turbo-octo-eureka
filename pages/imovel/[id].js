import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';

import { Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import ImageGallery from 'react-image-gallery';
import { ToastContainer } from 'react-toastify';
import ContentHeade from '../../components/ContentHeader';


import { apiId, apiUrl, urlImgs, urlSite, urlFavicon, moneyFormatter,titleSite } from '../../utils';
import SmFoto from '../../img/sm-foto.jpg';
import Place from '../../img/place.svg'


export default function Imovel(props) {
  const {dadosimovel} = props;

  
  
//   const [ showActions, setShowActions ] = useState(false);
//   const [ showProposta, setShowProposta ] = useState(false);
  const [ showTelefones, setShowTelefones ] = useState(false);
 
  const [ destaque, setDestaque ] = useState('');
 



//   useEffect(() => {
   
//     window.scroll({ top: (ancor.current.offsetTop + 50), left: 0, behavior: 'smooth' });
//     if (Object.keys(storage).length > 0) {
//         setDadosAnunciante(storage.anunciante);
//     }
//     setShowActions(isActive);
  
//   },[]);

//   const refStorage = useRef(true);
//     useEffect(() => {
//         if (refStorage.current) {
//             refStorage.current = false;            
//             return;
//         }
//         setDadosAnunciante(storage.anunciante);
//     },[storage]);

    // const refActive = useRef(true);
    // useEffect(() => {
    //     if (refActive.current) {
    //         refActive.current = false;            
    //         return;
    //     }
    //     setShowActions(isActive);        
    // },[isActive])

    const refImovel = useRef(true);
    useEffect(() => {
        if (refImovel.current) {
            refImovel.current = false;            
            return;
        }
       // imovel.imagens && setDestaque(imovel.imagens[0].imagem);
    },[dadosimovel])
  let images;
  if ( dadosimovel.imagens && dadosimovel.imagens.length) {
      images = dadosimovel.imagens.map(item => {
          return(
              {
                  original: `${urlImgs}/${item.imagem}`,
                  thumbnail: `${urlImgs}/${item.thumb}`,
                  originalTitle : `${item.titulo}`,                            
              }
          )
      });    
  }
  function handleClickMap() {
    window.open(`https://www.google.com/maps?q=${dadosimovel.latitude},${dadosimovel.longitude}`,'_blank');
}


const [ loading, setLoading ] = useState(false);

const [ formulario, setFormulario ] = useState({ 
    nomecompleto: '',
    email: '',
    cidade: '',
    uf: '',
    telefone: '', 
    mensagem: '',
    imovel: dadosimovel.id,
    finalidade: dadosimovel.finalidade,
    lnk_anuncio: `${urlSite}/imovel/${dadosimovel.id}`
});

// const [ validate, setValidate ] = useState({ validateName: true,validateEmail: true,validateTel: true,validateCity: true,validateUf: true,validateMensage: true });

// async function handleSubmit() {        

//   if (!existsOrError(formulario.nomecompleto) || !existsOrError(formulario.email) || !existsOrError(formulario.cidade) || !existsOrError(formulario.uf) || !existsOrError(formulario.telefone) || !existsOrError(formulario.mensagem)) {
      
//       const camposinvalidos = {
//           validateName: existsOrError(formulario.nomecompleto) ? true : false,
//           validateEmail: existsOrError(formulario.email) ? true : false,
//           validateCity: existsOrError(formulario.cidade) ? true : false, 
//           validateUf: existsOrError(formulario.uf) ? true : false,  
//           validateTel: existsOrError(formulario.telefone) ? true : false, 
//           validateMensage: existsOrError(formulario.mensagem) ? true : false, 
//       }

//       setValidate({...validate, ...camposinvalidos});               
//       notify('erro', 'Digite os campos obrigatórios'); 
      
//   } else if (!IsEmail(formulario.email)) {
      
//       setValidate({ validateName: true, validateEmail: false, validateTel: true, validateCity: true, validateUf: true, validateMensage: true });
//       notify('erro', 'Digite um e-mail válido');
      
//   } else if (!isMobile(formulario.telefone)) {

//       setValidate({ validateName: true, validateEmail: true, validateTel: false, validateCity: true, validateUf: true, validateMensage: true });
//       notify('erro', 'Digite um celular válido');

//   } else {            
//       setLoading(true); 
//       setValidate({ validateName: true, validateEmail: true, validateTel: true, validateCity: true, validateUf: true, validateMensage: true });

//       // api.post('',{                    
//       //     acoes: [                        
//       //         { 
//       //             metodo: "enviarproposta", 
//       //             params: [{ ...formulario }] 
//       //         },                
//       //     ],
//       //     id: apiId                 
//       // }).then(resp => {                        
//       //     if (resp.data.proposta.status === 'erro') {
//       //         notify('erro', resp.data.proposta.erro);
//       //     } 
//       //     else if (resp.data.proposta.status === 'sucesso') {
//       //         notify('sucesso', 'Mensagem enviada com sucesso');
//       //         setFormulario({ nomecompleto: '',email: '',cidade: '',uf: '',telefone: '', mensagem: '' });
//       //     }
//       //     setLoading(false); 
//       // }).catch(e => {
//       //     notify('erro', 'Ocorreu um erro inesperado, tente novamente mais tarde');
//       //     setLoading(false);
//       // });

//   }

// }

function handleForm(valores) {
  setFormulario({ ...formulario, ...valores });
}

function handleClose(value) {
  value === 'telefones' && setShowTelefones(false); 
//   value === 'proposta' && setShowProposta(false);
}
function handleShow(value) {
  value === 'telefones' && setShowTelefones(true); 
//   value === 'proposta' && setShowProposta(true);
}  
  // const router = useRouter();
  // const {id} = router.query; 
  
  
  return (
    <>
        <Head>

            <link rel="apple-touch-icon" sizes="57x57" href={ `${urlFavicon}apple-icon-57x57.png`} />
            <link rel="apple-touch-icon" sizes="60x60" href={ `${urlFavicon}apple-icon-60x60.png` } />
            <link rel="apple-touch-icon" sizes="72x72" href={ `${urlFavicon}apple-icon-72x72.png` } />
            <link rel="apple-touch-icon" sizes="76x76" href={ `${urlFavicon}apple-icon-76x76.png` } />
            <link rel="apple-touch-icon" sizes="114x114" href={ `${urlFavicon}apple-icon-114x114.png` } />
            <link rel="apple-touch-icon" sizes="120x120" href={ `${urlFavicon}apple-icon-120x120.png` } />
            <link rel="apple-touch-icon" sizes="144x144" href={ `${urlFavicon}apple-icon-144x144.png` } />
            <link rel="apple-touch-icon" sizes="152x152" href={ `${urlFavicon}apple-icon-152x152.png` } />
            <link rel="apple-touch-icon" sizes="180x180" href={ `${urlFavicon}apple-icon-180x180.png` } />
            <link rel="icon" type="image/png" sizes="192x192"  href={ `${urlFavicon}android-icon-192x192.png` } />
            <link rel="icon" type="image/png" sizes="32x32" href={ `${urlFavicon}favicon-32x32.png` } />
            <link rel="icon" type="image/png" sizes="96x96" href={ `${urlFavicon}favicon-96x96.png` } />
            <link rel="icon" type="image/png" sizes="16x16" href={ `${urlFavicon}favicon-16x16.png` } />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content={ `${urlFavicon}ms-icon-144x144.png` } />
            <meta name="theme-color" content="#ffffff" />

            <meta name="description" content={dadosimovel.maisdescricao} />
            <meta name="og:site_name" property="og:site_name" content={titleSite} />
            <meta name="og:url" property="og:url" content={`${urlSite}/imovel/${dadosimovel.id}`} />
            <meta name="og:title" property="og:title" content={`${dadosimovel.titulo} | ${dadosimovel.tipo} | ${dadosimovel.finalidade} | Imóvel | ${ titleSite }`} />
            <meta name="og:description" property="og:description" content={dadosimovel.maisdescricao} />                             
            <meta name="og:image" property="og:image" content={`${urlImgs}/${destaque}`} />
            <meta name="og:image:width" property="og:image:width" content="640" />
            <meta name="og:image:height" property="og:image:height" content="480" />
            <title>{ Object.keys(dadosimovel).length > 0 ? `${dadosimovel.titulo} | ${dadosimovel.tipo} | ${dadosimovel.finalidade} | Imóvel | ${titleSite} ` : `${titleSite}`}</title>
        </Head> 

         <div className="main"> 
            {/* <ContentHeade title="Imóvel"  /> */}
         
        
            <div className="container visualizacao px-4 px-sm-0">        
                
              
                <header className="d-flex topo-visualizacao justify-content-between align-items-center pt-5">
                    { dadosimovel.titulo && (
                        <div className="font-16 titulo pr-5">
                            <span className="pr-2">{ dadosimovel.titulo }</span>
                        </div>
                    ) }                        
                </header>
                
                
                    <div className="row py-5">
                        <div className="col-12 col-lg-7">

                            <div className="redes-sociais d-flex d-lg-none" style={{ transform: 'translate(-25px, 970%)' }}>
                                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${urlSite}/imovel/${dadosimovel.id}`} className="facebook mx-0" target="_blank" rel="noopener noreferrer nofollow">Facebook</Link>   
                                <Link href={`https://twitter.com/intent/tweet?text=${urlSite}/imovel/${dadosimovel.id}`} className="instagram mx-1" target="_blank" rel="noopener noreferrer nofollow">Instagram</Link>
                                <Link href={`https://api.whatsapp.com/send?text=${urlSite}/imovel/${dadosimovel.id}`} className="whatsapp mx-0" target="_blank" rel="noopener noreferrer follow">Whatsapp</Link>
                            </div>
                            
                            {
                                (
                                    images ?
                                        images.length === 1 ?
                                            <div><Image src={images[0].original} width="300" height="300" /></div>
                                        : <ImageGallery lazyLoad={true} showFullscreenButton={true} items={images} useBrowserFullscreen={ false } />
                                    
                                    : <div><Image src={SmFoto} width="300" height="300" /></div>
                                )
                            }

                            <div className="pt-3 pb-4 d-block d-lg-none">                                

                                
                                <div className=" d-block text-uppercase font-12">{ `${dadosimovel.finalidade} - ${dadosimovel.tipo}` }</div>
                                
                                <div className="d-block font-32"><b>{ dadosimovel.valor ? `R$ ${dadosimovel.valor}` : 'Consulte-nos' }</b></div>
                                
                               
                                
                                { (dadosimovel.valor_condominio  ) && <div className="font-12">{ `Condomínio: R$ ${moneyFormatter(dadosimovel.valor_condominio)}` }</div> }
                                { (dadosimovel.valor_iptu  ) && <div className="font-12">IPTU: {dadosimovel.valor_iptu}</div> }
                                
                                { (dadosimovel.areatotal && dadosimovel.areaconstruida ) && (
                                    <div className="font-12 opacity-75 pt-2">
                                        Área Total: {dadosimovel.areatotal} m<sup>2</sup> / Construída: {dadosimovel.areaconstruida} m<sup>2</sup>                                        
                                    </div>  
                                )}

                            </div>

                            <div className="d-block d-lg-none">
                               

                                <div className="d-block  border-top border-bottom py-3 flex-column flex-md-row">
                                    <div className="endereco d-flex align-items-center flex-grow-1 pr-4 font-14 line-height-130">
                                        <Image src={Place} alt="" width="150" height="150"/>
                                        {`${dadosimovel.endereco ? `${dadosimovel.endereco} - ` : '' }${dadosimovel.bairro} | ${dadosimovel.cidade}/${dadosimovel.uf}`}
                                    </div>
                                    { (dadosimovel.latitude && dadosimovel.longitude) && <button type="button" onClick={() => handleClickMap()} className="btn btn-secondary shadow-sm text-white font-13 px-4 py-2 m-0 mt-3 mt-md-0"><b>VER NO MAPA</b></button> }
                                </div>
                            </div>

                            <div className="d-block d-lg-none">
                            { dadosimovel.caracteristicas && (
                                <>
                               
                                <div className= "d-block pt-4 font-14"> 
                                    <ul>
                                        { dadosimovel.caracteristicas.map((item, index) => <li key={index}>{item}</li> ) }
                                    </ul>
                                </div>
                                </>
                            ) }  
                            </div>

                            { dadosimovel.maisdescricao && (
                                <>
                              
                                <div className="d-block descricao pt-4">
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">DESCRIÇÃO DO IMÓVEL</h2></div>
                                    <div className="font-14">{ dadosimovel.maisdescricao }</div>
                                </div>
                                </>
                            )}

                            { dadosimovel.observacoes && (
                                <>
                                <div className="d-block descricao pt-4">
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">OBSERVAÇÃO</h2></div>
                                    <div className="font-14">{ dadosimovel.observacoes }</div>
                                </div>
                                </>
                            ) }

                            { dadosimovel.infraestrutura && (
                                <>
                              
                                <div className="d-block descricao pt-4">
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">TEM NAS PROXIMIDADES</h2></div>
                                    <div className="font-14">
                                        <ul>
                                            { dadosimovel.infraestrutura.map((item, index) => <li key={index}>{item}</li> ) }
                                        </ul>
                                    </div>
                                </div>
                                </>
                            ) }

                        </div>
                        <div className="col-12 col-lg-5">
                            
                            <div className="pb-4 d-none d-lg-block">
                                <div className="redes-sociais d-flex" style={{ transform: 'translate(-300%, 900%)' }}>
                                    <Link href={`https://www.facebook.com/sharer/sharer.php?u=${urlSite}/imovel/${dadosimovel.id}`} className="facebook mx-0" target="_blank" rel="noopener noreferrer nofollow">Facebook</Link>   
                                    <Link href={`https://twitter.com/intent/tweet?text=${urlSite}/imovel/${dadosimovel.id}`} className="instagram mx-1" target="_blank" rel="noopener noreferrer nofollow">Instagram</Link>
                                    <Link href={`https://api.whatsapp.com/send?text=${urlSite}/imovel/${dadosimovel.id}`} className="whatsapp mx-0" target="_blank" rel="noopener noreferrer follow">Whatsapp</Link>
                                </div>

                                
                                <div className="d-block text-uppercase font-12">{ `${dadosimovel.finalidade} - ${dadosimovel.tipo}` }</div>
                                
                                
                                <div className="d-block font-32 color-primary"><b >{ dadosimovel.valor ? `R$ ${moneyFormatter(dadosimovel.valor)}` : 'Consulte-nos' }</b></div>
                                
                             
                                
                                { (dadosimovel.valor_condominio ) && <div className="font-12">{ `Condomínio: R$ ${moneyFormatter(dadosimovel.valor_condominio)}` }</div> }
                                { (dadosimovel.valor_iptu ) && <div className="font-12">IPTU: {dadosimovel.valor_iptu}</div> }
                                
                                { (dadosimovel.areatotal && dadosimovel.areaconstruida) && (
                                    <div className="font-12 opacity-75 pt-2">
                                        Área Total: {dadosimovel.areatotal} m<sup>2</sup> / Construída: {dadosimovel.areaconstruida} m<sup>2</sup>                                        
                                    </div>
                                )}

                            </div>
                            
                            <div className="d-none d-lg-block">
                            
                                <div className="d-block border-top border-bottom py-3">
                                    <div className="endereco d-flex align-items-center flex-grow-1 pr-4 font-14 line-height-130">
                                        <Image src={Place} alt="" width="100" height="100"/>
                                        {`${dadosimovel.endereco ? `${dadosimovel.endereco} - ` : '' }${dadosimovel.bairro} | ${dadosimovel.cidade}/${dadosimovel.uf}`}
                                    </div>
                                    { (dadosimovel.latitude && dadosimovel.longitude) && <button type="button" onClick={() => handleClickMap()} className="btn btn-secondary shadow-sm w-50 text-white font-13 px-0 py-2 m-0"><b>VER NO MAPA</b></button> }
                                </div>
                            </div>
                            
                            <div className="d-none d-lg-block">
                            { dadosimovel.caracteristicas && (
                                <>
                              

                                <div className="pt-4 font-14"> 
                                    <ul>
                                        { dadosimovel.caracteristicas.map((item, index) => <li key={index}>{item}</li> ) }
                                    </ul>
                                </div>
                                </>
                            ) }  
                            </div>                          

                            <div className="d-none d-md-block border p-4 p-md-5 mt-4">
                                <h2 className="font-24 m-0 p-0">Entre em Contato</h2> 
                                <p className="font-12 opacity-75">Preencha o formulário abaixo</p>
                                
                                <form>                                                                                
                                    <div className="row mx-0 font-14">

                                        <div className="col-12 pb-2 mb-1 px-0">
                                            <input type="text"  placeholder="NOME COMPLETO" value={formulario.nomecompleto} onChange={(e) => handleForm({ nomecompleto: e.target.value })} />
                                        </div>
                                        <div className="col-12 px-0 pb-2 mb-1">
                                            <input type="email"  placeholder="E-MAIL" value={formulario.email} onChange={(e) => handleForm({email: e.target.value})} />
                                        </div>                                        
                                        <div className="col-2 px-0 pb-2 mb-1">                                            
                                            <input type="text" placeholder="UF" maxLength="2"  value={formulario.uf} onChange={(e) => handleForm({uf: e.target.value})} /> 
                                        </div>
                                        <div className="col-10 px-0 pb-2 mb-1">
                                            <input type="text" placeholder="CIDADE" value={formulario.cidade} onChange={(e) => handleForm({cidade: e.target.value})} />
                                        </div>
                                        <div className="col-12 px-0 pb-2 mb-1">
                                            {/* <NumberFormat  placeholder="CELULAR" format="(##) #####-####" mask="_" value={formulario.telefone} onChange={(e) => handleForm({telefone: e.target.value})} /> */}
                                        </div>
                                        <div className="col-12 px-0 pb-2 mb-1">
                                            <textarea placeholder="MENSAGEM" value={formulario.mensagem} onChange={(e) => handleForm({mensagem: e.target.value})}></textarea>
                                        </div>
                                        <div className="col-12 pt-4 px-0 d-flex justify-content-end">
                                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary font-14 py-2 px-5 shadow-sm" disabled={ loading ? true : false }>
                                                { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                                                ENVIAR
                                            </button>  
                                        </div>

                                    </div>                                        
                                </form>

                            </div>

                        </div>
                    </div>    
                
                
            </div>

        </div>

        <div className={`d-flex d-md-none justify-content-center nav-bottom`}>
            <div className="pb-4">
                {/* { (Object.keys(dadosAnunciante).length > 0 && Object.keys(dadosAnunciante).includes('telefones')) && (
                    <button type="button" onClick={() => handleShow('telefones')} className="btn-telefone border-0 mx-2">Telefones</button>
                ) }                     */}
                <button type="button" onClick={() => handleShow('proposta')} className="btn-proposta btn-primary border-0 mx-2">Enviar Proposta</button>
            </div>                
        </div>

        <Modal className="modal-style" centered show={showTelefones} onHide={() => handleClose('telefones')}>          
            <Modal.Body className="p-4">          
                <h2 className="font-24 mb-3 p-0">Telefones</h2> 
                <div className="lista-telefones"> 
                    
                    {/* { (Object.keys(dadosAnunciante).length > 0 && Object.keys(dadosAnunciante).includes('telefones')) && dadosAnunciante.telefones.map((tel, index) => (
                        <a href={tel.app !== '0' ? `https://api.whatsapp.com/send?l=pt-BR&amp;phone=55${tel.ddd}${tel.numero.replace('-','')}&text=Oi,%20vim%20pelo%20seu%20site!` : `tel:0${tel.ddd}${tel.numero.replace('-','')}`} key={index} className={`${tel.app !== '0' ? 'whats ' : ''}d-block border p-3 my-4`} rel="noopener noreferrer nofollow" target="_blank"><span>{ `(${tel.ddd}) ${tel.numero}`}</span></a>
                    ))} */}

                </div>
                                                                    
            </Modal.Body>
        </Modal>

        <Modal className="modal-style" centered  onHide={() => handleClose('proposta')}>          
            <Modal.Body className="p-4">          
                <h2 className="font-24 m-0 p-0">Entre em Contato</h2> 
                <p className="font-12 opacity-75">Preencha o formulário abaixo</p>
                
                <form>                                                                                
                    <div className="row mx-0 font-14">

                        <div className="col-12 pb-2 mb-1 px-0">
                            <input type="text"  placeholder="NOME COMPLETO" value={formulario.nomecompleto} onChange={(e) => handleForm({ nomecompleto: e.target.value })} />
                        </div>
                        <div className="col-12 px-0 pb-2 mb-1">
                            <input type="email"  placeholder="E-MAIL" value={formulario.email} onChange={(e) => handleForm({email: e.target.value})} />
                        </div>                                        
                        <div className="col-2 px-0 pb-2 mb-1">                                            
                            <input type="text" placeholder="UF" maxLength="2"  value={formulario.uf} onChange={(e) => handleForm({uf: e.target.value})} /> 
                        </div>
                        <div className="col-10 px-0 pb-2 mb-1">
                            <input type="text"  placeholder="CIDADE" value={formulario.cidade} onChange={(e) => handleForm({cidade: e.target.value})} />
                        </div>
                        <div className="col-12 px-0 pb-2 mb-1">
                            <NumberFormat placeholder="CELULAR" format="(##) #####-####" mask="_" value={formulario.telefone} onChange={(e) => handleForm({telefone: e.target.value})} />
                        </div>
                        <div className="col-12 px-0 pb-2 mb-1">
                            <textarea  placeholder="MENSAGEM" value={formulario.mensagem} onChange={(e) => handleForm({mensagem: e.target.value})}></textarea>
                        </div>
                        <div className="col-12 pt-4 px-0 d-flex justify-content-end">
                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary font-14 py-2 px-5 shadow-sm" disabled={ loading ? true : false }>
                                { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                                ENVIAR
                            </button>  
                        </div>

                    </div>                                        
                </form> 
                                                                    
            </Modal.Body>
        </Modal>

         <ToastContainer /> 

    </>
  )
}

export async function getServerSideProps(context) {
const {query} = context;
 
  const corpo = await JSON.stringify( {
    acoes: [                        
      { metodo: "dadosimovel", params:  [{ registro: query.id }] },
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
    
  return {
    props: list, 
  }
}