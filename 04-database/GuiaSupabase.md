# Guia de Configuração — Supabase BaaS (FBR Sales Engine)

---

## 1. Visão Geral da Integração

O **Supabase** é a espinha dorsal de persistência, autenticação e tempo real do **FBR Sales Engine**:
- **PostgreSQL 15+:** Armazenamento relacional com extensões `uuid-ossp`, `pgcrypto` e `vector`.
- **Supabase Auth:** Autenticação dos operadores (SDRs, Closers e Administradores).
- **Row Level Security (RLS):** Garantia de isolamento multi-tenant por workspace em nível de banco de dados.
- **Supabase Realtime:** Sincronização em tempo real de mensagens recebidas de leads, avanço de cards no Kanban e alertas de Gates.

---

## 2. Passo a Passo de Configuração

### 2.1. Execução do Schema
1. No painel do seu projeto no Supabase, acesse o **SQL Editor**.
2. Abra e execute o arquivo [`04-database/schema.sql`](file:///f:/Projetos/_FBR/Sales%20Engine/04-database/schema.sql).
3. Verifique se todas as tabelas foram criadas com sucesso.

### 2.2. Habilitação de Realtime
Para que o Dashboard e o Kanban atualizem instantaneamente sem refresh de página, habilite o Realtime nas seguintes tabelas:
- `messages_log`
- `deals`
- `audit_gates`
- `lead_campaign_enrollments`

No **SQL Editor**, execute:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE messages_log;
ALTER PUBLICATION supabase_realtime ADD TABLE deals;
ALTER PUBLICATION supabase_realtime ADD TABLE audit_gates;
```

### 2.3. Exemplo de RLS Policy (Multi-Tenant por Workspace)
```sql
-- Garante que o usuário só consiga ler leads do workspace do qual ele é membro
CREATE POLICY "Users can only view leads from their workspace"
ON leads
FOR SELECT
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members
    WHERE user_id = auth.uid()
  )
);
```

---

## 3. Conexão na Aplicação Next.js

As credenciais devem ser configuradas no arquivo `.env.local` na pasta [`09-codigo/`](file:///f:/Projetos/_FBR/Sales%20Engine/09-codigo):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (usada exclusivamente em webhooks e background workers seguros).
