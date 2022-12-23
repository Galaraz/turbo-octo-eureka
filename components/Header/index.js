import React, { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';

// import { NavLink, Link } from 'react-router-dom';

import { apiUrl, apiId, scrollTopDist, headerFixed, urlImgs } from '../../utils';

import Logo from '../../img/logo.png';
import SemFoto from '../../img/sm-perfil.png';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { verificarCreci } from '../../utils';
import { AuthContext } from '../../context';



const customStyles = {
    content: {
      top:  '50%',
      left:  '50%',
      right:  'auto',
      bottom:  'auto',
      maxWidth: 320,
      maxHeight: 600,
      marginRight: '-50%',
      paddingBottom: 50,
      transform: 'translate(-50%, -50%)',
      overlay:{ zIndex: 120},
        
    },
    
  };

export default function Header(props) {
    const {anunciante,finalidades,perfilcorretores} = useContext(AuthContext);
    let subtitle ="";

   
     // const [ anunciante, setanunciante ] = useState({});
    // const [ finalidades, setFinalidades ] = useState([]);
    const [ showHeaderFixed, setShowHeaderFixed ] = useState(false);
    const [ showScrollTop, setShowScrollTop ] = useState(false);
    const [ modalIsOpen, setIsOpen] = useState(false);
    // const [corretores, setCorretores] = useState(['']);
    const [ loading, setLoading ] = useState(true);

    async function openModal() {
        setIsOpen(true);
        
        dispatch({ type: 'ADD_OPEN', show: false });
        setLoading(false);
           
     }
 
     function afterOpenModal() {
        subtitle.style.color = '#f00';
     }
 
     function closeModal() {
        setIsOpen(false);
     }
 

     const ListaCorretores = perfilcorretores.map((corretor) =>
                                          
     <div className="corretor" key={corretor.id}>
      <div className ="esquerda imagem-corretor">
        {
            corretor && corretor.foto  ?
             <Image className="imagem-corretor" src= {urlImgs+'/'+corretor.foto} alt="imagem corretor"/>
            :
             <Image  className="imagem-corretor" src= {SemFoto} alt="imagem corretor"/>
        }
      </div>
      <div className ="direita">
          <div className ="nome-corretor">{corretor.nome}</div>
          <div className="texto font-14">Creci: {corretor.creci}</div>
          <div className="texto font-14">{corretor.texto}</div>
      </div>
     </div>

 ); 

 


     


    return (
        <>
        <header className="d-flex align-items-center header">              

            <div className="container d-flex flex-column flex-md-row align-items-center pt-1  pt-md-0 pb-md-0">
            
                <div className="logo pt-4 pb-3 pt-lg-0 pb-lg-0">
                    <Link href="/"><Image src={Logo} alt="Imobiliaria Test" /></Link>
                </div>

                <button onClick={() => handleOpenMenu()} className="d-block d-md-none btn-menu primary border-0 font-16 m-3">MENU<div><span></span></div></button>

                <div className="d-flex justify-content-end flex-grow-1">
                   
                    <div >
                        
                        <nav className="d-none d-md-block menu-topo pt-0 pb-3 pt-md-2 pb-md-2 pt-xl-0 pb-xl-0 text-center text-md-right">
                            <Link href="/" exact>HOME</Link>
                            { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada') ) && <Link href="/aluguel">ALUGUEL</Link> }
                            { finalidades.includes('Venda') && <Link href="/venda">VENDA</Link> }
                            <Link href="/banco-de-pedidos">BANCO DE PEDIDOS</Link>
                            <Link href="/fale-conosco">FALE CONOSCO</Link>
                        </nav>

                        <div className="header-dados d-flex flex-column flex-md-row justify-content-end pt-0 pt-xl-3 font-12 font-xl-14 ">
                            
                            <div className="px-0 px-md-3 px-xl-4 py-1 py-xl-0 text-center text-md-right">
                                <div>
                                    { (Object.keys(anunciante).length > 0 && Object.keys(anunciante).includes('telefones')) && anunciante.telefones.map((tel, index) => (          
                                        <>                              
                                            <a href={tel.app !== '0' ? `https://api.whatsapp.com/send?l=pt-BR&amp;phone=55${tel.ddd}${tel.numero.replace('-','')}&text=Oi,%20vim%20pelo%20seu%20site!` : `tel:0${tel.ddd}${tel.numero.replace('-','')}`} key={index} className={tel.app !== '0' ? 'whats' : ''} rel="noopener noreferrer nofollow" target="_blank">{ `(${tel.ddd}) ${tel.numero}`}</a>
                                            { anunciante.telefones.length !== (index+1) && ' / ' }
                                        </>
                                    ))}
                                </div>
                                <div className="creci">
                                    { (Object.keys(anunciante).length > 0 && Object.keys(anunciante).includes('creci')) && `CRECI: ${anunciante.creci}`}
                                </div>
                            </div>
                            
                            <div className="px-0 px-md-3 px-xl-4 py-1 py-xl-0 text-center text-md-right">
                                { Object.keys(anunciante).length > 0 && `${anunciante.endereco}`}<br />
                                { Object.keys(anunciante).length > 0 && `${anunciante.bairro} - ${anunciante.cidade}/${anunciante.uf}`}
                            </div>

                        </div>

                    </div>
                    
                </div>
            </div>            
            
        </header>

        { headerFixed && (
            <>
            <header className={`${ showScrollTop ? 'show ' : '' }header-fixed`}>
                <div className="d-flex justify-content-between container py-2">
                    
                    <div className="d-flex align-items-center logo">
                        <Link href="/"> <Image src={Logo} alt="lojatest - Corretora de Imóvies" /> </Link>
                    </div>

                    <button onClick={() => handleOpenMenu()} className={`d-block d-md-none btn-menu border-0 font-16`}>MENU<div><span></span></div></button>
                    <nav className="d-none d-md-flex align-items-center justify-content-end menu-topo flex-grow-1">
                        <Link href="/" exact>HOME</Link>
                        { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada') ) && <Link href="/aluguel">ALUGUEL</Link> }
                        { finalidades.includes('Venda') && <Link href="/venda">VENDA</Link> }
                        <Link href="/banco-de-pedidos">BANCO DE PEDIDOS</Link>
                        <Link href="/fale-conosco">FALE CONOSCO</Link>
                    </nav>

                </div>
            </header>

            <nav className={`d-block d-md-none menu-topo-fixed`}>
                <Link onClick={() => handleOpenMenu()} href="/" exact>HOME</Link>
                { (finalidades.includes('Aluguel') || finalidades.includes('Aluguel/Temporada') ) && <Link onClick={() => handleOpenMenu()} href="/aluguel">ALUGUEL</Link> }
                { finalidades.includes('Venda') && <Link onClick={() => handleOpenMenu()} href="/venda">VENDA</Link> }
                {
                ListaCorretores.length > 0 ? 
                    <Link href="/" onClick={openModal} className="menu-topo-fixed-corretor" ref={(_subtitle) => (subtitle = _subtitle)}>{verificarCreci(anunciante.creci).toUpperCase()}</Link>
                     : 
                    ''
                }
                <Link onClick={() => handleOpenMenu()} href="/banco-de-pedidos">BANCO DE PEDIDOS</Link> 
                <Link onClick={() => handleOpenMenu()} href="/fale-conosco">FALE CONOSCO</Link>
            </nav>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal corretores"
                disabled={ loading ? true : false }
                
            >
                                       
                <h2 className="tituloModal font-20 font-md-28" ref={(_subtitle) => (subtitle = _subtitle)}>{verificarCreci(anunciante.creci )}</h2>
                { 
                    loading ? 
                        <div className="estilo-carregado"><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" /></div>
                        :
                    ListaCorretores
                }
                <Button onClick={closeModal} className="btn-fechar-corretor">Fechar</Button>
                
            </Modal>
            </>
        ) }
        

        <div className={`${ showScrollTop ? 'show ' : '' }btnToTop p-4`}>
            <button className="d-flex justify-content-center align-items-center text-white border-0 font-10" type="button" onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}>
                <div>TOPO</div>
            </button>
        </div>

        
        </>
    );
}

