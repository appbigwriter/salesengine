import React, { useState } from 'react';
import { 
  Opportunity, 
  OpportunitySource, 
  OpportunityTier, 
  OpportunityMarket,
  ScoreFactors
} from '../../types/opportunity';
import { calculateOpportunityScore, getTierLabel, DEFAULT_SCORE_WEIGHTS } from '../../lib/score';
import { 
  Sparkles, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  ExternalLink, 
  Sliders, 
  BookOpen, 
  CheckCircle2, 
  FileText,
  AlertTriangle,
  Flame,
  Globe,
  Settings2
} from 'lucide-react';

const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    name: 'Fritadeira Air Fryer Conectada 6L com Wi-Fi',
    source: 'amazon',
    category: 'Cozinha & Eletroportáteis',
    subcategory: 'Fritadeiras Elétricas',
    market: 'BR',
    url: 'https://amazon.com.br/dp/B0EXAMPLE1',
    signals: 'Top 1 Mais Vendido em Eletrodomésticos; 3.840 avaliações com média 4.8 estrelas; Selo Escolha da Amazon; Comissão média 9%.',
    ratings: {
      demanda: 5,
      monetizacao: 4,
      provaSocial: 5,
      tendencia: 4,
      fitBlog: 5,
      reputacao: 5,
      facilidadeSeo: 4,
      conformidade: 5,
    },
    score: 92,
    tier: 'A',
    verdict: 'seguir',
    verdictNote: 'Excelente tração de busca e alto volume de intenção de compra no mercado brasileiro.',
    blogId: 'blog-4',
    blogName: 'Gourmet & Café Brasil',
    dossier: {
      demandaMercado: { completed: true, checks: { volumeBusca: true, avaliacoesReais: true }, notes: 'Mais de 45k buscas/mês no Google BR.' },
      publicoDor: { completed: true, checks: { dorMapeada: true }, notes: 'Consumidores buscam economia de tempo e praticidade sem óleo.' },
      concorrenciaSeo: { completed: true, checks: { palavraChaveMapeada: true }, notes: 'Artigo comparativo de capacidade 6L tem baixa concorrência.' },
      anguloEditorial: { completed: true, checks: { ganchoDefinido: true }, notes: 'Foco em famílias de 4 a 6 pessoas.' },
      monetizacaoConfirmada: { completed: true, checks: { linkAtivo: true }, notes: 'Programa de Associados Amazon ativo.' },
      conformidadeRisco: { completed: true, checks: { semClaimsProibidos: true }, notes: 'Risco zero (não é YMYL).' },
    },
    scoreHistory: [
      { id: 'h-1', opportunityId: 'opp-1', score: 88, tier: 'A', ratings: { demanda: 4, monetizacao: 4, provaSocial: 5, tendencia: 4, fitBlog: 5, reputacao: 5, facilidadeSeo: 4, conformidade: 5 }, reason: 'Avaliação inicial', changedBy: 'Agente Hermes Prospecção', createdAt: '2026-09-20' },
      { id: 'h-2', opportunityId: 'opp-1', score: 92, tier: 'A', ratings: { demanda: 5, monetizacao: 4, provaSocial: 5, tendencia: 4, fitBlog: 5, reputacao: 5, facilidadeSeo: 4, conformidade: 5 }, reason: 'Atualização pós-validação de volume de busca', changedBy: 'Editor Chefe', createdAt: '2026-09-22' },
    ],
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-22T14:30:00Z',
  },
  {
    id: 'opp-2',
    name: 'NeuroFocus Complex — Suplemento de Foco & Memória',
    source: 'maxweb',
    category: 'Saúde & Nutrição',
    subcategory: 'Suplementos Nootrópicos',
    market: 'US',
    url: 'https://maxweb.com/offer/neurofocus',
    signals: 'EPC $3.85 comprovado na rede; Payout CPA de $90 por venda; VSL com conversão de 3.2% no tráfego frio americano.',
    ratings: {
      demanda: 4,
      monetizacao: 5,
      provaSocial: 4,
      tendencia: 4,
      fitBlog: 4,
      reputacao: 4,
      facilidadeSeo: 3,
      conformidade: 2, // Nicho YMYL
    },
    score: 76,
    tier: 'A',
    verdict: 'testar',
    verdictNote: 'Alto payout, mas requer disclaimer rigoroso de saúde e conformidade FDA/FTC.',
    blogId: 'blog-2',
    blogName: 'Saúde & Longevidade Prática',
    dossier: {
      demandaMercado: { completed: true, checks: { volumeBusca: true }, notes: 'Interesse crescente em nootrópicos no mercado US.' },
      publicoDor: { completed: true, checks: { dorMapeada: true }, notes: 'Profissionais e estudantes com estafa mental.' },
      concorrenciaSeo: { completed: false, checks: {}, notes: 'Mercado saturado para keywords genéricas.' },
      anguloEditorial: { completed: true, checks: {}, notes: 'Foco em ingredientes naturais e hábitos de sono.' },
      monetizacaoConfirmada: { completed: true, checks: {}, notes: 'Payout garantido pela MaxWeb.' },
      conformidadeRisco: { completed: true, checks: {}, notes: 'Alerta YMYL: Não prometer cura; exigir aviso médico.' },
    },
    scoreHistory: [
      { id: 'h-3', opportunityId: 'opp-2', score: 76, tier: 'A', ratings: { demanda: 4, monetizacao: 5, provaSocial: 4, tendencia: 4, fitBlog: 4, reputacao: 4, facilidadeSeo: 3, conformidade: 2 }, reason: 'Cadastro inicial', changedBy: 'Agente Hermes Scanner', createdAt: '2026-09-21' }
    ],
    createdAt: '2026-09-21T11:00:00Z',
    updatedAt: '2026-09-22T09:15:00Z',
  },
  {
    id: 'opp-3',
    name: 'Automation Mastery — Gestão com Agentes de IA',
    source: 'digistore24',
    category: 'Negócios & Software',
    subcategory: 'Treinamentos de Automação',
    market: 'EU',
    url: 'https://digistore24.com/redir/54321',
    signals: 'Comissão de 70% com ticket médio de €197; Baixo índice de cancelamento (1.8%); Faturamento compliant na Alemanha/UE.',
    ratings: {
      demanda: 3,
      monetizacao: 4,
      provaSocial: 3,
      tendencia: 5,
      fitBlog: 4,
      reputacao: 4,
      facilidadeSeo: 3,
      conformidade: 4,
    },
    score: 64,
    tier: 'B',
    verdict: 'pesquisar',
    verdictNote: 'Tendência forte, porém volume de busca na Europa ainda em consolidação.',
    blogId: 'blog-3',
    blogName: 'Finanças & Renda Digital',
    dossier: {
      demandaMercado: { completed: false, checks: {}, notes: '' },
      publicoDor: { completed: false, checks: {}, notes: '' },
      concorrenciaSeo: { completed: false, checks: {}, notes: '' },
      anguloEditorial: { completed: false, checks: {}, notes: '' },
      monetizacaoConfirmada: { completed: false, checks: {}, notes: '' },
      conformidadeRisco: { completed: false, checks: {}, notes: '' },
    },
    scoreHistory: [],
    createdAt: '2026-09-22T08:00:00Z',
    updatedAt: '2026-09-22T08:00:00Z',
  }
];

