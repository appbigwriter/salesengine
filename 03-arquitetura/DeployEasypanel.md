# Guia de Deploy — Easypanel (VPS Própria)

Este guia orienta o deploy contínuo do **FBR Sales Engine** utilizando o **Easypanel** em sua VPS própria (Ubuntu/Debian com Docker).

---

## 1. Visão Geral do Serviço no Easypanel

No painel do Easypanel:
- **Tipo de Serviço:** `App`
- **Fonte (Source):** `GitHub`
- **Repositório:** `appbigwriter/salesengine`
- **Branch:** `main`
- **Build Method:** `Dockerfile`
- **Root Directory / Build Path:** `09-codigo`
- **Porta da Aplicação:** `3000`

---

## 2. Configuração Passo a Passo no Easypanel

### Passo 1: Criar o Projeto e Aplicação
1. Acesse o painel do seu Easypanel (ex: `https://easypanel.seu-dominio.com`).
2. Crie um novo Projeto chamado `fbr-sales-engine` (ou selecione um existente).
3. Clique em **+ New** e selecione **App**.

### Passo 2: Configurar a Fonte do Código (GitHub)
1. Na aba **Source**:
   - Selecione **GitHub**.
   - Conecte o repositório: `appbigwriter/salesengine`.
   - Branch: `main`.
   - **Root Directory / Build Path:** `09-codigo` *(Importante: o código Next.js está nesta pasta)*.
   - **Build Type:** `Dockerfile`.

### Passo 3: Configurar Portas e Domínio
1. Na aba **Domains**:
   - Adicione o domínio/subdomínio apontado para a VPS (ex: `sales.fbragency.com.br`).
   - Habilite a geração automática de certificado SSL (Let's Encrypt / HTTPS).
   - Porta interna do container: `3000`.

### Passo 4: Configurar Variáveis de Ambiente (Environment Variables)
Na aba **Environment**, insira as variáveis necessárias (veja seção 3 abaixo).

### Passo 5: Deploy
Clique em **Deploy**. O Easypanel irá clonar o repositório, executar o build multi-stage do `Dockerfile` e subir o container na porta 3000 com reinicialização automática (`restart: unless-stopped`).

---

## 3. Checklist de Variáveis de Ambiente no Easypanel

| Variável | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Sistema | Ambiente de execução | `production` |
| `PORT` | Sistema | Porta de escuta do servidor | `3000` |
| `NEXT_PUBLIC_APP_URL` | Público | URL pública do Sales Engine | `https://sales.fbragency.com.br` |
| `NEXT_PUBLIC_SUPABASE_URL` | Público | URL do projeto Supabase | `https://xxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Público | Chave pública anônima do Supabase | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Segredo | Chave restrita de serviço (bypass RLS) | `eyJhbGciOi...` |
| `OPENAI_API_KEY` | Segredo | Chave da OpenAI para o AI SDR | `sk-proj-...` |
| `ANTHROPIC_API_KEY` | Segredo (Opcional) | Chave Anthropic Claude para fallback | `sk-ant-...` |
| `RESEND_API_KEY` | Segredo | Token de disparo de Cold E-mail | `re_...` |
| `EVOLUTION_API_URL` | Segredo | URL da API Evolution do WhatsApp | `https://whatsapp.fbragency.com.br` |
| `EVOLUTION_API_KEY` | Segredo | Chave global da Evolution API | `your_evolution_secret_token` |
| `UPSTASH_REDIS_REST_URL` | Segredo | URL do Redis/Upstash para filas | `https://xxxxxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Segredo | Token do Redis/Upstash para rate limit | `your_redis_token` |

---

## 4. Atualizações Automáticas (Auto-Deploy Webhook)

Para que cada `git push` na branch `main` realize deploy automático na VPS:
1. No Easypanel, na aba **Source** da aplicação, copie a **Deploy Webhook URL**.
2. Acesse seu repositório no GitHub: `Settings > Webhooks > Add webhook`.
3. Cole a URL no campo **Payload URL**, selecione `application/json` e evento `Just the push event`.
4. Salve o webhook. Agora, todo commit na branch `main` atualizará o Sales Engine na sua VPS em segundos.
