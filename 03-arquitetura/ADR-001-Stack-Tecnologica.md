# ADR 001: Seleção de Stack Tecnológica & Infraestrutura

- **Status:** Aceito
- **Data:** 2026-09-22
- **Decisores:** Equipe de Arquitetura FBR Agency

---

## 1. Contexto & Problema
O **FBR Sales Engine** necessita de uma stack moderna, robusta, altamente tipada e com suporte a renderização híbrida (SSR/CSR), além de processamento assíncrono de filas e comunicação em tempo real com LLMs e gateways de mensagens.

---

## 2. Decisão

Adotamos a seguinte composição tecnológica:

1. **Front-end & API Framework:** `Next.js 15 (App Router)` + `TypeScript`.
2. **Estilização & Componentes:** `Tailwind CSS` + `shadcn/ui` (Radix UI primitives).
3. **Banco de Dados, Autenticação & BaaS:** `Supabase (PostgreSQL 15+)` com suporte nativo a Row Level Security (RLS), Supabase Auth para gestão de membros/permissões, Supabase Realtime para notificações instantâneas e extensão vetorial `pgvector` para busca semântica em interações de IA.
4. **Client de Acesso:** `@supabase/supabase-js` e `@supabase/ssr` para acesso seguro no Next.js (Client Components, Server Components e Server Actions).
5. **Filas & Mensageria Assíncrona:** `Upstash QStash` / `Redis + BullMQ` para processamento escalável de cadências e webhooks.
6. **Inteligência Artificial:** `OpenAI API (GPT-4o/GPT-4o-mini)` e `Anthropic Claude 3.5 Sonnet` com fallback dinâmico.
7. **Provedores de Canais:**
   - E-mail: `Resend` / `Amazon SES`.
   - WhatsApp: `Evolution API` (Open-Source self-hosted) ou `Z-API`.

---

## 3. Consequências & Trade-offs

### Pontos Positivos:
- **Alta produtividade:** TypeScript de ponta a ponta (front, backend e banco).
- **Escalabilidade Serverless e Edge:** Facilidade de deploy na Vercel ou infraestrutura containerizada (Docker/Fly.io).
- **Segurança Nativa:** RLS do PostgreSQL garante isolamento estrito entre workspaces/clientes.

### Pontos de Atenção:
- Processos de longa duração (workers contínuos de aquecimento de e-mails) devem rodar em instâncias separadas de background worker ou serverless agendado (Cron/QStash).
