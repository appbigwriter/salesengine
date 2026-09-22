# Guia de Deploy no Easypanel — FBR Control Tower

Este documento detalha o procedimento de deploy do **Sales Engine** no ambiente de produção provisionado pela **FBR Control Tower**.

---

## 1. Identidade & Especificações de Provisionamento

- **Project ID:** `7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72`
- **Slug:** `sales`
- **Template:** `custom_base` (v1.0.0)
- **Target Server:** `vps2`
- **Easypanel Project:** `sistemas`
- **Easypanel Service:** `sales`
- **Source Path:** `/09-codigo`
- **Domínio Oficial:** `sales.fbr.news`
- **Healthcheck / Validação:** `https://sales.fbr.news/health` (esperado HTTP 200)
- **Porta:** `3400`
- **Host:** `0.0.0.0`
- **Schema Exclusivo no Supabase:** `custom_salesengine`

---

## 2. Passo a Passo no Easypanel

1. Acesse o **Easypanel** na `vps2`.
2. Abra o projeto **sistemas** e selecione o serviço **sales**.
3. Na aba **Source**:
   - **Repository:** `appbigwriter/salesengine`
   - **Branch:** `main`
   - **Root Directory / Build Path:** `09-codigo`
   - **Build Type:** `Dockerfile`
4. Na aba **Domains**:
   - Domínio: `sales.fbr.news` (com SSL / Let's Encrypt habilitado).
   - Porta do Container: `3400`.
5. Na aba **Environment**:
   - Cole as variáveis de runtime especificadas abaixo (o destino padrão é `.env`).
6. Clique em **Deploy** e aguarde a finalização do build.
7. Acesse `https://sales.fbr.news/health` e confirme o retorno `HTTP 200 OK`.

---

## 3. Variáveis de Runtime (Environment)

```env
NODE_ENV=production
APP_ENV=production
PORT=3400
HOST=0.0.0.0

CONTROL_TOWER_BASE_URL=https://control-tower.fbr.news
CONTROL_TOWER_PROJECT_ID=7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72
CONTROL_TOWER_SCHEMA_NAME=custom_salesengine

DATABASE_URL=<SUPABASE_CENTRAL_DATABASE_URL_ACCESSIBLE_FROM_RUNTIME>
SUPABASE_URL=https://supabase-control-tower-api.fbr.news
SUPABASE_SERVICE_ROLE_KEY=<SUPABASE_CENTRAL_SERVICE_ROLE_KEY>
SUPABASE_ANON_KEY=<secret-manager:fbr/custom/7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72/SUPABASE_ANON_KEY>

NEXT_PUBLIC_SUPABASE_URL=https://supabase-control-tower-api.fbr.news
NEXT_PUBLIC_SUPABASE_ANON_KEY=<secret-manager:fbr/custom/7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72/SUPABASE_ANON_KEY>
NEXT_PUBLIC_APP_URL=https://sales.fbr.news

AUTHORITY_ADMIN_TOKEN=<GENERATED_AND_PERSISTED_AUTHORITY_ADMIN_TOKEN>
AUTHORITY_OPERATOR_TOKEN=<GENERATED_AND_PERSISTED_AUTHORITY_OPERATOR_TOKEN>
AUTHORITY_REVIEWER_TOKEN=<GENERATED_AND_PERSISTED_AUTHORITY_REVIEWER_TOKEN>
AUTHORITY_PUBLISHER_TOKEN=<GENERATED_AND_PERSISTED_AUTHORITY_PUBLISHER_TOKEN>
AUTHORITY_VIEWER_TOKEN=<GENERATED_AND_PERSISTED_AUTHORITY_VIEWER_TOKEN>

OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
EVOLUTION_API_URL=https://whatsapp.fbragency.com.br
EVOLUTION_API_KEY=your_evolution_global_api_token

UPSTASH_REDIS_REST_URL=https://xxxxxxxxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

---

## 4. Regras de Arquitetura & Governança

- **Isolamento de Schema:** Operar exclusivamente no schema `custom_salesengine`. Nenhuma tabela deve ser criada no schema `public`.
- **Preflight Check:** A FBR Control Tower executa preflight `select 1` e valida o endpoint `/health`.
- **Segurança de Tokens:** Tokens privados `AUTHORITY_*_TOKEN` e `SUPABASE_SERVICE_ROLE_KEY` nunca são enviados ao browser ou expostos no front-end.
