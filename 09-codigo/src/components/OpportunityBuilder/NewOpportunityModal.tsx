import React, { useState } from 'react';
import { Opportunity, OpportunitySource, OpportunityMarket } from '../../types/opportunity';
import { SOURCE_ADAPTERS } from '../../lib/adapters/sourceAdapters';
import { calculateOpportunityScore } from '../../lib/score';
import { X, Sparkles, Plus, ExternalLink, HelpCircle, Check } from 'lucide-react';

interface NewOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (opp: Opportunity) => void;
}

export const NewOpportunityModal: React.FC<NewOpportunityModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [source, setSource] = useState<OpportunitySource>('amazon');
  const [category, setCategory] = useState('Eletrodomésticos & Cozinha');
  const [subcategory, setSubcategory] = useState('Fritadeiras & Air Fryers');
  const [market, setMarket] = useState<OpportunityMarket>('BR');
  const [url, setUrl] = useState('');
  const [signals, setSignals] = useState('');

  if (!isOpen) return null;

  const currentAdapter = SOURCE_ADAPTERS[source];

  const handleSourceChange = (newSource: OpportunitySource) => {
    setSource(newSource);
    setMarket(SOURCE_ADAPTERS[newSource].defaultMarket);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initialRatings = {
      demanda: 3,
      monetizacao: 3,
      provaSocial: 3,
      tendencia: 3,
      fitBlog: 3,
      reputacao: 3,
      facilidadeSeo: 3,
      conformidade: 3,
    };

    const { score, tier } = calculateOpportunityScore(initialRatings);

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      name,
      source,
      category,
      subcategory,
      market,
      url,
      signals: signals || 'Sinais inseridos no cadastro inicial.',
      ratings: initialRatings,
      score,
      tier,
      dossier: {
        demandaMercado: { completed: false, checks: {}, notes: '' },
        publicoDor: { completed: false, checks: {}, notes: '' },
        concorrenciaSeo: { completed: false, checks: {}, notes: '' },
        anguloEditorial: { completed: false, checks: {}, notes: '' },
        monetizacaoConfirmada: { completed: false, checks: {}, notes: '' },
        conformidadeRisco: { completed: false, checks: {}, notes: '' },
      },
      scoreHistory: [
        {
          id: `h-${Date.now()}`,
          opportunityId: `opp-${Date.now()}`,
          score,
          tier,
          ratings: initialRatings,
          reason: 'Cadastro inicial de candidato',
          changedBy: 'Operador Hermes',
          createdAt: new Date().toISOString().split('T')[0],
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-accent-purple flex items-center justify-center text-white shadow-md shadow-brand/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Cadastrar Oportunidade de Afiliado</h3>
              <p className="text-[11px] text-slate-400">Intake manual assistido por fonte e categoria</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Nome e Link */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Nome do Produto / Oferta *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Fritadeira Air Fryer Conectada 6L com Wi-Fi"
              className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Fonte */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Fonte do Afiliado *</label>
              <select
                value={source}
                onChange={(e) => handleSourceChange(e.target.value as OpportunitySource)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand font-medium"
              >
                <option value="amazon">Amazon Associates</option>
                <option value="maxweb">MaxWeb (CPA)</option>
                <option value="digistore24">Digistore24</option>
                <option value="clickbank">ClickBank</option>
              </select>
            </div>

            {/* Mercado */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Mercado Alvo</label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value as OpportunityMarket)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              >
                <option value="BR">Brasil (BR - BRL)</option>
                <option value="US">Estados Unidos (US - USD)</option>
                <option value="EU">Europa (EU - EUR)</option>
              </select>
            </div>

            {/* Link da Oferta */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">URL / Link da Oferta</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Categoria Principal</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Cozinha & Eletrodomésticos"
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Subcategoria / Sub-nicho</label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="Ex: Fritadeiras Elétricas"
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Dica Dinâmica de Sinais por Fonte */}
          <div className="p-3.5 rounded-xl bg-surface-elevated/80 border border-brand/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-brand flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Sinais Esperados para {currentAdapter.displayName}:
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Radar de Afiliados</span>
            </div>
            <p className="text-[11px] text-slate-300 italic">{currentAdapter.notes}</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {currentAdapter.signalFields.map((field) => (
                <div key={field.key} className="text-[10px] text-slate-400 bg-surface-card/60 p-1.5 rounded border border-surface-border">
                  <strong className="text-white block">{field.label}:</strong> {field.placeholder}
                </div>
              ))}
            </div>
          </div>

          {/* Campo de Sinais Coletados */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Sinais Coletados & Métricas Reais *</label>
            <textarea
              rows={3}
              value={signals}
              onChange={(e) => setSignals(e.target.value)}
              placeholder="Cole os dados observados no marketplace (Ex: Top 1 mais vendido, 3.800 avaliações com média 4.7 estrelas, comissão 9%, EPC $3.40)..."
              className="w-full bg-surface-card border border-surface-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-surface-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-lg text-xs font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-brand to-accent-purple hover:opacity-90 text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Salvar Oportunidade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
