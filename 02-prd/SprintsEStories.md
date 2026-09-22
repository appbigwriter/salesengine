# Backlog de Sprints & User Stories — FBR Sales Engine

Documento de planejamento ágil detalhando as **Sprints**, **Histórias de Usuário (User Stories)**, **Critérios de Aceite** e **Definição de Pronto (DoD)** para a implementação completa do Sales Engine.

---

## Visão Geral do Roadmap de Sprints

```mermaid
gantt
    title Roadmap de Implementação — FBR Sales Engine
    dateFormat  YYYY-MM-DD
    section Fundação
    Sprint 0: Setup & Infraestrutura Base       :s0, 2026-10-01, 7d
    section Core Data & Outbound
    Sprint 1: Leads & ICP Engine                :s1, after s0, 10d
    Sprint 2: Motor de Cadência Cold E-mail     :s2, after s1, 10d
    Sprint 3: WhatsApp Omnichannel Integration  :s3, after s2, 10d
    section Inteligência & CRM
    Sprint 4: AI SDR & Qualificação Conversacional :s4, after s3, 12d
    Sprint 5: Pipeline CRM & Propostas Web      :s5, after s4, 10d
    section Governança & BI
    Sprint 6: Human Gates & Compliance LGPD     :s6, after s5, 7d
    Sprint 7: Analytics, Atribuição & BI        :s7, after s6, 10d
```

---

## Sprint 0: Setup, Infraestrutura & Design System

### US0.1 — Setup do Supabase, Auth & Migrations Iniciais
- **Como:** Administrador do Sistema
- **Quero:** Ter o banco de dados Supabase configurado com o `schema.sql` e autenticação por e-mail/membros.
- **Para que:** O time possa logar com segurança e os dados tenham isolamento multi-tenant por workspace.
- **Critérios de Aceite:**
  - [x] Tabelas do `schema.sql` criadas e validadas no Supabase.
  - [x] RLS ativado em todas as tabelas vinculando ao `auth.uid()` e `workspace_members`.
  - [x] Variáveis de ambiente documentadas em `.env.example`.
- **Complexidade:** 3 Story Points

### US0.2 — Implementação do Design System & Layout Base
- **Como:** Operador da FBR Agency
- **Quero:** Navegar por uma interface rápida em Dark Mode seguindo os Design Tokens.
- **Para que:** A experiência de uso seja profissional, fluida e consistente em todos os módulos.
- **Critérios de Aceite:**
  - [x] Paleta Dark Slate (`#090d16`, `#111827`, `#1a2234`) e gradientes aplicados no Tailwind.
  - [x] Fontes `Plus Jakarta Sans` e `Inter` integradas.
  - [x] Sidebar e Navbar responsivas com alternância de abas e status de saúde do sistema.
- **Complexidade:** 3 Story Points

---

## Sprint 1: Módulo de Leads & ICP Engine

### US1.1 — Cadastro e Importação em Massa de Empresas (Leads)
- **Como:** SDR / Operador de Prospecção
- **Quero:** Cadastrar empresas manualmente ou importar listas via CSV/JSON.
- **Para que:** Eu possa organizar as contas-alvo do ICP antes de iniciar qualquer abordagem.
- **Critérios de Aceite:**
  - [ ] Formulário de criação de Lead com validação de CNPJ, Setor, Porte e Faturamento.
  - [ ] Parser de CSV com mapeamento de colunas e deduplicação por domínio/CNPJ.
  - [ ] Notificação de sucesso com resumo da importação (novos x duplicados).
- **Complexidade:** 5 Story Points

### US1.2 — Cálculo Dinâmico de ICP Score
- **Como:** Gestor Comercial
- **Quero:** Que o sistema pontue automaticamente cada lead de 0 a 100 com base em critérios do ICP.
- **Para que:** O time foque primeiro nas contas de maior probabilidade de conversão.
- **Critérios de Aceite:**
  - [ ] Algoritmo de scoring ponderado: Setor (peso 30%), Porte/Funcionários (peso 30%), Presença de Decisor (peso 20%), Tech Stack (peso 20%).
  - [ ] Atualização automática do campo `icp_score` no banco ao salvar/enriquecer.
  - [ ] Indicador visual no Lead Data Grid com barra de progresso colorida.
