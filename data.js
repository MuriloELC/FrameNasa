export const demo={name:'Observações de demonstração',source:'Dados sintéticos FrameNasa',license:'Exemplo local',simulated:true,records:[{label:'Amazonas',value:28.4,unit:'°C',date:'2026-01-01'},{label:'Pará',value:30.2,unit:'°C',date:'2026-01-01'},{label:'Acre',value:27.8,unit:'°C',date:'2026-01-01'}]};
export function parseCSV(text,{requireStandardColumns=true}={}){
 const rows=[];let row=[],field='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(Boolean))rows.push(row);row=[];field='';}else field+=c;}
 if(quoted)throw Error('CSV contém aspas não fechadas.');row.push(field);if(row.some(Boolean))rows.push(row);
 const headers=rows.shift()?.map(x=>x.trim().replace(/^\uFEFF/,''));if(!headers?.length||headers.some(h=>!h)||new Set(headers).size!==headers.length)throw Error('Cabeçalhos ausentes ou duplicados.');if(requireStandardColumns&&(!headers.includes('label')||!headers.includes('value')))throw Error('CSV precisa das colunas label e value.');
 return rows.map(r=>{if(r.length!==headers.length)throw Error('Número de colunas inconsistente.');return Object.fromEntries(headers.map((h,i)=>[h,r[i]]));});
}
export function mapRecords(rows,fields,{unit='',missingValues=[]}={}){
 if(!Array.isArray(rows))throw Error('Esperada uma lista de registros.');
 if(!fields?.label||!fields?.value)throw Error('Mapeie os campos label e value.');
 const selected=rows.filter(r=>!missingValues.includes(r?.[fields.value]));
 return validateRecords(selected.map(r=>({label:r?.[fields.label],value:r?.[fields.value],date:fields.date?r?.[fields.date]:'',unit:fields.unit?r?.[fields.unit]:unit})));
}
export function validateRecords(records){if(!Array.isArray(records)||!records.length)throw Error('Informe uma lista não vazia de registros.');if(records.length>10000)throw Error('Limite de 10.000 registros.');return records.map((r,i)=>{if(!r||typeof r.label!=='string'||!r.label.trim()||!['number','string'].includes(typeof r.value)||String(r.value).trim()===''||!Number.isFinite(Number(r.value)))throw Error(`Registro ${i+1}: label e value numérico são obrigatórios.`);return {label:r.label,value:Number(r.value),unit:String(r.unit??''),date:String(r.date??'')};});}
export async function importFile(file){if(file.size>2*1024*1024)throw Error('Limite de arquivo: 2 MB.');const text=await file.text();const csv=file.name.toLowerCase().endsWith('.csv');if(!csv&&!file.name.toLowerCase().endsWith('.json'))throw Error('Escolha CSV ou JSON.');const parsed=csv?parseCSV(text):JSON.parse(text);return {name:file.name,source:typeof parsed?.source==='string'?parsed.source:'Arquivo local — fonte a documentar',license:typeof parsed?.license==='string'?parsed.license:'Não informada',simulated:parsed?.simulated===true,records:validateRecords(Array.isArray(parsed)?parsed:parsed?.records)};}
