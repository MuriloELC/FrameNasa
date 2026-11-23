# Padrões de adaptação de dados

O FrameNasa não inclui endpoints, links, credenciais ou adaptadores exclusivos de nenhum provedor de dados. O projeto criado durante o hackathon escolhe suas fontes e configura a importação naquele momento.

| Família de dados | Estrutura comum | Tela a priorizar |
|---|---|---|
| Séries temporais | data, valor, unidade e localização | Gráfico, período e comparação |
| Observações geográficas | latitude, longitude, data e atributos | Mapa ou grade de locais |
| Catálogos | identificador, título, descrição e metadados | Busca, cartões e detalhes |
| Imagens e mídia | URL do arquivo, data, legenda e créditos | Galeria e comparação |
| Eventos | instante, categoria, intensidade e posição | Linha do tempo, filtros e alertas |

## Adaptador tabular disponível

O framework aceita exportações reduzidas CSV/JSON. Para colunas diferentes, use as funções de `data.js`:

```js
const rows = parseCSV(csvText, { requireStandardColumns: false });
const records = mapRecords(rows,
  { label: 'station', value: 'temperature', date: 'date' },
  { unit: '°C', missingValues: ['-999'] });
```

Os nomes acima são exemplos, não o esquema de um provedor. Sentinelas de ausência são específicas de cada conjunto; configure-as explicitamente e preserve valores negativos legítimos. A função mantém datas como texto, sem converter calendários ou fusos.

Verifique a origem, os formatos, as unidades, a licença, a resolução e a autenticação antes de construir um adaptador específico. O navegador não processa diretamente HDF, NetCDF ou FITS nesta versão. Para prototipagem, prepare uma amostra reduzida e mantenha referência ao produto original. Para JSON remoto, consulte `API_IMPORT.md`.

## Próxima ampliação de telas

`patterns.html` inclui série temporal com período selecionável, grade esquemática de coordenadas com seleção de pontos e catálogo pesquisável com detalhes. São modelos sintéticos para prototipagem; não incluem mapa-base, processamento científico ou conexão com APIs. As interações de período, seleção, busca e expansão foram verificadas no navegador.
