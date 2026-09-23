import React, { useState } from 'react';
import { Opportunity, OpportunitySource, OpportunityMarket } from '../../types/opportunity';
import { generateMarketSearchQueries, GeneratedQuery } from '../../lib/searchGenerator';
import { X, Search, Copy, Check, Sparkles, Globe } from 'lucide-react';

interface SearchQueriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOpportunity?: Opportunity | null;
}

export const SearchQueriesModal: React.FC<SearchQueriesModalProps> = ({
  isOpen,
  onClose,
  initialOpportunity,
}) => {
  const [term, setTerm] = useState(initialOpportunity?.name || 'Fritadeira Air Fryer 6L');
  const [source, setSource] = useState<OpportunitySource>(initialOpportunity?.source || 'amazon');
  const [market, setMarket] = useState<OpportunityMarket>(initialOpportunity?.market || 'BR');
  const [queries, setQueries] = useState<GeneratedQuery[]>(
    generateMarketSearchQueries(initialOpportunity?.name || 'Fritadeira Air Fryer 6L', initialOpportunity?.source || 'amazon', initialOpportunity?.market || 'BR')
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;
    const generated = generateMarketSearchQueries(term, source, market);
    setQueries(generated);
  };

  const handleCopy = (queryText: string, index: number) => {
    navigator.clipboard.writeText(queryText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Gerador de Consultas de Pesquisa Profunda</h3>
              <p className="text-[11px] text-slate-400">Consultas avançadas nos padrões do radar de afiliados por mercado</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleGenerate} className="p-5 border-b border-surface-border bg-surface-elevated/40 space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Termo / Nome do Produto</label>
            <input
              type="text"
              required
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Ex: Fritadeira Air Fryer 6L, Suplemento Nootrópico..."
              className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Fonte</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as OpportunitySource)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand"
              >
                <option value="amazon">Amazon</option>
                <option value="maxweb">MaxWeb</option>
                <option value="digistore24">Digistore24</option>
                <option value="clickbank">ClickBank</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Mercado</label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value as OpportunityMarket)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand"
              >
                <option value="BR">Brasil (BR - Português)</option>
                <option value="US">Estados Unidos (US - Inglês)</option>
                <option value="EU">Europa (EU - Global)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-brand to-accent-purple hover:opacity-90 text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Gerar Consultas Estratégicas
          </button>
        </form>

        {/* Results List */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          {queries.map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-surface-card border border-surface-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{q.category}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(q.query, idx)}
                  className="px-2.5 py-1 rounded bg-surface-elevated hover:bg-brand/20 text-slate-300 hover:text-brand transition flex items-center gap-1 text-[11px]"
                >
                  {copiedIndex === idx ? <><Check className="w-3 h-3 text-accent-emerald" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
                </button>
              </div>

              <code className="p-2.5 rounded-lg bg-surface-elevated text-brand font-mono text-[11px] block break-all">
                {q.query}
              </code>

              <p className="text-[10px] text-slate-400 italic">Finalidade: {q.purpose}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-card flex items-center justify-end text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-elevated hover:bg-surface-border text-white rounded-lg font-medium transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
