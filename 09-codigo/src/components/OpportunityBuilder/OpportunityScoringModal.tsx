import React, { useState } from 'react';
import { Opportunity, ScoreFactors, ScoreHistoryEntry } from '../../types/opportunity';
import { calculateOpportunityScore, getTierLabel, DEFAULT_SCORE_WEIGHTS } from '../../lib/score';
import { X, Sliders, History, Sparkles, Check, AlertTriangle, User, Calendar } from 'lucide-react';

interface OpportunityScoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onUpdateOpportunity: (updated: Opportunity) => void;
}

export const OpportunityScoringModal: React.FC<OpportunityScoringModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onUpdateOpportunity,
}) => {
  if (!isOpen || !opportunity) return null;

  const [ratings, setRatings] = useState<ScoreFactors>(opportunity.ratings);
  const [historyReason, setHistoryReason] = useState('');
  const [activeTab, setActiveTab] = useState<'score' | 'history'>('score');

  const { score, tier, factorContributions } = calculateOpportunityScore(ratings);
  const tierMeta = getTierLabel(tier);

  const handleRatingChange = (key: keyof ScoreFactors, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();

    const newHistoryEntry: ScoreHistoryEntry = {
      id: `h-${Date.now()}`,
      opportunityId: opportunity.id,
      score,
      tier,
      ratings,
      reason: historyReason || 'Atualização periódica de pontuação',
      changedBy: 'Agente Hermes Avaliador',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedOpp: Opportunity = {
      ...opportunity,
      ratings,
      score,
      tier,
      scoreHistory: [newHistoryEntry, ...(opportunity.scoreHistory || [])],
      updatedAt: new Date().toISOString(),
    };

    onUpdateOpportunity(updatedOpp);
    onClose();
  };

  const factorsConfig: { key: keyof ScoreFactors; label: string; weight: number; desc: string }[] = [
    { key: 'demanda', label: '1. Demanda', weight: 22, desc: 'Volume de busca, posição nos mais vendidos, volume de avaliações.' },
    { key: 'monetizacao', label: '2. Monetização', weight: 20, desc: 'Comissão × ticket médio × taxa de conversão (EPC comprovado).' },
    { key: 'provaSocial', label: '3. Prova Social', weight: 12, desc: 'Nota média e profundidade dos comentários espontâneos.' },
    { key: 'tendencia', label: '4. Tendência', weight: 12, desc: 'Comportamento recente (em ascensão, estável ou em queda).' },
    { key: 'fitBlog', label: '5. Fit com o Blog', weight: 12, desc: 'Alinhamento temático com o sub-nicho e a audiência do blog.' },
    { key: 'reputacao', label: '6. Reputação do Vendedor', weight: 8, desc: 'Histórico de entrega, reclamações e suporte da marca.' },
    { key: 'facilidadeSeo', label: '7. Facilidade SEO', weight: 8, desc: 'Quanto menos saturada a SERP, maior deve ser a nota.' },
    { key: 'conformidade', label: '8. Conformidade & Risco', weight: 6, desc: 'Menor risco regulatório (YMYL, promessas proibidas).' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-3xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Pontuação dos 8 Fatores — {opportunity.name}</h3>
              <p className="text-[11px] text-slate-400">Motor ponderado transparente nos padrões do Radar de Afiliados</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader / Tabs */}
        <div className="px-6 py-2 border-b border-surface-border bg-surface-elevated/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('score')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'score' ? 'bg-brand text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pontuar Fatores
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'history' ? 'bg-brand text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" /> Histórico de Scores ({opportunity.scoreHistory?.length || 0})
            </button>
          </div>

          {/* Live Score Preview */}
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${tierMeta.badgeColor}`}>
              {tierMeta.label}
            </span>
            <div className="text-right">
              <span className="text-xl font-black text-white">{score}</span>
              <span className="text-xs text-slate-400 font-normal"> / 100</span>
            </div>
          </div>
        </div>

        {activeTab === 'score' ? (
          <form onSubmit={handleSaveScore} className="p-6 space-y-5 overflow-y-auto flex-1">
            {ratings.conformidade <= 2 && (
              <div className="p-3.5 rounded-xl bg-accent-rose/15 border border-accent-rose/40 text-accent-rose text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Atenção Nicho Sensível (YMYL):</strong> A nota de conformidade baixa penalizou o score geral. Recomenda-se preencher a seção de Conformidade no Dossiê antes de seguir.
                </span>
              </div>
            )}

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {factorsConfig.map((f) => {
                const val = ratings[f.key];
                return (
                  <div key={f.key} className="bg-surface-elevated/60 border border-surface-border rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{f.label} ({f.weight}%)</span>
                      <span className="text-xs font-black text-brand bg-brand/10 px-2 py-0.5 rounded border border-brand/20">
                        {val} / 5
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-tight">{f.desc}</p>

                    <div className="pt-1 flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={val}
                        onChange={(e) => handleRatingChange(f.key, Number(e.target.value))}
                        className="w-full h-1.5 bg-surface-card rounded-lg appearance-none cursor-pointer accent-brand"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reason for change */}
            <div className="space-y-1 pt-2 border-t border-surface-border">
              <label className="text-[11px] font-semibold text-slate-400">Motivo / Justificativa da Alteração (para o Histórico)</label>
              <input
                type="text"
                value={historyReason}
                onChange={(e) => setHistoryReason(e.target.value)}
                placeholder="Ex: Atualização pós-pesquisa de concorrência e confirmação de payout"
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>

            {/* Actions */}
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
                <Check className="w-3.5 h-3.5" /> Salvar Score & Gravar Histórico
              </button>
            </div>
          </form>
        ) : (
          /* History View */
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-brand" />
              Linha do Tempo de Pontuação & Auditoria
            </h4>

            {opportunity.scoreHistory && opportunity.scoreHistory.length > 0 ? (
              <div className="space-y-3">
                {opportunity.scoreHistory.map((h, idx) => (
                  <div key={h.id || idx} className="p-3.5 rounded-xl bg-surface-elevated/60 border border-surface-border space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">{h.score} pts</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand/20 text-brand">
                          Tier {h.tier}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {h.createdAt}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">{h.reason}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-border/50 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" /> Registrado por: <strong className="text-slate-200">{h.changedBy}</strong>
                      </span>
                      <span>D:{h.ratings.demanda} | M:{h.ratings.monetizacao} | S:{h.ratings.provaSocial} | C:{h.ratings.conformidade}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Nenhum histórico anterior registrado para esta oportunidade.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