- **Complexidade:** 5 Story Points

### US1.3 — Enriquecimento e Validação de E-mails
- **Como:** SDR
- **Quero:** Validar a entregabilidade dos e-mails dos decisores antes do disparo.
- **Para que:** A taxa de bounce da agência se mantenha abaixo de 1% e proteja a reputação do domínio.
- **Critérios de Aceite:**
  - [ ] Integração com serviço de verificação MX/SMTP em tempo real.
  - [ ] Marcação dos status: `valid`, `risky`, `invalid` ou `unverified`.
  - [ ] Bloqueio automático de disparos para e-mails marcados como `invalid`.
- **Complexidade:** 5 Story Points

---

## Sprint 2: Motor de Cadência Outbound (Cold E-mail & Spintax)

### US2.1 — Construtor Visual de Cadências Sequenciais
- **Como:** Gestor de Growth
- **Quero:** Criar cadências com múltiplos passos (Passo 1: E-mail -> Aguarda 2 dias -> Passo 2: Follow-up).
- **Para que:** As mensagens sejam enviadas com espaçamento natural e sem intervenção manual.
- **Critérios de Aceite:**
  - [ ] Interface para adicionar, reordenar e excluir passos na cadência.
  - [ ] Definição de delay em dias ou horas entre etapas.
  - [ ] Editor de texto rico com suporte a variáveis dinâmicas (`{{first_name}}`, `{{company}}`, `{{industry}}`).
- **Complexidade:** 8 Story Points

### US2.2 — Suporte a Spintax & Rotação de Caixas Postais (Mailbox Rotation)
- **Como:** Especialista em Outbound
- **Quero:** Utilizar sintaxe Spintax (`{Olá|Oi|Tudo bem}`) e distribuir envios entre múltiplas caixas de e-mail.
- **Para que:** Os provedores (Google/Outlook) não identifiquem padrão repetitivo de spam.
- **Critérios de Aceite:**
  - [ ] Parser de Spintax que gera variações exclusivas para cada lead no momento do envio.
  - [ ] Algoritmo Round-Robin para alternar caixas de saída conectadas (ex: 30 envios/dia por caixa).
  - [ ] Respeito estrito à janela horária configurada (ex: Segunda a Sexta, 09h às 18h).
- **Complexidade:** 8 Story Points

### US2.3 — Fila Assíncrona & Worker de Disparos
- **Como:** Sistema (Background Worker)
- **Quero:** Processar os envios agendados através de filas resilientes (Upstash / Redis / BullMQ).
- **Para que:** A aplicação aguente picos de envio sem travar a interface do usuário.
- **Critérios de Aceite:**
  - [ ] Worker consome jobs agendados da tabela `lead_campaign_enrollments`.
  - [ ] Integração com Resend / Amazon SES via adapter desacoplado.
  - [ ] Registro detalhado de cada envio na tabela `messages_log`.
- **Complexidade:** 8 Story Points

---

## Sprint 3: WhatsApp Omnichannel Integration

### US3.1 — Conexão de Instância WhatsApp (Evolution API / Z-API)
- **Como:** Administrador do Sistema
- **Quero:** Escanear o QR Code no painel para conectar o WhatsApp de prospecção da agência.
- **Para que:** O Sales Engine possa enviar e receber mensagens diretamente pelo sistema.
- **Critérios de Aceite:**
  - [ ] Exibição de QR Code gerado em tempo real via WebSocket/API.
  - [ ] Indicador de status de conexão (Conectado / Desconectado / Bateria) na Navbar.
  - [ ] Mecanismo de reconexão automática em caso de queda de sessão.
- **Complexidade:** 5 Story Points

