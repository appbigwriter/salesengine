# FBR Sales Engine — B2B Revenue Acceleration Platform

<div align="center">

![Next.js 15](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Easypanel](https://img.shields.io/badge/Easypanel_VPS-6366F1?style=for-the-badge&logo=linux&logoColor=white)

**Infraestrutura proprietária de inteligência comercial, prospecção autônoma multicanal, qualificação por IA e gestão de pipeline para a FBR Agency.**

</div>

---

## 1. Visão Executiva & Tese de Negócio

### 1.1. O que é o FBR Sales Engine?
O **FBR Sales Engine** é a plataforma unificada de aceleração de receitas e inteligência de vendas desenvolvida para a **FBR Agency** e ecossistema de clientes. Ele integra captação ativa de dados de decisores, sequenciamento outbound multicanal (E-mail + WhatsApp), agentes de Inteligência Artificial para qualificação em tempo real e um pipeline de conversão com supervisão humana estratégica (*Human-in-the-Loop*).

### 1.2. A Tese Central
> *"Vendas B2B de alta conversão não dependem de volume cego de abordagens, mas sim da união entre dados enriquecidos de alta precisão, relevância contextual em múltiplos canais simultâneos e resposta imediata a oportunidades de compra."*

---

## 2. O Problema de Mercado & A Solução

### 2.1. Os Gargalos Tradicionais de Vendas B2B
1. **Dispersão de Ferramentas (Tool Fatigue):** Equipes comerciais usam ferramentas desconectadas para scraping, cold mail, WhatsApp pessoal e CRM em planilhas.
2. **Tempo de Resposta Lento (Lead Decay):** Leads inbound demoram horas ou dias para receber primeiro contato, perdendo 80% do potencial de conversão.
3. **Abordagens Genéricas e Baixa Entregabilidade:** Disparos sem personalização resultam em caixas de spam e números de WhatsApp banidos.
4. **Perda de Contexto no Handoff:** O SDR qualifica o lead, mas o Closer entra na reunião sem entender o histórico completo discutido.

### 2.2. A Solução do Sales Engine
Automatizar até 80% das tarefas operacionais repetitivas de pré-vendas (pesquisa, enriquecimento, disparo, triagem de resposta e agendamento), liberando o time comercial para focar em **negociação estratégica, relacionamento e fechamento**.

---

## 3. Pilares Conceituais do Sistema

```mermaid
mindmap
  root((FBR Sales Engine))
    Inteligencia de Dados
      ICP Dinamico
      Enriquecimento Realtime
      Verificacao de Contatos
      Compliance LGPD
    Orquestracao Omnichannel
      Cold E-mail Aquecido
      WhatsApp Conversacional
      LinkedIn Touchpoints
      Cadencias Sincronizadas
    Agentes de IA
      AI SDR Inbound
      Classificador Outbound
      Contorno de Objecoes
      Copiloto do Closer
    Pipeline & Receita
      Kanban Inteligente
      Propostas Dinamicas
      Previsibilidade de Receita
      Atribuicao de ROI
```

---

## 4. Jornada do Lead no Funil do Sales Engine

```mermaid
sequenceDiagram
    autonumber
    actor Lead as Prospect / Decisor
    participant SE as FBR Sales Engine (IA + Engine)
    participant SDR as SDR Humano
    participant Closer as Closer / Executivo

    SE->>Lead: Contato Personalizado (E-mail / WhatsApp)
    Lead-->>SE: Resposta com interesse / dúvida
    SE->>SE: IA classifica intenção como "Alta Prioridade"
    SE->>SDR: Notificação instantânea com contexto do Lead
    SE->>Lead: IA agenda reunião no calendário do Closer
    Closer->>Lead: Realização da Reunião Estratégica
    Closer->>SE: Emissão de Proposta Comercial Interativa
    SE->>Lead: Envio de link de proposta + tracking de leitura
    Lead-->>SE: Aceite da proposta e assinatura digital
    SE->>Closer: Notificação de Deal Ganho & Handoff para Onboarding
```

---

## 5. Estrutura do Repositório

```text
├── 01-conceitual/      # Visão, tese de mercado e personas
├── 02-prd/             # Requisitos funcionais e backlog de Sprints (0 a 7)
├── 03-arquitetura/     # Arquitetura Ports & Adapters, ADR-001 e Guia Easypanel
├── 04-database/        # Schema PostgreSQL/Supabase, Dicionário de Dados e RLS
├── 05-workflows/       # Workflows operacionais e fluxos n8n/webhooks
├── 06-design/          # Design Tokens (Dark Slate, Glassmorphism, Typography)
├── 07-marketing/       # Posicionamento, ofertas e mensagens
├── 08-historico/       # Decisões arquiteturais e receipts
└── 09-codigo/          # Aplicação Next.js 15 + TypeScript + Tailwind CSS
```

---

## 6. Stack Tecnológica

- **Front-end & API Framework:** Next.js 15 (App Router) + TypeScript
- **Estilização & Design System:** Tailwind CSS + Radix UI + Lucide Icons (Dark Mode & Glassmorphism)
- **Banco de Dados & BaaS:** Supabase (PostgreSQL 15+ com `pgvector`, Auth e Supabase Realtime)
- **Containerização & Deploy:** Docker Multi-stage + Easypanel em VPS própria
- **Inteligência Artificial:** OpenAI API (GPT-4o/mini) + Anthropic Claude
- **Provedores de Mensageria:** Resend (E-mail) + Evolution API (WhatsApp)

---

## 7. Variáveis de Ambiente Necessárias

Crie um arquivo `.env` (ou `.env.local`) com base no modelo [`.env.example`](file:///.env.example):

```env
# 1. Aplicação & Servidor
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://sales.fbragency.com.br

# 2. Supabase (BaaS & Database)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 3. Inteligência Artificial (LLMs)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 4. Provedores de Canais (E-mail & WhatsApp)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
EVOLUTION_API_URL=https://whatsapp.fbragency.com.br
EVOLUTION_API_KEY=your_evolution_global_api_token

# 5. Filas Assíncronas & Rate Limiting (Upstash / Redis)
UPSTASH_REDIS_REST_URL=https://xxxxxxxxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

---

## 8. Guia Rápido de Deploy no Easypanel (VPS Própria)

Para detalhes completos de configuração, consulte o documento [**03-arquitetura/DeployEasypanel.md**](file:///03-arquitetura/DeployEasypanel.md).

1. No Easypanel, crie uma **App** com Source **GitHub**:
   - **Repositório:** `appbigwriter/salesengine`
   - **Branch:** `main`
   - **Build Type:** `Dockerfile`
   - **Root Directory / Build Path:** `09-codigo`
2. Na aba **Domains**, adicione o domínio apontado para a VPS com SSL automático (Porta `3000`).
3. Na aba **Environment**, insira as variáveis de ambiente descritas acima.
4. Clique em **Deploy**.

---

## 9. Execução Local

```bash
# Entrar no diretório da aplicação
cd 09-codigo

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build
```

---

<div align="center">
  <sub>FBR Agency © 2026. Todos os direitos reservados.</sub>
</div>
