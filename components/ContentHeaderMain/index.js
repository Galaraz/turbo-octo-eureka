import React, { useState, useEffect, useRef, useContext } from 'react';
//import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import Select from 'react-select';
import { Range } from 'react-range';
import QueryString from 'querystring';
import {AuthContext} from '../../context';
import Valores from '../../pages/api/valores';
import utils from '../../pages/api/utils';

import { moneyFormatter } from '../../utils';


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



export default function ContentHeader(props) {

    const router = useRouter();

  
    const {finalidades,tipoimoveis ,estados,valores, loadingDados, setValores} = useContext(AuthContext);
    const {valor_maximo,valor_minimo} = valores;
    const [ loading, setLoading ] = useState(false);
    const [ formulario, setFormulario ] = useState({finalidade: '',tipo: '',uf: '',cidade: '',bairro: '',valorde: '',valorate: '',})
    const [cidade, setCidade] = useState([{ value: '', label: 'Selecione' }]);
    const [bairro, setBairro] = useState([{ value: '', label: 'Selecione' }]);
    
    function mudarDadosFormulario(dados){
        setFormulario({...formulario, ...dados});
    }
    
    async function handleOptionChange(tipo, valor) {
        
        if (tipo === 'finalidade') {
            let acao = "valores"
            let data = await Valores(acao ,valor);
            let response = await data.json();
            setValores(response.valores)
            setFormulario (  { ...formulario, finalidade: valor, valorde: parseInt(response.valores.valor_minimo), valorate: parseInt(response.valores.valor_maximo) });
       
        } else if (tipo === 'tipo') {
            setFormulario({ ...formulario, tipo: valor });
        } else if (tipo === 'uf') {
            let acao = "cidades"
            setFormulario({ ...formulario, uf: valor });
            setCidade([{value: '', label: 'Carregando'}]);
            let data = await utils(acao ,valor);
            let response = await data.json();            
            setCidade(response.cidades);
             
        } else if (tipo === 'cidade') {
            let acao = "bairros"
            setFormulario({ ...formulario, cidade: valor });
            setBairro([{value: '', label: 'Carregando'}]);
            let data = await utils(acao ,valor);
            let response = await data.json();          
            setBairro(response.bairros);
            
        } else if (tipo === 'bairro') {
            setFormulario({ ...formulario, bairro: valor });            
        } 

    }    

    function handleSubmit() {
        setLoading(true);
        router.push({
            pathname: '/busca',
            query: formulario,
        })
    }
 
    return (
        
        <div className="content-header-primary">
      
            <div className="container py-4 cardbusca">                
               
                <div className="content-search shadow">
                    <form className="d-flex flex-column h-100">
                        
                        <h2 className="font-24 m-0 pb-3 color-primary">Encontre no Site</h2>
                    
                        <div className="flex-grow-1">
                            <div className="row">
                                
                                <div className="col-12 pb-2 mb-1">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                     <Select className="select" classNamePrefix="react-select" placeholder="FINALIDADE" onChange={e => handleOptionChange('finalidade',e.value)} options={finalidades.map(item => {return { value: item, label:item}})} styles={customStyles}    />  
                                }  
                                </div>

                                <div className="col-12 pb-2 mb-1">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                     <Select className="select" classNamePrefix="react-select" placeholder="TIPO DO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoimoveis} styles={customStyles}   />  
                                 }   
                                </div>

                                <div className="col-12 col-md-4 pb-2 mb-1 pr-3 pr-md-0">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                     <Select className="select" classNamePrefix="react-select" placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={estados} styles={customStyles} />
                                }  
                                </div>

                                <div className="col-12 col-md-8 pb-2 mb-1 pl-3 pl-md-0">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    :
                                    <Select className="select" classNamePrefix="react-select" placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} styles={customStyles} />
                                }    
                                </div>

                                <div className="col-12 pb-2 mb-2">
                                { 
                                    loadingDados ? 
                                    <div style={{backgroundColor: '#d1d1d1', height: 40, width: '100%'}}/>
                                    : 
                                    <Select className="select" classNamePrefix="react-select" placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} styles={customStyles} />
                                }                                      
                                </div> 

                                <div className="col-12 pb-2 mb-1">
                                    
                                    <label className="d-block font-12 pb-3 ms-2"><div className="imputValorDesejado react-select__control ">VALOR DESEJADO</div></label>  
                                 
                                     <div>
                                        
                                     <Range
                                       
                                        // defaultValue={valores}
                                        min={ parseInt(valor_minimo) }
                                        max={ parseInt(valor_maximo)}
                                        values={[formulario.valorde || valor_minimo , formulario.valorate || valor_maximo]}
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

                                        {/* <Range allowCross={false}  min={valorMin} max={valorMax} value={slideValue} onChange={e => handleSlideChange({min: e[0], max: e[1]})} />  */}
                                        <div className="d-flex justify-content-between font-12 pt-3 pb-1 text-center">
                                            
                                            { loadingDados ? <div style={{backgroundColor: '#d1d1d1', height: 15, width: 80}}/> : <div>R$  {moneyFormatter(formulario.valorde || valor_minimo)} </div> } 
                                            { loadingDados ? <div style={{backgroundColor: '#d1d1d1', height: 15, width: 80}}/> : <div>R$  {moneyFormatter(formulario.valorate  || valor_maximo)}  </div> } 
                                       
                                        
                                            {/* <NumberFormat disabled className="bg-transparent w-50 font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valores.min} />
                                            <NumberFormat disabled className="bg-transparent w-50 text-right font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valores.max} />                                             */}
                                        </div>  
                                    </div> 
                                    

                                </div>                               

                            </div>
                        </div>
                        
                        <button type="button" className="btn btn-primary font-weight-bold font-14 w-100 py-3" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                            { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                            { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                        </button>

                    </form>
                </div>

            </div>
                
        </div>
        
    );
    
}