### US3.2 — Disparos de WhatsApp com Delay Inteligente Anti-Ban
- **Como:** SDR
- **Quero:** Que o motor envie mensagens de WhatsApp com atrasos aleatórios entre 45 e 120 segundos.
- **Para que:** O número não seja bloqueado por comportamento automatizado agressivo.
- **Critérios de Aceite:**
  - [ ] Fila de disparo com `random_jitter` configurável.
  - [ ] Limite diário parametrizado por número (máximo 40 mensagens ativas/dia).
  - [ ] Parada imediata da cadência de e-mail caso o lead responda pelo WhatsApp.
- **Complexidade:** 5 Story Points

---

## Sprint 4: AI SDR & Qualificação Conversacional

### US4.1 — Classificador de Respostas com LLM (Intenção & Objeções)
- **Como:** SDR
- **Quero:** Que a IA leia as respostas recebidas (e-mail ou WhatsApp) e classifique a intenção automaticamente.
- **Para que:** Eu seja notificado imediatamente quando houver interesse real e não perca tempo com lixo.
- **Critérios de Aceite:**
  - [ ] Classificação nas categorias: `interested` (alta prioridade), `objection`, `not_now`, `opt_out`, `neutral`.
  - [ ] Extração de dados da resposta (novo contato indicado, motivo de recusa).
  - [ ] Atualização do status do lead e notificação instantânea ao SDR responsável.
- **Complexidade:** 8 Story Points

### US4.2 — Conversational AI SDR (Atendimento & Qualificação BANT)
- **Como:** Lead Inbound
- **Quero:** Ser atendido imediatamente no WhatsApp/Site, tirar dúvidas e receber proposta de agenda.
- **Para que:** Eu não precise esperar horas pelo retorno comercial.
- **Critérios de Aceite:**
  - [ ] Prompt contextualizado com os serviços da FBR Agency, cases e proposta de valor.
  - [ ] Coleta natural de: Desafio atual, Tamanho da equipe, Prazo de implementação e Orçamento.
  - [ ] Manutenção do histórico conversacional com contexto da conversa.
- **Complexidade:** 8 Story Points

### US4.3 — Agendamento Automático de Reunião (Calendar Round-Robin)
- **Como:** AI SDR / Closer
- **Quero:** Que a IA consulte as agendas dos Closers no Google Calendar e envie link com horários disponíveis.
- **Para que:** A reunião seja agendada na hora sem troca de múltiplos e-mails.
- **Critérios de Aceite:**
  - [ ] Integração com Google Calendar API para checar slots livres em tempo real.
  - [ ] Distribuição justa (Round-Robin) entre os Closers da equipe.
  - [ ] Criação do evento no calendário com link do Google Meet e envio de convite por e-mail/WhatsApp.
- **Complexidade:** 8 Story Points

---

## Sprint 5: Pipeline CRM & Propostas Interativas

### US5.1 — Quadro Kanban Interativo em Tempo Real
- **Como:** Closer / Gestor de Vendas
- **Quero:** Mover negócios entre as etapas do funil com atualização em tempo real.
- **Para que:** Toda a equipe veja o estado atual do pipeline instantaneamente.
- **Critérios de Aceite:**
  - [ ] Visualização por etapas: *Qualificado, Reunião Agendada, Proposta Enviada, Negociação, Ganho / Perdido*.
  - [ ] Sincronização em tempo real via **Supabase Realtime**.
  - [ ] Modal de detalhes do negócio com histórico de interações unificado.
- **Complexidade:** 5 Story Points

### US5.2 — Gerador de Propostas Comerciais Web & Rastreamento
- **Como:** Closer
- **Quero:** Gerar uma proposta comercial interativa via link web protegido por token.
- **Para que:** O cliente possa visualizar o escopo, valores e aceitar a proposta online.
- **Critérios de Aceite:**
  - [ ] Editor de escopo, entregáveis e tabela de preços com cálculo automático de total.
  - [ ] Geração de link público seguro (`/p/[public_token]`).
  - [ ] Rastreamento de visualizações (`view_count` e `last_viewed_at`) com alerta no sistema quando o cliente abrir.
  - [ ] Botão de "Aceitar Proposta" com assinatura digital simplificada.
