import {parseCSV,mapRecords} from './data.js';
export function mountMapping(container,onDataset){
 const panel=document.createElement('section');panel.className='panel';
 const heading=document.createElement('h3');heading.textContent='Mapear colunas de um CSV';
 const file=document.createElement('input');file.type='file';file.accept='.csv';file.setAttribute('aria-label','CSV para mapeamento');
 const form=document.createElement('form');form.hidden=true;const controls={};
 for(const [key,label] of Object.entries({label:'Coluna de identificação',value:'Coluna numérica',date:'Coluna de data',unit:'Coluna de unidade'})){
  const wrapper=document.createElement('label');wrapper.textContent=label;const select=document.createElement('select');controls[key]=select;wrapper.append(select);form.append(wrapper);
 }
 const source=document.createElement('input');source.placeholder='Fonte ou URL';source.setAttribute('aria-label','Fonte dos dados');form.append(source);
 const license=document.createElement('input');license.placeholder='Licença';license.setAttribute('aria-label','Licença dos dados');form.append(license);
 const simulationLabel=document.createElement('label');const simulation=document.createElement('input');simulation.type='checkbox';simulationLabel.append(simulation,document.createTextNode('Dados simulados'));form.append(simulationLabel);
 const submit=document.createElement('button');submit.textContent='Aplicar mapeamento';form.append(submit);
 const status=document.createElement('p');status.setAttribute('role','status');let rows=[];
 file.onchange=async()=>{form.hidden=true;const selected=file.files[0];if(!selected)return;try{if(selected.size>2097152)throw Error('Limite de 2 MB.');rows=parseCSV(await selected.text(),{requireStandardColumns:false});if(!rows.length)throw Error('Arquivo sem registros.');for(const [key,select] of Object.entries(controls)){select.replaceChildren();if(['date','unit'].includes(key))select.add(new Option('Não usar',''));for(const name of Object.keys(rows[0]))select.add(new Option(name,name));if(Object.hasOwn(rows[0],key))select.value=key;}form.hidden=false;status.textContent=`${rows.length} registros disponíveis. Selecione as colunas.`;}catch(error){status.textContent=error.message;}};
 form.onsubmit=event=>{event.preventDefault();try{const records=mapRecords(rows,Object.fromEntries(Object.entries(controls).map(([key,input])=>[key,input.value])));onDataset({name:file.files[0]?.name,source:source.value||'Fonte não informada',license:license.value||'Não informada',simulated:simulation.checked,records});status.textContent='Mapeamento aplicado à tabela e ao gráfico.';}catch(error){status.textContent=error.message;}};
 panel.append(heading,file,form,status);container.append(panel);
}
