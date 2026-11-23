# FrameNasa

Repositório público: https://github.com/MuriloELC/FrameNasa

Kit independente para prototipagem de interfaces de hackathon. HTML, CSS e JavaScript modular, sem dependências de runtime. Requer Node.js 22 ou superior para executar os scripts e testes. Versão atual: **0.2.0**, licenciada sob Apache-2.0.

## Executar

```sh
npm run dev
```

Abra http://localhost:5173. Execute `npm test` para validar ingestão e `npm run build` para gerar `dist`. A configuração `vercel.json` aponta para essa saída estática.

## Reutilizar a base

`style.css` contém tokens de cor, grades `.metrics` e `.cards`, cartões `.panel`, botões e adaptações mobile. `index.html` demonstra navegação por seções, métricas, busca e tabela. `app.js` conecta a interface ao contrato de dados de `data.js`. Copie os blocos de HTML e reutilize as classes para compor telas; não é necessário um framework de componentes.

## Ingestão

Importe CSV delimitado por vírgula com cabeçalhos `label,value,unit,date`, ou JSON no formato abaixo. `label` e `value` são obrigatórios; valores usam ponto decimal. Limites: 2 MB e 10.000 registros. CSV aceita campos citados e quebras de linha internas. XLSX, HDF e NetCDF precisam de conversão prévia.

```json
{
  "source": "URL ou identificação da fonte",
  "license": "Licença do conjunto",
  "simulated": true,
  "records": [{"label": "Exemplo", "value": 28.4, "unit": "°C", "date": "2026-01-01"}]
}
```

Para dados de qualquer provedor, transforme os campos do conjunto escolhido nesse contrato e preserve a origem e a licença. O kit não presume um formato universal. As importações ficam na memória do navegador e desaparecem ao recarregar. Nenhum arquivo local é enviado pelo servidor de demonstração.

Para respostas JSON remotas, `api-client.js` oferece requisição HTTPS configurável, timeout, limite de resposta, extração por caminho e normalização. Nenhum endpoint vem configurado. Consulte `API_IMPORT.md`.

## Licença, versão e referências

O código é distribuído sob Apache-2.0. Use a versão publicada ou o identificador do commit ao citar o framework. `CITATION.cff` contém os metadados de citação; `REFERENCES.md` inventaria os materiais incorporados; `NOTICE` registra independência institucional e uso exclusivo de dados sintéticos nos exemplos.

## Modelos de telas

Abra `http://localhost:5173/patterns.html` ou use “03 / Modelos de telas” no explorador. A página demonstra série temporal, seleção geográfica esquemática e catálogo com detalhes expansíveis. Edite os arrays `series`, `resources` e `places` em `scenario.js` para adaptar os dados sem alterar a lógica de interface em `patterns.js`. Esses exemplos não estão conectados ao upload do explorador nem a APIs externas. Ao trocar o tema, ajuste também títulos, unidades e avisos de simulação em `patterns.html`.

## Skills

As skills portáveis estão em `skills/framenasa-ui/SKILL.md` e `skills/framenasa-vercel/SKILL.md`. Peça ao agente para ler o arquivo desejado, ou copie a pasta da skill para o diretório de skills do seu Codex para descoberta automática. Elas foram validadas pelo validador de skills; não foram instaladas globalmente.

## Estado

Build e testes de ingestão verificados. Busca, estado vazio e restauração exercitados no navegador. Explorador inspecionado em larguras de 360, 768 e 1440 pixels. JSON e CSV importados pelo seletor; arquivo inválido mostrou erro preservando dados anteriores. Exemplos importáveis estão em `examples/`. O mapeamento programático de colunas está descrito em `DATA_SOURCES.md`. Consulte `FRAMEWORK_PLAN.md` para o escopo e o documento de regras para fontes oficiais de 2026.
