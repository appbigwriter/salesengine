'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { MetricCard } from '../components/MetricCard';
import { KanbanBoard } from '../components/KanbanBoard';
import { LeadsTable } from '../components/LeadsTable';
import { AiSdrSimulator } from '../components/AiSdrSimulator';
import { GatesModal } from '../components/GatesModal';
import { CadenceBuilder } from '../components/CadenceBuilder';
import { WhatsAppHub } from '../components/WhatsAppHub';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { NewLeadModal } from '../components/NewLeadModal';
import { ImportCsvModal } from '../components/ImportCsvModal';
import { CreateProposalModal } from '../components/CreateProposalModal';
import { OpportunityDashboard } from '../components/OpportunityBuilder/OpportunityDashboard';
import { NewOpportunityModal } from '../components/OpportunityBuilder/NewOpportunityModal';
import { OpportunityScoringModal } from '../components/OpportunityBuilder/OpportunityScoringModal';
import { DeepResearchDossierModal } from '../components/OpportunityBuilder/DeepResearchDossierModal';
import { VerdictPautaModal } from '../components/OpportunityBuilder/VerdictPautaModal';
import { SearchQueriesModal } from '../components/OpportunityBuilder/SearchQueriesModal';
import { WeightsConfigModal } from '../components/OpportunityBuilder/WeightsConfigModal';
import { AuditGateItem, Lead } from '../types';
import { Opportunity, ScoreWeights } from '../types/opportunity';
import { DEFAULT_SCORE_WEIGHTS } from '../lib/score';
import { 
  TrendingUp, 
  CalendarCheck, 
  Bot, 
  Zap, 
  Send, 
  Sparkles, 
  Flame,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Target
} from 'lucide-react';

