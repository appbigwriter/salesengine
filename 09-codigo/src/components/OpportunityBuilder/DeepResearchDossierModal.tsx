import React, { useState } from 'react';
import { Opportunity, OpportunityDossier } from '../../types/opportunity';
import { generateMarketSearchQueries } from '../../lib/searchGenerator';
import { X, BookOpen, CheckSquare, Search, Copy, Check, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface DeepResearchDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onSaveDossier: (opp: Opportunity) => void;
}

export const DeepResearchDossierModal: React.FC<DeepResearchDossierModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onSaveDossier,
}) => {
  if (!isOpen || !opportunity) return null;

  const [dossier, setDossier] = useState<OpportunityDossier>(opportunity.dossier);
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  const searchQueries = generateMarketSearchQueries(opportunity.name, opportunity.source, opportunity.market);

  const handleCopyQuery = (queryText: string) => {
    navigator.clipboard.writeText(queryText);
    setCopiedQuery(queryText);
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const handleNotesChange = (section: keyof OpportunityDossier, text: string) => {
    setDossier(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        notes: text,
        completed: text.trim().length > 10,
      }
    }));
  };

  const handleCheckToggle = (section: keyof OpportunityDossier, checkKey: string) => {
    setDossier(prev => {
      const currentChecks = prev[section]?.checks || {};
      const updated = {
        ...currentChecks,
        [checkKey]: !currentChecks[checkKey],
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          checks: updated,
        }
      };
    });
  };

  const handleSave = () => {
    const updatedOpp: Opportunity = {
      ...opportunity,
      dossier,
      updatedAt: new Date().toISOString(),
    };
    onSaveDossier(updatedOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-4xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Dossiê de Pesquisa Profunda (6 Frentes)</h3>
              <p className="text-[11px] text-slate-400">
                Produto: <strong className="text-slate-200">{opportunity.name}</strong> • Mercado: <strong className="text-brand">{opportunity.market}</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Queries Assistant Bar */}
        <div className="p-4 bg-surface-elevated/80 border-b border-surface-border space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-accent-purple flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Consultas Estratégicas Geradas para Pesquisa:
            </span>
            <span className="text-[10px] text-slate-400">Clique para copiar e colar no Google/Reddit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {searchQueries.map((q, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-surface-card border border-surface-border flex items-center justify-between gap-2 text-xs">
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-semibold">{q.category}</span>
                  <code className="text-[11px] text-brand truncate block">{q.query}</code>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyQuery(q.query)}
                  className="p-1.5 rounded bg-surface-elevated hover:bg-brand/20 text-slate-300 hover:text-brand transition shrink-0"
                  title="Copiar consulta"
                >
                  {copiedQuery === q.query ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Frentes Form Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Frente 1: Demanda & Mercado */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px]">1</span>
                Demanda & Mercado Real
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dossier.demandaMercado?.completed ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-slate-800 text-slate-400'}`}>
                {dossier.demandaMercado?.completed ? 'Preenchido' : 'Pendente'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!!dossier.demandaMercado?.checks?.volumeBusca} 
                  onChange={() => handleCheckToggle('demandaMercado', 'volumeBusca')}
                  className="rounded bg-surface-elevated border-surface-border text-brand"
                />
                Volume de busca confirmado ({'>'} 10k/mês)
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!!dossier.demandaMercado?.checks?.avaliacoesReais} 
                  onChange={() => handleCheckToggle('demandaMercado', 'avaliacoesReais')}
                  className="rounded bg-surface-elevated border-surface-border text-brand"
                />
                Avaliações recentes nos últimos 30 dias
              </label>
            </div>

            <textarea
              rows={2}
              value={dossier.demandaMercado?.notes || ''}
              onChange={(e) => handleNotesChange('demandaMercado', e.target.value)}
              placeholder="Achados: volume de buscas mensais, tendência no Google Trends, sazonalidade..."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          {/* Frente 2: Público & Dor */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px]">2</span>
                Público-Alvo & Dores Emocionais
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dossier.publicoDor?.completed ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-slate-800 text-slate-400'}`}>
                {dossier.publicoDor?.completed ? 'Preenchido' : 'Pendente'}
              </span>
            </div>

            <textarea
              rows={2}
              value={dossier.publicoDor?.notes || ''}
              onChange={(e) => handleNotesChange('publicoDor', e.target.value)}
              placeholder="Achados: Quem compra? Qual o problema exato que o produto resolve? Frases exatas extraídas dos reviews..."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          {/* Frente 3: Concorrência & SEO */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px]">3</span>
                Concorrência & Oportunidade SEO
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dossier.concorrenciaSeo?.completed ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-slate-800 text-slate-400'}`}>
                {dossier.concorrenciaSeo?.completed ? 'Preenchido' : 'Pendente'}
              </span>
            </div>

            <textarea
              rows={2}
              value={dossier.concorrenciaSeo?.notes || ''}
              onChange={(e) => handleNotesChange('concorrenciaSeo', e.target.value)}
              placeholder="Achados: Quais artigos ranqueiam no Google hoje? O que eles deixaram de cobrir? Lacunas de intenção..."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          {/* Frente 4: Ângulo Editorial */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px]">4</span>
                Ângulo Editorial & Gancho Ético
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dossier.anguloEditorial?.completed ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-slate-800 text-slate-400'}`}>
                {dossier.anguloEditorial?.completed ? 'Preenchido' : 'Pendente'}
              </span>
            </div>

            <textarea
              rows={2}
              value={dossier.anguloEditorial?.notes || ''}
              onChange={(e) => handleNotesChange('anguloEditorial', e.target.value)}
              placeholder="Achados: Gancho de abertura, comparação honesta (pontos positivos x negativos reais)..."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          {/* Frente 5: Monetização Confirmada */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px]">5</span>
                Monetização Confirmada & Link Ativo
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dossier.monetizacaoConfirmada?.completed ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-slate-800 text-slate-400'}`}>
                {dossier.monetizacaoConfirmada?.completed ? 'Preenchido' : 'Pendente'}
              </span>
            </div>

            <textarea
              rows={2}
              value={dossier.monetizacaoConfirmada?.notes || ''}
              onChange={(e) => handleNotesChange('monetizacaoConfirmada', e.target.value)}
              placeholder="Achados: Link de afiliado testado e ativo; % de comissão confirmada; cookies válidos..."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          {/* Frente 6: Conformidade & Risco YMYL */}
          <div className="bg-surface-card border border-accent-rose/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-accent-rose uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-rose" />
                6. Conformidade, CDC/CONAR/FTC & AdSense
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dossier.conformidadeRisco?.completed ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-slate-800 text-slate-400'}`}>
                {dossier.conformidadeRisco?.completed ? 'Preenchido' : 'Pendente'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!!dossier.conformidadeRisco?.checks?.semClaimsProibidos} 
                  onChange={() => handleCheckToggle('conformidadeRisco', 'semClaimsProibidos')}
                  className="rounded bg-surface-elevated border-surface-border text-accent-rose"
                />
                Sem promessas milagrosas de cura/ganho fácil
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!!dossier.conformidadeRisco?.checks?.disclaimerPrevisto} 
                  onChange={() => handleCheckToggle('conformidadeRisco', 'disclaimerPrevisto')}
                  className="rounded bg-surface-elevated border-surface-border text-accent-rose"
                />
                Aviso obrigatório de afiliado no topo & CTA
              </label>
            </div>

            <textarea
              rows={2}
              value={dossier.conformidadeRisco?.notes || ''}
              onChange={(e) => handleNotesChange('conformidadeRisco', e.target.value)}
              placeholder="Achados de conformidade: O produto possui advertências na Anvisa/FDA? Alertas de segurança para incluir na pauta..."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-card flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Regra de Ouro: <strong>Nunca inventar dados — registrar apenas evidências reais.</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-lg font-medium transition"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Salvar Dossiê
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