interface OpportunityDashboardProps {
  onOpenNewOpportunity: () => void;
  onOpenScoring: (opp: Opportunity) => void;
  onOpenDossier: (opp: Opportunity) => void;
  onOpenVerdict: (opp: Opportunity) => void;
  onOpenSearchQueries: (opp?: Opportunity) => void;
  onOpenWeightsConfig: () => void;
}

export const OpportunityDashboard: React.FC<OpportunityDashboardProps> = ({
  onOpenNewOpportunity,
  onOpenScoring,
  onOpenDossier,
  onOpenVerdict,
  onOpenSearchQueries,
  onOpenWeightsConfig,
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [marketFilter, setMarketFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpportunities = opportunities.filter((opp) => {
    if (sourceFilter !== 'all' && opp.source !== sourceFilter) return false;
    if (tierFilter !== 'all' && opp.tier !== tierFilter) return false;
    if (marketFilter !== 'all' && opp.market !== marketFilter) return false;
    if (searchQuery && !opp.name.toLowerCase().includes(searchQuery.toLowerCase()) && !opp.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const tierStats = {
    A: opportunities.filter(o => o.tier === 'A').length,
    B: opportunities.filter(o => o.tier === 'B').length,
    C: opportunities.filter(o => o.tier === 'C').length,
    D: opportunities.filter(o => o.tier === 'D').length,
  };

  const avgScore = Math.round(opportunities.reduce((acc, o) => acc + o.score, 0) / (opportunities.length || 1));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple text-xs font-semibold border border-accent-purple/30">
            <Sparkles className="w-3.5 h-3.5" /> Opportunity Builder Engine
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Descoberta, Scoring & Pesquisa Profunda de Afiliados
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Prospecção estruturada nas 4 fontes (Amazon, MaxWeb, Digistore24, ClickBank), ranqueamento transparente e geração de pautas temáticas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenWeightsConfig}
            className="px-3 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-xl text-xs font-medium border border-surface-border transition flex items-center gap-1.5"
            title="Ajustar pesos dos 8 fatores"
          >
            <Settings2 className="w-4 h-4 text-brand" /> Pesos do Score
          </button>
          <button
            onClick={() => onOpenSearchQueries()}
            className="px-3 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-xl text-xs font-medium border border-surface-border transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4 text-accent-purple" /> Gerador de Buscas
          </button>
          <a
            href="/api/opportunity-builder/export?format=md"
            download
            className="px-3 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-xl text-xs font-medium border border-surface-border transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-accent-emerald" /> Exportar MD
          </a>
          <button
            onClick={onOpenNewOpportunity}
            className="px-4 py-2 bg-gradient-to-r from-brand to-accent-purple hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Nova Oportunidade
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface-card border border-surface-border rounded-xl p-4">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Média do Pipeline</span>
          <div className="text-2xl font-black text-white mt-1">{avgScore}<span className="text-xs text-slate-400 font-normal"> / 100</span></div>
          <span className="text-[11px] text-brand font-semibold">Opportunity Score</span>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-4">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Tier A (Prioridade)</span>
          <div className="text-2xl font-black text-accent-emerald mt-1">{tierStats.A}</div>
          <span className="text-[11px] text-slate-400">Score ≥ 75 (Prontos)</span>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-4">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Tier B (Testar)</span>
          <div className="text-2xl font-black text-brand mt-1">{tierStats.B}</div>
          <span className="text-[11px] text-slate-400">Score 55–74</span>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-4">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Tier C / D</span>
          <div className="text-2xl font-black text-accent-amber mt-1">{tierStats.C + tierStats.D}</div>
          <span className="text-[11px] text-slate-400">Pesquisar / Cortar</span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar produto, categoria ou sinais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-surface-elevated border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
          >
            <option value="all">Todas as Fontes</option>
            <option value="amazon">Amazon</option>
            <option value="maxweb">MaxWeb</option>
            <option value="digistore24">Digistore24</option>
            <option value="clickbank">ClickBank</option>
          </select>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-surface-elevated border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
          >
            <option value="all">Todos os Tiers</option>
            <option value="A">Tier A (≥ 75)</option>
            <option value="B">Tier B (55–74)</option>
            <option value="C">Tier C (35–54)</option>
            <option value="D">Descartar (&lt; 35)</option>
          </select>

          {/* Market Filter */}
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
            className="bg-surface-elevated border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
          >
            <option value="all">Todos os Mercados</option>
            <option value="BR">Brasil (BR)</option>
            <option value="US">Estados Unidos (US)</option>
            <option value="EU">Europa (EU)</option>
          </select>
        </div>
      </div>

      {/* Opportunities Ranked List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => {
          const tierMeta = getTierLabel(opp.tier);
          const { factorContributions } = calculateOpportunityScore(opp.ratings);

          return (
            <div
              key={opp.id}
              className="bg-surface-card border border-surface-border hover:border-brand/40 rounded-2xl p-5 space-y-4 transition shadow-lg group"
            >
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${tierMeta.badgeColor}`}>
                      {tierMeta.label}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-elevated text-slate-300 border border-surface-border">
                      {opp.source.toUpperCase()}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-elevated text-slate-400 border border-surface-border flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {opp.market}
                    </span>

                    {opp.blogName && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand/15 text-brand border border-brand/30">
                        Blog: {opp.blogName}
                      </span>
                    )}

                    {opp.ratings.conformidade <= 2 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-rose/20 text-accent-rose border border-accent-rose/40 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> YMYL Sensível
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    {opp.name}
                    {opp.url && (
                      <a href={opp.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand transition">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>

                  <p className="text-xs text-slate-400">
                    {opp.category} {opp.subcategory ? `› ${opp.subcategory}` : ''}
                  </p>
                </div>

                {/* Score Big Display & Actions */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-black text-white tracking-tight flex items-baseline justify-end gap-1">
                      <span className={opp.score >= 75 ? 'text-accent-emerald' : opp.score >= 55 ? 'text-brand' : 'text-accent-amber'}>
                        {opp.score}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Opportunity Score</span>
                  </div>
                </div>
              </div>

              {/* Signals Box */}
              <div className="p-3 rounded-xl bg-surface-elevated/60 border border-surface-border text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-slate-200">Sinais Coletados: </strong> {opp.signals}
              </div>

              {/* "Leitura de Sinal" — Factor Contribution Grid */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Leitura de Sinal (8 Fatores Ponderados)</span>
                  <span>Notas de 0 a 5</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Demanda (22%)</span>
                    <strong className="text-white text-xs">{opp.ratings.demanda}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Monetização (20%)</span>
                    <strong className="text-white text-xs">{opp.ratings.monetizacao}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Prova Social (12%)</span>
                    <strong className="text-white text-xs">{opp.ratings.provaSocial}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Tendência (12%)</span>
                    <strong className="text-white text-xs">{opp.ratings.tendencia}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Fit Blog (12%)</span>
                    <strong className="text-white text-xs">{opp.ratings.fitBlog}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Reputação (8%)</span>
                    <strong className="text-white text-xs">{opp.ratings.reputacao}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Fácil SEO (8%)</span>
                    <strong className="text-white text-xs">{opp.ratings.facilidadeSeo}/5</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-elevated/40 border border-surface-border text-center">
                    <span className="text-[10px] text-slate-400 block truncate">Conformidade (6%)</span>
                    <strong className={opp.ratings.conformidade <= 2 ? 'text-accent-rose text-xs' : 'text-white text-xs'}>
                      {opp.ratings.conformidade}/5
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-surface-border text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Veredito:</span>
                  <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                    opp.verdict === 'seguir' ? 'bg-accent-emerald/20 text-accent-emerald' :
                    opp.verdict === 'testar' ? 'bg-brand/20 text-brand' :
                    opp.verdict === 'descartar' ? 'bg-accent-rose/20 text-accent-rose' : 'bg-accent-amber/20 text-accent-amber'
                  }`}>
                    {opp.verdict ? opp.verdict : 'Pendente'}
                  </span>
                  {opp.scoreHistory && opp.scoreHistory.length > 0 && (
                    <span className="text-[10px] text-slate-400">
                      • {opp.scoreHistory.length} avaliações no histórico
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onOpenScoring(opp)}
                    className="px-3 py-1.5 bg-surface-elevated hover:bg-surface-border text-slate-200 rounded-lg text-xs font-medium border border-surface-border transition flex items-center gap-1"
                  >
                    <Sliders className="w-3.5 h-3.5 text-brand" /> Pontuar Fatores
                  </button>
                  <button
                    onClick={() => onOpenDossier(opp)}
                    className="px-3 py-1.5 bg-surface-elevated hover:bg-surface-border text-slate-200 rounded-lg text-xs font-medium border border-surface-border transition flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-accent-purple" /> Dossiê 6 Frentes
                  </button>
                  <button
                    onClick={() => onOpenVerdict(opp)}
                    className="px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Veredito & Pauta
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOpportunities.length === 0 && (
          <div className="p-12 text-center bg-surface-card border border-surface-border rounded-2xl space-y-3">
            <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">Nenhuma oportunidade encontrada com esses filtros</h4>
            <p className="text-xs text-slate-400">Tente limpar os filtros ou cadastre um novo produto afiliado candidato.</p>
          </div>
        )}
      </div>
    </div>
  );
};
