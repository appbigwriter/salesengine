-- ==============================================================================
-- FBR SALES ENGINE — DATABASE SCHEMA (Supabase Central)
-- Schema exclusivo: custom_salesengine | Project ID: 7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72
-- ==============================================================================

-- 1. Criação e isolamento do Schema exclusivo
CREATE SCHEMA IF NOT EXISTS custom_salesengine;

-- Extensões necessárias no banco
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ------------------------------------------------------------------------------
-- 2. TABELAS BASE DE GOVERNANÇA (Template FBR custom_base v1.0.0)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS custom_salesengine.entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    owner_id VARCHAR(100),
    entity_type VARCHAR(100) NOT NULL,
    slug VARCHAR(150),
    name VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.entity_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_entity_id UUID NOT NULL REFERENCES custom_salesengine.entities(id) ON DELETE CASCADE,
    child_entity_id UUID NOT NULL REFERENCES custom_salesengine.entities(id) ON DELETE CASCADE,
    relation_type VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(parent_entity_id, child_entity_id, relation_type)
);

CREATE TABLE IF NOT EXISTS custom_salesengine.records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    entity_id UUID REFERENCES custom_salesengine.entities(id) ON DELETE CASCADE,
    collection_name VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    mime_type VARCHAR(100),
    file_size_bytes BIGINT,
    storage_provider VARCHAR(50) DEFAULT 'supabase_storage',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    key VARCHAR(150) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    actor_id VARCHAR(100),
    action VARCHAR(150) NOT NULL,
    resource_type VARCHAR(100),
    resource_id VARCHAR(100),
    payload JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    event_name VARCHAR(150) NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TABELAS DE DOMÍNIO DO SALES ENGINE (Multi-Tenancy & CRM)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS custom_salesengine.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'sdr' CHECK (role IN ('admin', 'manager', 'sdr', 'closer', 'readonly')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.workspace_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES custom_salesengine.users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(workspace_id, user_id)
);

CREATE TABLE IF NOT EXISTS custom_salesengine.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    cnpj VARCHAR(20),
    website TEXT,
    industry VARCHAR(100),
    employee_count_range VARCHAR(50),
    estimated_revenue_range VARCHAR(50),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'BR',
    icp_score INTEGER DEFAULT 0 CHECK (icp_score >= 0 AND icp_score <= 100),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'enriching', 'ready', 'in_cadence', 'qualified', 'disqualified', 'blacklisted')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES custom_salesengine.leads(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    job_title VARCHAR(150),
    email VARCHAR(255),
    email_status VARCHAR(50) DEFAULT 'unverified' CHECK (email_status IN ('valid', 'risky', 'invalid', 'unverified')),
    phone VARCHAR(50),
    whatsapp_phone VARCHAR(50),
    linkedin_url TEXT,
    is_primary_decision_maker BOOLEAN DEFAULT FALSE,
    opt_out BOOLEAN DEFAULT FALSE,
    opt_out_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    channel_type VARCHAR(50) NOT NULL CHECK (channel_type IN ('email', 'whatsapp', 'omnichannel', 'linkedin')),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived')),
    daily_limit INTEGER DEFAULT 50,
    schedule_settings JSONB DEFAULT '{"working_days": [1,2,3,4,5], "start_hour": 9, "end_hour": 18}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.campaign_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES custom_salesengine.campaigns(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('email', 'whatsapp', 'linkedin_task', 'phone_call')),
    wait_days INTEGER DEFAULT 2,
    template_subject TEXT,
    template_body TEXT NOT NULL,
    spintax_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, step_order)
);

CREATE TABLE IF NOT EXISTS custom_salesengine.lead_campaign_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES custom_salesengine.campaigns(id) ON DELETE CASCADE,
    contact_id UUID NOT NULL REFERENCES custom_salesengine.contacts(id) ON DELETE CASCADE,
    current_step_order INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'replied', 'bounced', 'unsubscribed', 'finished', 'paused')),
    next_action_at TIMESTAMP WITH TIME ZONE,
    last_action_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, contact_id)
);

CREATE TABLE IF NOT EXISTS custom_salesengine.messages_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES custom_salesengine.contacts(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES custom_salesengine.campaigns(id) ON DELETE SET NULL,
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('email', 'whatsapp', 'linkedin', 'phone')),
    direction VARCHAR(20) NOT NULL CHECK (direction IN ('outbound', 'inbound')),
    sender_identifier VARCHAR(255),
    recipient_identifier VARCHAR(255),
    subject TEXT,
    body TEXT NOT NULL,
    ai_intent_classified VARCHAR(50) CHECK (ai_intent_classified IN ('interested', 'objection', 'not_now', 'opt_out', 'neutral', 'question')),
    ai_confidence_score NUMERIC(5,2),
    raw_payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.pipelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pipeline_id UUID NOT NULL REFERENCES custom_salesengine.pipelines(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    stage_order INTEGER NOT NULL,
    win_probability INTEGER DEFAULT 0 CHECK (win_probability >= 0 AND win_probability <= 100),
    color_hex VARCHAR(7) DEFAULT '#64748b',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(pipeline_id, stage_order)
);

