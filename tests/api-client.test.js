import test from 'node:test';
import assert from 'node:assert/strict';
import {buildApiUrl,getJsonPath,objectSeriesToRows,extractApiRecords,fetchJsonApi} from '../api-client.js';

test('URL de API exige HTTPS e combina parâmetros',()=>{
  assert.equal(buildApiUrl('https://example.test/data?fixed=1',{q:'a b'}).href,'https://example.test/data?fixed=1&q=a+b');
  assert.throws(()=>buildApiUrl('http://example.test/data'));
  assert.throws(()=>buildApiUrl('https://user:secret@example.test/data'));
  assert.equal(buildApiUrl('http://localhost:3000/data',{}, {allowLocalHttp:true}).protocol,'http:');
});

test('caminho e série de objeto são extraídos sem esquema de provedor',()=>{
  const payload={result:{series:{'20270101':12,'20270102':15}}};
  assert.deepEqual(getJsonPath(payload,'result.series'),payload.result.series);
  assert.throws(()=>getJsonPath(payload,'result.missing'));
  assert.deepEqual(objectSeriesToRows(payload.result.series,{keyField:'date',valueField:'reading'}),[
    {date:'20270101',reading:12},{date:'20270102',reading:15}
  ]);
  assert.deepEqual(extractApiRecords(payload,{recordsPath:'result.series',objectSeries:true,objectKeyField:'date',objectValueField:'reading',fields:{label:'date',value:'reading',date:'date'},unit:'u'}),[
    {label:'20270101',value:12,unit:'u',date:'20270101'},{label:'20270102',value:15,unit:'u',date:'20270102'}
  ]);
});

test('cliente valida status, tamanho e JSON',async()=>{
  const jsonFetch=async()=>new Response(JSON.stringify({items:[1]}),{status:200,headers:{'content-type':'application/json'}});
  assert.deepEqual(await fetchJsonApi({url:'https://example.test/data',fetchImpl:jsonFetch}),{items:[1]});
  await assert.rejects(fetchJsonApi({url:'https://example.test/data',fetchImpl:async()=>new Response('{}',{status:500})}),/HTTP 500/);
  await assert.rejects(fetchJsonApi({url:'https://example.test/data',maxBytes:2,fetchImpl:jsonFetch}),/excede/);
  await assert.rejects(fetchJsonApi({url:'https://example.test/data',fetchImpl:async()=>new Response('texto')}),/JSON válido/);
});
