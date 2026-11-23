# Importação genérica por API

O FrameNasa não contém catálogo de provedores, endpoints ou chaves. A aplicação derivada informa a URL em tempo de execução e escolhe como transformar a resposta JSON no contrato visual do framework.

## Fluxo básico

```js
import {fetchJsonApi, extractApiRecords} from './api-client.js';

const payload = await fetchJsonApi({
  url: endpointInformadoPeloUsuario,
  query: {start: '2027-01-01', end: '2027-01-07'},
  timeoutMs: 10000,
});

const records = extractApiRecords(payload, {
  recordsPath: 'data.items',
  fields: {label: 'place', value: 'measurement', date: 'date', unit: 'unit'},
  missingValues: [-999, null],
});
```

Para APIs que retornam uma série como objeto (`data -> chave: valor`), use `objectSeries: true` e mapeie os campos criados:

```js
const records = extractApiRecords(payload, {
  recordsPath: 'data.series',
  objectSeries: true,
  objectKeyField: 'date',
  objectValueField: 'measurement',
  fields: {label: 'date', value: 'measurement', date: 'date'},
  unit: 'unidade declarada pelo provedor',
});
```

## Limites e segurança

- HTTPS é obrigatório; HTTP só pode ser habilitado explicitamente para `localhost`.
- Credenciais não podem ser embutidas na URL. Cabeçalhos podem ser passados em memória, mas não devem ser gravados no código ou no repositório.
- O padrão limita a resposta a 2 MB e o timeout a 10 segundos.
- O cliente não contorna CORS. Quando a API não autoriza acesso pelo navegador, crie uma função de servidor própria e proteja as credenciais nela.
- Validar licença, unidade, valores ausentes, fuso, calendário, resolução e limitações científicas continua sendo responsabilidade do projeto derivado.

O cliente apenas transporta e normaliza JSON. Ele não confirma a qualidade científica dos dados nem concede direitos de uso.