const initialLeads: Lead[] = [
  {
    id: '1',
    companyName: 'OmniLog Distribuição',
    contactName: 'Rodrigo Silveira',
    jobTitle: 'Diretor Comercial & Operações',
    email: 'rodrigo@omnilog.com.br',
    whatsapp: '+55 11 98822-1100',
    industry: 'Logística & Supply Chain',
    employees: '250-500',
    icpScore: 94,
    status: 'ready',
    channels: { emailVerified: true, whatsappActive: true, linkedinFound: true }
  },
  {
    id: '2',
    companyName: 'Kallos Cosméticos B2B',
    contactName: 'Fernanda Lins',
    jobTitle: 'Head de Vendas & Parcerias',
    email: 'fernanda.lins@kallos.com.br',
    whatsapp: '+55 11 97711-2244',
    industry: 'Indústria & Varejo',
    employees: '100-250',
    icpScore: 88,
    status: 'in_cadence',
    channels: { emailVerified: true, whatsappActive: true, linkedinFound: false }
  },
  {
    id: '3',
    companyName: 'Fintech Aurora Pay',
    contactName: 'Gabriel Medeiros',
    jobTitle: 'VP of Revenue',
    email: 'g.medeiros@aurorapay.io',
    whatsapp: '+55 21 99123-4567',
    industry: 'Serviços Financeiros',
    employees: '50-100',
    icpScore: 96,
    status: 'qualified',
    channels: { emailVerified: true, whatsappActive: true, linkedinFound: true }
  },
  {
    id: '4',
    companyName: 'AgroPrime Insumos',
    contactName: 'Luciano Prado',
    jobTitle: 'CEO & Fundador',
    email: 'luciano@agroprime.agr.br',
    whatsapp: '+55 19 98112-9900',
    industry: 'Agronegócio',
    employees: '500+',
    icpScore: 78,
    status: 'enriching',
    channels: { emailVerified: false, whatsappActive: true, linkedinFound: true }
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  
  // Modals state
  const [isGatesOpen, setIsGatesOpen] = useState(false);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isImportCsvOpen, setIsImportCsvOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [selectedProposalCompany, setSelectedProposalCompany] = useState('TechCorp Brasil');

  // Opportunity Builder State & Modals
  const [isNewOppOpen, setIsNewOppOpen] = useState(false);
  const [isScoringOpen, setIsScoringOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);
  const [isSearchQueriesOpen, setIsSearchQueriesOpen] = useState(false);
  const [isWeightsConfigOpen, setIsWeightsConfigOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [scoreWeights, setScoreWeights] = useState<ScoreWeights>(DEFAULT_SCORE_WEIGHTS);

  const [gates, setGates] = useState<AuditGateItem[]>([
    {
      id: 'gate-1',
      action: 'Disparo em Lote: Campanha Outbound Q4 (Fintechs)',
      details: 'Envio programado para 120 e-mails com rotação de 3 caixas postais e intervalo randômico de 60s.',
      requestedBy: 'SDR Autônomo #02',
      createdAt: 'Hoje às 14:15',
      status: 'pending'
    },
    {
      id: 'gate-2',
      action: 'Enriquecimento de Telefones via API Externa',
      details: 'Consulta de 45 contatos C-Level. Custo estimado em API: R$ 38,50.',
      requestedBy: 'FBR Auto-Scraper',
      createdAt: 'Hoje às 13:40',
      status: 'pending'
    }
  ]);

  const handleGateDecision = (id: string, decision: 'approved' | 'rejected') => {
    setGates(prev => prev.map(g => g.id === id ? { ...g, status: decision } : g));
  };

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleImportLeads = (newLeads: Lead[]) => {
    setLeads(prev => [...newLeads, ...prev]);
  };

  const openProposalModal = (company: string) => {
    setSelectedProposalCompany(company);
    setIsProposalOpen(true);
  };

  const handleOpenScoring = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setIsScoringOpen(true);
  };

  const handleOpenDossier = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setIsDossierOpen(true);
  };

  const handleOpenVerdict = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setIsVerdictOpen(true);
  };

  const handleOpenSearchQueries = (opp?: Opportunity) => {
    setSelectedOpportunity(opp || null);
    setIsSearchQueriesOpen(true);
  };

  const pendingGatesCount = gates.filter(g => g.status === 'pending').length;

  return (
    <div className="flex min-h-screen bg-background text-slate-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          onOpenGates={() => setIsGatesOpen(true)} 
          pendingGatesCount={pendingGatesCount} 
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* Top Banner / Welcome */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card border border-surface-border p-6 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="space-y-1 relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-brand/15 text-brand text-xs font-semibold border border-brand/30">
                <Sparkles className="w-3 h-3" /> FBR Revenue Engine v1.0
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Painel Executivo de Vendas & Automação
              </h1>
              <p className="text-xs text-slate-400">
                Monitore prospecção, qualificação autônoma com IA, CRM e governança em tempo real.
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <button 
                onClick={() => setActiveTab('opportunities')}
                className="px-3.5 py-2 bg-brand/15 hover:bg-brand/25 text-brand rounded-xl text-xs font-semibold border border-brand/30 transition flex items-center gap-1.5"
              >
                <Target className="w-4 h-4" /> Opportunity Builder
              </button>
              <button 
                onClick={() => setIsNewLeadOpen(true)}
                className="px-3.5 py-2 bg-surface-elevated hover:bg-surface-border text-slate-200 rounded-xl text-xs font-semibold border border-surface-border transition flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4 text-brand" /> + Lead ICP
              </button>
              <button 
                onClick={() => setActiveTab('ai-sdr')}
                className="px-4 py-2 bg-gradient-to-r from-accent-purple to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-lg shadow-accent-purple/20 flex items-center gap-2 transition"
              >
                <Bot className="w-4 h-4" /> AI SDR
              </button>
            </div>

            {/* Background Glow */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* Conditional Rendering by Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Pipeline Total Ativo"
                  value="R$ 480.000"
                  change="+18.4% vs mês ant."
                  isPositive={true}
                  icon={TrendingUp}
                  description="5 negócios ativos nas etapas de qualificação e proposta"
                />
                <MetricCard
                  title="Reuniões Agendadas"
                  value="14"
                  change="+4 esta semana"
                  isPositive={true}
                  icon={CalendarCheck}
                  description="85% qualificadas diretamente pelo AI SDR"
                />
                <MetricCard
                  title="Taxa de Resposta IA"
                  value="24.8%"
                  change="+6.2%"
                  isPositive={true}
                  icon={Zap}
                  description="Cadências omnichannel (Email + WhatsApp)"
                />
                <MetricCard
                  title="SLA Médio de Resposta"
                  value="1.4 min"
                  change="-42 seg"
                  isPositive={true}
                  icon={Bot}
                  description="Tempo de resposta automática para novos leads"
                />
              </div>

              {/* Central Section: Quick Leads & Mini Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LeadsTable 
                    leads={leads}
                    onOpenNewLead={() => setIsNewLeadOpen(true)}
                    onOpenImportCsv={() => setIsImportCsvOpen(true)}
                  />
                </div>

                {/* AI Performance Spotlight */}
                <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-accent-amber" /> Destaques da Semana
                      </span>
                      <span className="text-[10px] bg-accent-emerald/15 text-accent-emerald px-2 py-0.5 rounded font-semibold">
                        Alta Eficiência
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      A cadência <strong>"Outbound Logística & Supply Chain"</strong> atingiu <strong>31% de taxa de abertura</strong> com 3 reuniões agendadas nas últimas 48 horas.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-surface-border text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Leads Enriquecidos:</span>
                        <strong className="text-white">{leads.length + 140} contas</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>E-mails Entregues (Zero Bounce):</span>
                        <strong className="text-accent-emerald">99.2%</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Human Gates Aprovados:</span>
                        <strong className="text-slate-200">12 operações</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('cadences')}
                    className="w-full py-2 bg-surface-elevated hover:bg-surface-border text-slate-200 text-xs font-semibold rounded-lg border border-surface-border transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Gerenciar Cadências
                  </button>
                </div>
              </div>

              {/* Pipeline Section */}
              <KanbanBoard onOpenCreateProposal={openProposalModal} />
            </div>
          )}

          {activeTab === 'opportunities' && (
            <OpportunityDashboard
              onOpenNewOpportunity={() => setIsNewOppOpen(true)}
              onOpenScoring={handleOpenScoring}
              onOpenDossier={handleOpenDossier}
              onOpenVerdict={handleOpenVerdict}
              onOpenSearchQueries={handleOpenSearchQueries}
              onOpenWeightsConfig={() => setIsWeightsConfigOpen(true)}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsTable 
              leads={leads}
              onOpenNewLead={() => setIsNewLeadOpen(true)}
              onOpenImportCsv={() => setIsImportCsvOpen(true)}
            />
          )}

          {activeTab === 'cadences' && <CadenceBuilder />}
          {activeTab === 'whatsapp' && <WhatsAppHub />}
          {activeTab === 'pipeline' && <KanbanBoard onOpenCreateProposal={openProposalModal} />}
          {activeTab === 'ai-sdr' && <AiSdrSimulator />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}

          {activeTab === 'gates' && (
            <div className="bg-surface-card border border-surface-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent-amber" /> Central de Governança & Auditoria
                  </h2>
                  <p className="text-xs text-slate-400">Supervisão humana obrigatória para operações sensíveis e controle de custos</p>
                </div>
              </div>
              <div className="space-y-4">
                {gates.map(gate => (
                  <div key={gate.id} className="p-4 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{gate.action}</div>
                      <div className="text-xs text-slate-400">{gate.details}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                        gate.status === 'approved' ? 'bg-accent-emerald/20 text-accent-emerald' :
                        gate.status === 'rejected' ? 'bg-accent-rose/20 text-accent-rose' : 'bg-accent-amber/20 text-accent-amber'
                      }`}>
                        {gate.status}
                      </span>
                      {gate.status === 'pending' && (
                        <button 
                          onClick={() => handleGateDecision(gate.id, 'approved')}
                          className="px-3 py-1 bg-accent-emerald text-white rounded text-xs font-semibold hover:bg-emerald-600 transition"
                        >
                          Aprovar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <GatesModal 
        isOpen={isGatesOpen}
        onClose={() => setIsGatesOpen(false)}
        gates={gates}
        onDecide={handleGateDecision}
      />

      <NewLeadModal 
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onAddLead={handleAddLead}
      />

      <ImportCsvModal 
        isOpen={isImportCsvOpen}
        onClose={() => setIsImportCsvOpen(false)}
        onImport={handleImportLeads}
      />

      <CreateProposalModal 
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        dealCompany={selectedProposalCompany}
      />

      {/* Opportunity Builder Modals */}
      <NewOpportunityModal
        isOpen={isNewOppOpen}
        onClose={() => setIsNewOppOpen(false)}
        onSave={(newOpp) => {
          // New opportunity added
          setIsNewOppOpen(false);
        }}
      />

      <OpportunityScoringModal
        isOpen={isScoringOpen}
        onClose={() => setIsScoringOpen(false)}
        opportunity={selectedOpportunity}
        onUpdateOpportunity={(updated) => {
          setSelectedOpportunity(updated);
          setIsScoringOpen(false);
        }}
      />

      <DeepResearchDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        opportunity={selectedOpportunity}
        onSaveDossier={(updated) => {
          setSelectedOpportunity(updated);
          setIsDossierOpen(false);
        }}
      />

      <VerdictPautaModal
        isOpen={isVerdictOpen}
        onClose={() => setIsVerdictOpen(false)}
        opportunity={selectedOpportunity}
        onSaveVerdict={(updated) => {
          setSelectedOpportunity(updated);
          setIsVerdictOpen(false);
        }}
      />

      <SearchQueriesModal
        isOpen={isSearchQueriesOpen}
        onClose={() => setIsSearchQueriesOpen(false)}
        initialOpportunity={selectedOpportunity}
      />

      <WeightsConfigModal
        isOpen={isWeightsConfigOpen}
        onClose={() => setIsWeightsConfigOpen(false)}
        currentWeights={scoreWeights}
        onSaveWeights={(w) => {
          setScoreWeights(w);
          setIsWeightsConfigOpen(false);
        }}
      />
    </div>
  );
}
