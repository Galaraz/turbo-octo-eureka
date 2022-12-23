import React, { useState, useEffect, useContext} from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Select from 'react-select';
import QueryString from 'querystring';
import {AuthContext} from '../../context';
import Search from '../../img/search.svg';

import { existsOrError } from '../../utils';

import ultils from '../../pages/api/utils';



const customStyles = {
    iconSearch: {
        width:30
    },
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





export default function ContentHeader(props) {

    const router = useRouter();
    
    const {finalidades,tipoimoveis ,estados ,valores} = useContext(AuthContext);
    const [ show, setShow ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ formulario, setFormulario ] = useState({ finalidade:'' , tipo:'', uf:'' , cidade: '', bairro: '', valorde: '', valorate: '' });
    const [ finalidade, setFinalidade ] = useState(finalidades);
    const [ tipoImovel, setTipoImovel ] = useState(tipoimoveis);
    const [ uf, setUf ] = useState(estados);
    const [ cidade, setCidade ] = useState([]);        
    const [ bairro, setBairro ] = useState([]);
    const [ valorMin, setvalorMin] = useState(0);    
    const [ valorMax, setvalorMax] = useState(100);


    
    const formularioSelecionados = {
        finalidade: finalidade?.filter(item => item.value == formulario.finalidade),
        tipoImovel: tipoImovel?.filter(item => item.value == formulario.tipo),
        uf: uf?.filter(item => item.value == formulario.uf),
        cidade: cidade?.filter(item => item.value == formulario.cidade),
        bairro: bairro?.filter(item => item.value == formulario.bairro),
        
    } 

    
    useEffect(() => {
       getValores();
        if (props.dadosFiltrados)  setFormulario(props.dadosFiltrados)  ;
      
    },[show]); 
    
    // const refStorage = useRef(true);
    // useEffect(() => {        
    //     if (refStorage.current) { refStorage.current = false;return; }
    //     getValores();
    // },[ ]);

 
    function handleSlideChange(values) {
        
        if(values.min != formulario.valorde) return handleOptionChange('valorde', values.min)
        handleOptionChange('valorate', values.max)
        
    }
    function getValores() {
        setFinalidade(finalidades);
        setTipoImovel(tipoimoveis);
        setUf(estados);
        
        if (existsOrError(valores)) {
                
            setvalorMin(parseInt(valores.valor_minimo));
            setvalorMax(parseInt(valores.valor_maximo));
            
        } 
        if (formulario.uf) getCidade(formulario.uf);
        if (formulario.cidade) getBairro(formulario.cidade);        
    }    
    
    useEffect(() => {
        setFormulario({ ...formulario, valorde: valores.min, valorate: valores.max });               
    },[valores]);

    async function getCidade(valor) {
        const metodo = "cidades";
        const response = await ultils(metodo, valor);         
        response.unshift({value:'',label:'CIDADE'});
        
        setCidade(response); 
    }

    async function getBairro(valor) {
        const metodo ="bairros";
        const response = await ultils(metodo,valor);            
        response.unshift({value:'',label:'BAIRRO'});
        setBairro(response); 
    }

    async function handleOptionChange(tipo, valor) {
        
        if (tipo === 'finalidade') {
            const response = await ultils(tipo, valor);                        
   
            setvalorMin(parseInt(response.valor_minimo));
            setvalorMax(parseInt(response.valor_maximo));
            setFormulario({ ...formulario, finalidade: valor });
        } else if (tipo === 'tipo') {
            setFormulario({ ...formulario, tipo: valor });
        } else if (tipo === 'uf') {
            setFormulario({ ...formulario, uf: valor });
            setCidade([{value: '', label: 'Carregando'}]);
            getCidade( valor )
        } else if (tipo === 'cidade') {
            setFormulario({ ...formulario, cidade: valor });
            setBairro([{value: '', label: 'Carregando'}]);
            getBairro(valor);
        }else if (tipo === 'bairro') {
            setFormulario({ ...formulario, bairro: valor });            
        } else if (tipo === 'valorde') {            
            setFormulario({ ...formulario, valorde: valor });
        } else if (tipo === 'valorate') {
            setFormulario({ ...formulario, valorate: valor });                     
        }
    }

    async function handleSubmit() {
        setLoading(true); 
            props.busca ?  props.callbackchage(formulario)
                :
            props.routes.history.push(`/busca?${QueryString.stringify(formulario)}`);
           
        setLoading(false);
        setShow(false);
    }    
    
    const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);

    return (
        <>
        <div className="content-header">        
            <div className="d-flex align-items-center justify-content-between container py-4">
                <h1 className="font-20 font-md-28 text-center text-md-left m-0 text-white">{props.title}</h1> 
                <button  className={`p-1 m-0 bg-transparent border-0${props.noSearch ? ' d-block d-md-none' : ''}`}>
                    <Image src={Search} onClick={handleShow} width="100" height="100" style={customStyles.iconSearch} />
                </button>
            </div>                
        </div>
        <Modal className="modal-style" centered show={show} onHide={handleClose}>          
            <Modal.Body className="p-4">          
                <h2 className="font-24 m-0 pb-3">Encontre no Site</h2>      
                <div className="row py-2">
                                
                    <div className="col-12 pb-2 mb-1">
                        {finalidade&& 
                        <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.finalidade} onChange={e => handleOptionChange('finalidade',e.value)}  placeholder="FINALIDADE" options={finalidade} menuPortalTarget={document.body}
                        styles={customStyles} />
                        }
                         
                    </div>

                    <div className="col-12 pb-2 mb-1">
                        {/* <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.tipoImovel} placeholder="TIPO DO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoImovel} menuPortalTarget={document.body}
                            styles={customStyles} />  */}
                    </div>

                    <div className="col-12 col-md-4 pb-2 mb-1 pr-3 pr-md-0">
                        {/* <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.uf}  placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={uf} menuPortalTarget={document.body}
                            styles={customStyles}  /> */}
                    </div>

                    <div className="col-12 col-md-8 pb-2 mb-1 pl-3 pl-md-0 ">
                        {/* <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.cidade}  placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} menuPortalTarget={document.body}
                            styles={customStyles} noOptionsMessage={() => 'Selecione'} /> */}
                    </div>

                    <div className="col-12 pb-2 mb-2">
                         {/* <Select className="select" classNamePrefix="react-select" value={formularioSelecionados.bairro} placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} menuPortalTarget={document.body} 
                            styles={customStyles} noOptionsMessage={() => 'Selecione'} />                                         */}
                    </div>

                    <label className="d-block col-12 pb-2 select "><div className="imputValorDesejado">VALOR DESEJADO</div></label>  
                    
                        <div className="col-12 pb-2 mb-2 rageStyleMobile">
                          
                            {/* <Range
                             allowCross={false}
                             min={valorMin}
                             max={valorMax}
                            //  value={[formulario.valorde ? formulario.valorde : valorMin, formulario.valorate ? formulario.valorate : valorMax ]}
                             value={[0,100 ]}
                             onChange={e => handleSlideChange({min: e[0], max: e[1]})}
                             renderTrack={({ props, children }) => (
                                <div
                                  {...props}
                                  style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    
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
                                    height: '42px',
                                    width: '42px',
                                    
                                  }}
                                />
                              )}

                            />  */}
                            <div className="d-flex justify-content-between font-12 pt-3 pb-1 text-center">
                                {/* <NumberFormat disabled className="bg-transparent w-50 font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={formulario.valorde ? formulario.valorde : valorMin} />
                                <NumberFormat disabled className="bg-transparent w-50 text-right font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={formulario.valorate ? formulario.valorate : valorMax } />  */}
                            </div>  
                        </div>

                </div>
                
                <button type="button" className="btn btn-primary font-weight-bold font-14 w-100 px-4 py-3 shadow" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                    { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                    { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                </button>   
                                                                    
            </Modal.Body>
        </Modal>

        </>
        
    );
    
}
