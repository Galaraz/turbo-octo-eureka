import { useState, useEffect, useContext } from 'react';
// import { useSelector } from 'react-redux'
import  Link  from 'next/link';
import Image from 'next/image';
import  Head from 'next/head';
//import ContentHeade from '../components/ContentHeader/index.js';
import { useRouter } from 'next/router'
import { AuthContext } from '../context';
import { Range } from 'react-range';
import Utils from '../pages/api/utils';
import Valores from '../pages/api/valores'
import Select from 'react-select';
// import Skeleton from '../../components/Skeleton';
// import NumberFormat from 'react-number-format';
import Paginate from 'react-js-pagination';
// import QueryString from 'querystring';
import buscar from './api/buscar';


import { urlImgs, moneyFormatter, titleSite, itensPorPagina, handleUrl, descriptionDefault, urlSite,  urlFavicon } from '../utils';

import SmFoto from '../img/sm-foto.jpg';
import Place from '../img/place.svg';


// const Range = Slider.Range;

const customStyles = {
    
    menuPortal: provided => ({ ...provided, zIndex: 9999, fontSize: 14 }),
    menuList: (base) => ({
        ...base,
    
        "::-webkit-scrollbar": {
          width: "4px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1"
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555"
        }
      })
    
  }


export default function Busca(props) {    
     const router = useRouter();

    const {finalidades,tipoimoveis,estados,valores ,loadingDados} = useContext(AuthContext) ;
    const {valor_maximo,valor_minimo} = valores;
    const queryInicial = router.query;
       
    //const queryInicial = QueryString.parse(props.location.search.replace('?',''));
    // if (queryInicial.pg) delete queryInicial.pg;
    // if (queryInicial.ordenacao) delete queryInicial.ordenacao;

    const [ formulario, setFormulario ] = useState(  { finalidade:'' , tipo:'', uf:'' , cidade: '', bairro: '', valorde: '', valorate: '' });  
    const arrayFinalidades = finalidades.map(item => {return { value: item, label:item}})
    // const [ pageSkeleton, setPageSkeleton ] = useState(true);        
    const [ totalImoveis, setTotalImoveis ] = useState();
    const [ listaImoveis, setImoveis ] = useState([]);
    // const [ filtros ] = useState([                
    //     { value: 'default', label: 'FILTRAR' },
    //     { value: 'recentes', label: 'Recentes' },
    //     { value: 'relevancia', label: 'Relevância' },
    //     { value: 'menorvalor', label: 'Menor Valor' },
    //     { value: 'maiorvalor', label: 'Maior Valor' },
    // ]);
    const [ pagina, setPagina ] = useState(0);
    // const [ filtrado, setFiltrado ] = useState('');

   /****** BUSCA *******/

   const [ loading, setLoading ] = useState(true);    
   
//    const [ tipoImovel, setTipoImovel ] = useState(tipoimoveis);
//    const [ uf, setUf ] = useState([]);
   const [ cidade, setCidade ] = useState([]);        
   const [ bairro, setBairro ] = useState([]); 
//    const [ valor, getValores ] = useState([{min:0, max:100}]);

//    const [rangeLimits, setRangeLimits] = useState({min: valor_minimo, max: valor_minimo });


   useEffect(()=>{
    setFormulario(queryInicial)
    getDados(queryInicial);
   },[]);

   useEffect(() => {
     handleRequisicao()
   },[pagina])

    function mudarDadosFormulario(dados){
     setFormulario({...formulario, ...dados});
    }
 
    useEffect(() => {
        if (window.innerWidth > 770) return 
         handleRequisicao()
    }, [formulario]);

    function handleRequisicao(){

        router.push({
            pathname:"/busca",
            query: {...formulario,...{pg: pagina}},
        })

        if (formulario.uf) getCidade(formulario.uf);
        if (formulario.cidade) getBairro(formulario.cidade);
        if (formulario.valorde || formulario.valorate ) getValores({min: formulario.valorde, max: formulario.valorate}); 
       
        getDados({...formulario,...{pg: pagina}});
        handleScroll()
    }
   
    function handleScroll() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

   async function getCidade(valor) {
        const metodo =  "cidades";
        const response = await Utils( metodo ,valor);   
        const data = await response.json();
        setCidade(data.cidades); 
    }

    async function getBairro(valor) {
        const metodo =  "bairros";
        const response = await Utils( metodo ,valor); 
        const data = await response.json();           
        setBairro(data.bairros); 
    }
    

    async function handleOptionChange(tipo, valor) {        
       
        switch (tipo) {
            
            case 'finalidade':
                const response =  await Valores( tipo ,valor);
            
                // setRangeLimits({min: parseInt(response.valor_minimo), max: parseInt(response.valor_maximo)});
                setFormulario({ ...formulario, ...{finalidade: valor, valorde: parseInt(response.valor_minimo), valorate: parseInt(response.valor_maximo)} });
                break;

            case 'tipo':
                setFormulario({ ...formulario, ...{tipo: valor} });
                break;

            case 'uf':
                setFormulario({ ...formulario, uf: valor });
                setCidade([{value: '', label: 'Carregando'}]);
                getCidade(valor)
                break;

            case 'cidade':
                setFormulario({ ...formulario, cidade: valor });
                setBairro([{value: '', label: 'Carregando'}]);
                getBairro(valor)
                break;

            case 'bairro':
                setFormulario({ ...formulario, bairro: valor }); 
                break;

            case 'valorde':
                setFormulario({ ...formulario, valorde: valor });
                break;

            case 'valorate':
                setFormulario({ ...formulario, valorate: valor }); 
                break;
                
            default:
                
                break;
        }
        
      
       
    }

    async function handleSubmit() {
        setLoading(true);
      
        
        // const novaUrl = new Array();
   
        router.push({
            pathname: '/busca',
            query: {...formulario,...{pg: pagina}},
        })

        getDados({...formulario,...{pg: pagina}});
        
    }
    
    async function getDados({ ...search }) {     
        
        setLoading(true);
       
             
       
        const result = await buscar(search);
        const list = await result.json()
                      
        setTotalImoveis(list.busca.total_registros);
        setImoveis(list.busca.total_registros ? list.busca.imoveis : []);
        
        setTimeout(() => {setLoading(false)}, 100);
      
    }

    let renderSkeletonList = [];
    for (let i = 0; i < itensPorPagina; i++) { renderSkeletonList[i] = i; }

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

                <meta name="description" content={descriptionDefault} />
                <meta name="og:site_name" property="og:site_name" content={titleSite} />
                <meta name="og:title" property="og:title" content={`Resultado da Busca | ${titleSite}`} />
                <meta name="og:url" property="og:url" content={`${urlSite}/busca${queryInicial}`} /> 
                <meta name="og:description" property="og:description" content={descriptionDefault} />                             
                <meta name="og:image" property="og:image" content={`${urlFavicon}padrao.png`} />
                <meta name="og:image:width" property="og:image:width" content="300" />
                <meta name="og:image:height" property="og:image:height" content="300" />
                <title>Resultado da Busca | { titleSite }</title>
            </Head>
            
            <div className="main">
       
                {/* <ContentHeade title="Resultado da Busca" noSearch={true}  callbackchage={ (dadosFormulario) => setFormulario(dadosFormulario) } busca dadosFiltrados={formulario}/> */}
                
                <div className="container px-4 px-sm-0">

                    <div className="d-none d-md-block searchbox mt-2 mt-md-5 ">
                        <div className="row shadow mx-0 p-4">
                            
                            <div className="col-3">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                    <Select className="select" classNamePrefix="react-select" value={arrayFinalidades.find(item => item.value == (queryInicial.finalidade || formulario.finalidade) )} placeholder="FINALIDADE" onChange={e => handleOptionChange('finalidade',e.value)}  options={arrayFinalidades} 
                                    styles={customStyles} />
                                }
                            </div>
                            <div className="col-3">
                                
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :    
                                    <Select className="select" classNamePrefix="react-select" value={tipoimoveis.find(item => item.value == formulario.tipo)} placeholder="TIPO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoimoveis} 
                                    styles={customStyles} />
                                 }
                            </div>
                            <div className="col-2">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                    <Select className="select" classNamePrefix="react-select" value={estados.find(item => item.value == formulario.uf)} placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={estados} 
                                    styles={customStyles} />
                                 }
                            </div>
                            <div className="col-4">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                    <Select className="select" classNamePrefix="react-select" value={ cidade.find(item => item.value == formulario.cidade)} placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} noOptionsMessage={() => 'Selecione'}
                                    styles={customStyles}/> 
                                }
                            </div>
                            <div className="col-3 pt-3">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                    <Select className="select" classNamePrefix="react-select" value={bairro?.find(item => item.value == formulario.bairro)} placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} noOptionsMessage={() => 'Selecione'}  
                                    styles={customStyles}
                                />
                                 }
                            </div>
                   
                            <div className="col-5 pt-3">
                                <label className="d-block  imputValorDesejadoB font-14 select pb-3 ms-3">VALOR DESEJADO</label>  
                                <div>
                                        
                                        <Range
                                           step={1}
                                           min={ parseInt(valor_minimo)  }
                                           max={ parseInt(valor_maximo)  }
                                           values={[ formulario.valorde ? formulario.valorde : valor_minimo , formulario.valorate ? formulario.valorate : valor_maximo ]}
                                           allowCross={false}
                                           allowOverlap={true}
                                           onChange={e => mudarDadosFormulario({valorde: e[0], valorate: e[1]})} 
                                           renderTrack={({ props, children }) => (
                                               <div
                                               {...props}
                                               // className="bg-transparent w-50 font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active"
                                               style={{
                                                   ...props.style,
                                                   height: '6px',
                                                   width: '100%',
                                                   backgroundColor: '#ccc'
                                               }}
                                               >
                                               {children}
                                               </div>
                                           )}
                                           renderThumb={({ props }) => (
                                               <div
                                               {...props}
                                              
                                               style={{
                                                   ...props.style,
                                                   height: '20px',
                                                   width: '20px',
                                                   borderRadius: '5px',
                                                   backgroundColor: '#48AAF0'
                                               }}
                                               />
                                           )}
                                           />
                                        
                                           <div className="d-flex justify-content-between font-12 pt-3 pb-1 text-center">
                                                { loadingDados ? <div style={{backgroundColor: '#d1d1d1', height: 15, width: 80}}/> : <div>R$ {moneyFormatter(formulario.valorde || valor_minimo)} </div> }
                                                { loadingDados ? <div style={{backgroundColor: '#d1d1d1', height: 15, width: 80}}/> :  <div>R$ {moneyFormatter(formulario.valorate || valor_maximo)} </div> }
                                                                                                               
                                           </div>  
                                       </div> 
                            </div> 

                            <div className="col-3 pt-4 ms-5">
                                <button type="button" className="btn btn-primary font-14 w-100 py-2" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                                    { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                                    { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                                </button>
                            </div>
                        </div>
                    </div>
           


                    { listaImoveis.length > 0 ?  (
                        <>
                        <header className= "d-flex topo-grid justify-content-between align-items-md-center flex-column flex-md-row pt-2 pt-md-5">
                            <div className="d-none d-md-block font-14 font-md-18 qtde pr-5">
                                <b className="pr-2">{totalImoveis > 1 ? `${totalImoveis} imóveis` : `${totalImoveis} imóvel` }</b>                                                               
                            </div>
                            <div>  
                                {/* <Select className="select filtro" classNamePrefix="react-select" defaultInputValue={filtrado ? filtrado : ''} onChange={(e) => handleOrdenacao(e.value)} name="" placeholder="FILTRAR" options={filtros} />                                 */}
                            </div>
                        </header>
                        <div className="row pt-2 pb-5">
                            
                            {  listaImoveis.map(imovel => {
                                return (
                                    <div key={imovel.id} className="col-12 col-md-6 col-xl-3 py-4">
                                        <Link href={`/imovel/${imovel.id}`} className="d-flex flex-column shadow h-100 item-grid">
                                            
                                            <div className="foto position-relative">
                                                { imovel.imagem ? (
                                                    <Image src={`${urlImgs}/${imovel.imagem}`} alt={imovel.tipo} width="290" height="100"/> 
                                                
                                                ) : <Image src={SmFoto} alt={imovel.tipo}  width="290" height="100"/> }      
                                                {/* <Skeleton className="skeleton-absolute" /> */}
                                            </div>
                                            <div className="d-flex flex-grow-1 flex-column px-3 py-3">
                                                
                                                <div className="flex-grow-2">
                                                    <div className="font-12 font-md-11 line-height-100">{imovel.finalidade}{imovel.tipo && <small className="ml-1 font-italic opacity-50">({imovel.tipo})</small>}</div>
                                                    <div className="font-20 color-primary">
                                                        { imovel.valor ? (
                                                            <b>R$ {moneyFormatter(imovel.valor)}</b>
                                                        ) :
                                                        (
                                                            <b>Consulte-nos</b>
                                                        ) }
                                                        
                                                    </div>
                                                    { imovel.valor_condominio && <div className="font-12 font-md-11 line-height-100">Condomínio: R$ {moneyFormatter(imovel.valor_condominio)}</div> }
                                                </div>

                                                <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                    <div className="d-flex">
                                                        { imovel.dormitorios != 0 && <div className="info info-dormitorios font-12 font-md-11 line-height-100 pr-3"><div>{imovel.dormitorios}</div></div> }
                                                        { imovel.banheiros != 0 && <div className="info info-banheiros font-12 font-md-11 line-height-100 pr-3"><div>{imovel.banheiros}</div></div> }
                                                        { imovel.area != 0 && <div className="info info-area font-12 font-md-11 line-height-100 pr-3"><div>{imovel.area} m<sup>2</sup></div></div> }
                                                    </div>
                                                </div>
                                                
                                                <div className="endereco font-12 line-height-130">
                                                    <Image src={Place} alt="" width="290" height="100"/>
                                                    {`${imovel.bairro} | ${imovel.cidade}/${imovel.uf}`}
                                                </div>
                                                
                                            </div>
                                            
                                        </Link>
                                    </div>
                                );

                            })  }

                        </div>

                        { totalImoveis > itensPorPagina && (
                            <div className="d-flex justify-content-center pt-2 pb-5 pagination-container">
                                <Paginate                                     
                                    hideFirstLastPages={true}
                                    activePage={pagina ? pagina : 1}
                                    itemsCountPerPage={itensPorPagina}
                                    totalItemsCount={totalImoveis}
                                    pageRangeDisplayed={5}
                                    onChange={e => setPagina(e)}
                                /> 
                            </div> 
                        ) }

                        </>                     
                    ) :(
                        loading ?
                           <div className="text-center py-5 my-5 font-32 opacity-50 "></div>
                       : 
                            <div className="text-center py-5 my-5 font-32 opacity-50">Nenhum imóvel encontrado</div> 
                                     
                   )}                                        

                </div>

            </div>

        </>

    )

    
}