CREATE TABLE IF NOT EXISTS custom_salesengine.deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    pipeline_id UUID NOT NULL REFERENCES custom_salesengine.pipelines(id) ON DELETE CASCADE,
    stage_id UUID NOT NULL REFERENCES custom_salesengine.pipeline_stages(id) ON DELETE RESTRICT,
    lead_id UUID REFERENCES custom_salesengine.leads(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES custom_salesengine.contacts(id) ON DELETE SET NULL,
    owner_user_id UUID REFERENCES custom_salesengine.users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    deal_value NUMERIC(12,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost', 'abandoned')),
    lost_reason TEXT,
    expected_close_date DATE,
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    deal_id UUID NOT NULL REFERENCES custom_salesengine.deals(id) ON DELETE CASCADE,
    proposal_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_json JSONB NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    public_token UUID DEFAULT uuid_generate_v4() UNIQUE,
    view_count INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
    expires_at DATE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.audit_gates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES custom_salesengine.workspaces(id) ON DELETE CASCADE,
    action_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'executed')),
    payload JSONB NOT NULL,
    requested_by UUID REFERENCES custom_salesengine.users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES custom_salesengine.users(id) ON DELETE SET NULL,
    decision_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    decided_at TIMESTAMP WITH TIME ZONE
);

-- ------------------------------------------------------------------------------
-- 4. TABELAS DO MÓDULO OPPORTUNITY BUILDER (Afiliados & Pesquisa Profunda)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS custom_salesengine.opportunity_blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    name VARCHAR(255) NOT NULL,
    niche VARCHAR(255) NOT NULL,
    url TEXT,
    external_blog_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.opportunity_source_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    source VARCHAR(50) NOT NULL CHECK (source IN ('amazon', 'maxweb', 'digistore24', 'clickbank')),
    category VARCHAR(150) NOT NULL,
    subcategory VARCHAR(150),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.opportunity_score_weights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    weights JSONB NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    updated_by UUID REFERENCES custom_salesengine.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL DEFAULT '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72'::uuid,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(50) NOT NULL CHECK (source IN ('amazon', 'maxweb', 'digistore24', 'clickbank')),
    category VARCHAR(150),
    subcategory VARCHAR(150),
    market VARCHAR(10) DEFAULT 'BR' CHECK (market IN ('BR', 'US', 'EU')),
    url TEXT,
    signals TEXT,
    ratings JSONB NOT NULL DEFAULT '{"demanda":3,"monetizacao":3,"provaSocial":3,"tendencia":3,"fitBlog":3,"reputacao":3,"facilidadeSeo":3,"conformidade":3}'::jsonb,
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    tier VARCHAR(5) DEFAULT 'D' CHECK (tier IN ('A', 'B', 'C', 'D')),
    verdict VARCHAR(50) CHECK (verdict IN ('pesquisar', 'testar', 'seguir', 'descartar')),
    verdict_note TEXT,
    blog_id UUID REFERENCES custom_salesengine.opportunity_blogs(id) ON DELETE SET NULL,
    dossier JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_example BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES custom_salesengine.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.opportunity_score_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID NOT NULL REFERENCES custom_salesengine.opportunities(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    tier VARCHAR(5) NOT NULL,
    ratings JSONB NOT NULL,
    reason TEXT,
    changed_by VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_salesengine.opportunity_pautas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID NOT NULL REFERENCES custom_salesengine.opportunities(id) ON DELETE CASCADE,
    blog_id UUID REFERENCES custom_salesengine.opportunity_blogs(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    hook TEXT NOT NULL,
    target_audience TEXT,
    disclosure_notice TEXT NOT NULL,
    sensitive_alert TEXT,
    recommended_angle TEXT,
    call_to_action TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. ÍNDICES DE PERFORMANCE
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_leads_workspace ON custom_salesengine.leads(workspace_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON custom_salesengine.leads(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON custom_salesengine.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON custom_salesengine.contacts(whatsapp_phone);
CREATE INDEX IF NOT EXISTS idx_deals_workspace ON custom_salesengine.deals(workspace_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON custom_salesengine.deals(stage_id);
CREATE INDEX IF NOT EXISTS idx_messages_contact ON custom_salesengine.messages_log(contact_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON custom_salesengine.messages_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gates_pending ON custom_salesengine.audit_gates(workspace_id, status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_opp_source ON custom_salesengine.opportunities(source);
CREATE INDEX IF NOT EXISTS idx_opp_score ON custom_salesengine.opportunities(score DESC);
CREATE INDEX IF NOT EXISTS idx_opp_tier ON custom_salesengine.opportunities(tier);
CREATE INDEX IF NOT EXISTS idx_opp_history ON custom_salesengine.opportunity_score_history(opportunity_id);

-- ------------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE custom_salesengine.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.records ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.audit_gates ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.opportunity_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.opportunity_source_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.opportunity_score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_salesengine.opportunity_pautas ENABLE ROW LEVEL SECURITY;