- **Complexidade:** 8 Story Points

---

## Sprint 6: Human-in-the-Loop Gates & Governança

### US6.1 — Central de Aprovação de Gates Operacionais
- **Como:** Gestor de Operações
- **Quero:** Aprovar ou rejeitar operações de alto impacto antes da execução automática.
- **Para que:** A automação não cometa erros irreversíveis de reputação ou custo.
- **Critérios de Aceite:**
  - [ ] Listagem de solicitações pendentes na tabela `audit_gates`.
  - [ ] Gatilho obrigatório para disparos em massa (> 50 contatos/dia) e operações de custo de API.
  - [ ] Botões rápidos de "Aprovar e Executar" ou "Rejeitar" com registro do usuário aprovador.
- **Complexidade:** 5 Story Points

### US6.2 — Compliance LGPD, Opt-out & Blacklist Unificada
- **Como:** Lead / Prospect
- **Quero:** Poder solicitar descadastro de forma fácil e imediata.
- **Para que:** Meus dados sejam respeitados e eu não receba mais abordagens.
- **Critérios de Aceite:**
  - [ ] Link de opt-out no rodapé dos e-mails e comando de parada no WhatsApp ("SAIR" / "PARAR").
  - [ ] Inclusão instantânea do e-mail e telefone na lista de supressão (`opt_out = true`).
  - [ ] Bloqueio absoluto do motor em tentar cadastrar ou abordar contatos na blacklist.
- **Complexidade:** 5 Story Points

---

## Sprint 7: Analytics, Atribuição de Receita & BI

### US7.1 — Dashboard de Métricas de Funil & Conversão
- **Como:** Diretor Comercial
- **Quero:** Acompanhar gráficos de taxa de conversão entre cada etapa do funil de vendas.
- **Para que:** Eu possa identificar onde estão os gargalos comerciais e agir rapidamente.
- **Critérios de Aceite:**
  - [ ] Gráfico de funil: Leads Enriquecidos -> Contatados -> Respostas -> Reuniões -> Propostas -> Fechamentos.
  - [ ] Cálculo de CAC (Custo de Aquisição de Clientes) e ticket médio por contrato.
  - [ ] Filtros por período (Hoje, 7 dias, 30 dias, Trimestre).
- **Complexidade:** 5 Story Points

### US7.2 — Testes A/B Automatizados de Copywriting
- **Como:** Especialista em Growth
- **Quero:** Testar duas versões de assunto e corpo de e-mail (Copy A vs Copy B).
- **Para que:** O sistema identifique qual mensagem gera maior taxa de reuniões agendadas.
- **Critérios de Aceite:**
  - [ ] Divisão 50/50 automática de leads entre as variantes A e B.
  - [ ] Painel comparativo de taxa de abertura, resposta e reuniões geradas.
  - [ ] Opção de promover automaticamente a versão vencedora após N envios.
- **Complexidade:** 5 Story Points

---

## Definição de Pronto (Definition of Done — DoD)

Para que qualquer User Story seja considerada **Concluída (Done)**, ela deve cumprir os seguintes critérios:

1. **Código & Tipagem:** Código TypeScript estrito sem erros de build (`npm run build` aprovado).
2. **Design Tokens:** Componentes estilizados rigorosamente de acordo com [06-design/DesignTokens.md](file:///f:/Projetos/_FBR/Sales%20Engine/06-design/DesignTokens.md).
3. **Database & RLS:** Todas as consultas ao Supabase respeitam o multi-tenant do `workspace_id`.
4. **Segurança:** Nenhuma credencial ou segredo exposto no front-end.
5. **Auditoria & Gates:** Ações sensíveis passam obrigatoriamente pela tabela `audit_gates`.
