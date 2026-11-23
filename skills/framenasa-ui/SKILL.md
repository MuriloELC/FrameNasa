---
name: framenasa-ui
description: Criar e revisar telas responsivas e fluxos demonstráveis do framework FrameNasa para protótipos de hackathon.
---

# FrameNasa UI

Priorize uma jornada demonstrável: entender o problema, explorar um dado, perceber um resultado. Antes de implementar, identifique a tarefa principal da tela e quais ações precisam funcionar para a demonstração.

Reutilize componentes e tokens existentes. Crie variantes quando a diferença for visual; novos componentes quando houver comportamento distinto. Mantenha navegação, filtros, upload, seleção e feedback funcionais mesmo com dados simulados.

Identifique dados simulados de forma visível. Exiba fonte, unidade e período junto das visualizações. Não apresente estimativas como medições científicas verificadas. Permita trocar o adaptador de demonstração pelo adaptador real sem reescrever a tela.

Use layout mobile-first, grids fluidos e largura máxima de leitura. Em telas estreitas, transforme barras laterais em navegação compacta e tabelas em regiões roláveis identificadas. Preserve rótulos, foco visível, navegação por teclado e estados vazio, carregando e erro. Evite depender apenas de cor para comunicar estado.

Verifique a jornada principal em 360, 768 e 1440 pixels, incluindo texto longo, ausência de dados e falha de importação. Inspecione a renderização real quando houver navegador disponível; registre claramente quando a revisão for apenas estática.

Para uma nova tela, entregue componentes reutilizáveis, uma demonstração navegável e indicação dos comportamentos simulados. Evite backend, autenticação e persistência sem necessidade da jornada solicitada.
