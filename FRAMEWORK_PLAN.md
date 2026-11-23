# FrameNasa — base de prototipagem

Objetivo: preparar um kit externo e reutilizável para hackathons, priorizando telas responsivas e demonstrações navegáveis sem incorporar fontes de dados de um desafio específico.

## Entregáveis

- Aplicação demonstradora com navegação, dashboard, catálogo de componentes e explorador de dados.
- Componentes de layout, cartões de métricas, filtros, tabelas e estados de carregamento, vazio e erro.
- Importadores de JSON e CSV com validação, mensagens de erro e limite explícito de tamanho.
- Contrato de dados com fonte, licença, unidade, período e indicação de simulação.
- Dados sintéticos locais para demonstrar o produto sem credenciais ou conexão externa.
- Skills de UX/UI e Vercel em skills/framenasa-ui e skills/framenasa-vercel.
- Instruções de execução, build e preparação para deploy.

## Critérios de conclusão

Build de produção aprovado; importação válida e inválida exercitadas; filtros e navegação operantes; interface inspecionada em tamanhos mobile e desktop; skills validadas; exemplos distinguindo dados reais de sintéticos.

## Situação

Base de prototipagem concluída. Build aprovado e seis testes de ingestão passando. Ambas as skills passaram no validador. No navegador, busca por Amazonas retornou um registro, busca inexistente mostrou estado vazio e restauração recuperou três registros. JSON e CSV foram importados pela interface; erro de registro inválido preservou os dados anteriores. Explorador inspecionado em 360, 768 e 1440 pixels. Modelos de série temporal, grade geográfica esquemática e catálogo implementados; período, seleção, busca e detalhes verificados. Catálogo conferido em 360 e 1440 pixels. Navegação principal abre os modelos. Documentação e amostras disponíveis.

O servidor precisou ser executado fora do sandbox, limitado a 127.0.0.1, para acesso pelo navegador. Não houve publicação externa. A configuração Vercel está preparada para saída estática em dist, mas não foi validada em deployment remoto. Integrações específicas com provedores e processamento científico não fazem parte da base entregue; há importação e mapeamento de CSV/JSON e um cliente genérico configurável para APIs JSON.

As regras salvas referem-se a 2026. A elegibilidade do framework pré-existente e as regras de 2027 precisam ser confirmadas na edição correspondente; este planejamento não pressupõe aprovação da organização.
