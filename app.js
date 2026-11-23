import {demo,importFile} from './data.js';
import {renderBarChart} from './components.js';
import {mountMapping} from './mapping.js';
import {FRAMEWORK} from './config.js';
document.querySelector('header span').textContent=`PROTOTYPE LAB / v${FRAMEWORK.version} / ${FRAMEWORK.license}`;
const chartPanel=document.createElement('section');chartPanel.className='panel';
const chartTitle=document.createElement('h3');chartTitle.textContent='Comparação dos registros';
const chartNote=document.createElement('p');chartNote.textContent='Comprimento representa a magnitude; valores negativos são identificados pelo sinal e pela cor. Mesma ordem da tabela.';
const chartBody=document.createElement('div');chartPanel.append(chartTitle,chartNote,chartBody);document.getElementById('explorer').append(chartPanel);
const chartObserver=new MutationObserver(()=>{const records=[...document.querySelectorAll('#rows tr')].map(row=>({label:row.cells[0].textContent,value:Number(row.cells[1].textContent),unit:row.cells[2].textContent}));renderBarChart(chartBody,records);});chartObserver.observe(document.getElementById('rows'),{childList:true});
const modelsLink=document.createElement('a');modelsLink.href='/patterns.html';modelsLink.textContent='03 / Modelos de telas';document.querySelector('nav').append(modelsLink);
const $=id=>document.getElementById(id);let dataset=demo;
mountMapping($('explorer'),next=>{dataset=next;$('search').value='';render();});
function render(){const records=dataset.records.filter(r=>r.label.toLocaleLowerCase().includes($('search').value.toLocaleLowerCase()));$('count').textContent=records.length;$('mode').textContent=dataset.simulated?'Dados simulados':'Arquivo importado';$('source').textContent=`${dataset.source} · Licença: ${dataset.license}`;$('rows').replaceChildren(...records.map(r=>{const tr=document.createElement('tr');for(const value of [r.label,r.value,r.unit,r.date]){const td=document.createElement('td');td.textContent=value;tr.append(td);}return tr;}));$('empty').hidden=records.length>0;}
$('search').addEventListener('input',render);$('reset').onclick=()=>{dataset=demo;$('search').value='';$('status').textContent='Demonstração restaurada. Valores sintéticos.';render();};$('file').onchange=async e=>{const file=e.target.files[0];if(!file)return;$('status').textContent='Carregando arquivo…';try{dataset=await importFile(file);$('search').value='';render();$('status').textContent='Arquivo importado. Confira fonte e licença antes de publicar.';}catch(error){$('status').textContent=`Não foi possível importar: ${error.message}`;}finally{e.target.value='';}};render();
