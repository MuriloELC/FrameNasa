import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCSV,validateRecords,importFile,mapRecords} from '../data.js';
test('Mapeamento converte colunas e exclui apenas sentinelas declaradas',()=>{
 const rows=parseCSV('station,temp,day\nA,25,20260101\nB,-999,20260102',{requireStandardColumns:false});
 assert.deepEqual(mapRecords(rows,{label:'station',value:'temp',date:'day'},{unit:'°C',missingValues:['-999']}),[{label:'A',value:25,unit:'°C',date:'20260101'}]);
 assert.equal(mapRecords(rows,{label:'station',value:'temp'})[1].value,-999);
 assert.throws(()=>parseCSV('label,value,value\nA,1,2'));
});
test('CSV preserva vírgulas, aspas e quebras em campos citados',()=>{
 assert.deepEqual(parseCSV('label,value\r\n"Rio, Amazonas",2\r\n"Linha\n""dupla""",3'),[{label:'Rio, Amazonas',value:'2'},{label:'Linha\n"dupla"',value:'3'}]);
});
test('CSV rejeita estrutura incompleta',()=>{
 for(const text of ['name,value\na,1','label,value\na,1,2','label,value\n"a,1'])assert.throws(()=>parseCSV(text));
});
test('Validação rejeita valores ausentes, booleanos e listas vazias',()=>{
 for(const value of [null,undefined,'',true,[],Infinity,'não numérico'])assert.throws(()=>validateRecords([{label:'Teste',value}]));
 assert.throws(()=>validateRecords([]));
 assert.equal(validateRecords([{label:'Teste',value:'2.5'}])[0].value,2.5);
});
test('Importação JSON conserva proveniência e simulação',async()=>{
 const file=new File([JSON.stringify({source:'Experimento',license:'CC0',simulated:true,records:[{label:'A',value:2}]})],'sample.json');
 const result=await importFile(file);assert.equal(result.source,'Experimento');assert.equal(result.simulated,true);
});
test('Importação rejeita JSON inválido e arquivos grandes',async()=>{
 await assert.rejects(importFile(new File(['{'],'bad.json')));
 await assert.rejects(importFile({size:2097153}));
 await assert.rejects(importFile(new File(['null'],'null.json')));
});
