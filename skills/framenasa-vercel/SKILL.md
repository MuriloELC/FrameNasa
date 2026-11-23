---
name: framenasa-vercel
description: Preparar, verificar e publicar protótipos FrameNasa na Vercel, com atenção a dados de demonstração e credenciais de APIs.
---

# FrameNasa Vercel

Leia o package.json e as configurações atuais antes de escolher comandos. Preserve o gerenciador de pacotes e o framework do projeto. Consulte a documentação oficial atual da Vercel quando a tarefa depender de configuração ou comportamento da plataforma.

Para protótipos centrados em telas, favoreça páginas estáticas e dados locais. Adicione funções de servidor somente para proteger credenciais ou atender uma integração necessária. Não exponha chaves privadas em variáveis públicas, código cliente, exemplos ou logs.

Mantenha o modo de demonstração utilizável sem serviços externos. Uma falha de API deve produzir mensagem compreensível e uma opção explícita de usar demonstração; nunca substituir silenciosamente dados reais por dados sintéticos.

Antes de publicar, execute o build de produção e as verificações existentes. Verifique caminhos de assets, navegação direta, responsividade e estados de erro. Diferencie build aprovado de fluxo validado no navegador.

Quando houver pedido de publicação, identifique o projeto e ambiente de destino pelos metadados existentes. Prefira preview para revisão, salvo pedido de produção. Não crie serviços pagos nem altere domínios sem autorização correspondente. Depois de publicar, abra a URL e confirme a jornada principal; relate URL, ambiente e limitações observadas.

Registre as variáveis necessárias em .env.example sem valores secretos e documente como reproduzir o build localmente. Registre fontes e licenças dos recursos externos utilizados.
