import React, { useState } from 'react';
import { ScoreWeights } from '../../types/opportunity';
import { DEFAULT_SCORE_WEIGHTS } from '../../lib/score';
import { X, Settings2, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface WeightsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeights?: ScoreWeights;
  onSaveWeights: (weights: ScoreWeights) => void;
}

export const WeightsConfigModal: React.FC<WeightsConfigModalProps> = ({
  isOpen,
  onClose,
  currentWeights = DEFAULT_SCORE_WEIGHTS,
  onSaveWeights,
}) => {
  const [weights, setWeights] = useState<ScoreWeights>(currentWeights);

  if (!isOpen) return null;

  const totalSum = Object.values(weights).reduce((acc, curr) => acc + curr, 0);
  const isValid = totalSum === 100;

  const handleChange = (key: keyof ScoreWeights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleReset = () => {
    setWeights(DEFAULT_SCORE_WEIGHTS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSaveWeights(weights);
    onClose();
  };

  const weightFields: { key: keyof ScoreWeights; label: string; desc: string }[] = [
    { key: 'demanda', label: 'Demanda & Volume', desc: 'Volume de busca, ranking de mais vendidos e avaliações' },
    { key: 'monetizacao', label: 'Monetização & Payout', desc: 'Comissão, ticket médio e potencial de recorrência/EPC' },
    { key: 'provaSocial', label: 'Prova Social', desc: 'Nota média e profundidade de comentários' },
    { key: 'tendencia', label: 'Tendência & Momentum', desc: 'Comportamento recente de procura' },
    { key: 'fitBlog', label: 'Fit com o Blog', desc: 'Alinhamento com a linha editorial do blog temático' },
    { key: 'reputacao', label: 'Reputação do Vendedor', desc: 'Confiabilidade de entrega e baixo índice de reembolso' },
    { key: 'facilidadeSeo', label: 'Facilidade SEO', desc: 'Nível de concorrência e lacunas na SERP' },
    { key: 'conformidade', label: 'Conformidade & Risco', desc: 'Segurança regulatória e aderência às diretrizes CDC/FTC' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Configuração dos Pesos do Score</h3>
              <p className="text-[11px] text-slate-400">Ajuste dos 8 fatores (a soma deve ser exatamente 100)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Total Sum Bar */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
            isValid 
              ? 'bg-accent-emerald/15 border-accent-emerald/30 text-accent-emerald' 
              : 'bg-accent-rose/15 border-accent-rose/30 text-accent-rose animate-pulse'
          }`}>
            <span className="flex items-center gap-1.5">
              {!isValid && <AlertCircle className="w-4 h-4" />}
              Soma Atual dos Pesos:
            </span>
            <span className="text-sm">{totalSum} / 100</span>
          </div>

          <div className="space-y-2.5 divide-y divide-surface-border/60">
            {weightFields.map((f) => (
              <div key={f.key} className="pt-2.5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-white block">{f.label}</span>
                  <span className="text-[10px] text-slate-400">{f.desc}</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={weights[f.key]}
                    onChange={(e) => handleChange(f.key, Number(e.target.value))}
                    className="w-16 bg-surface-card border border-surface-border rounded-lg px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-brand"
                  />
                  <span className="text-slate-400 font-bold">%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-between border-t border-surface-border text-xs">
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Restaurar Padrão
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-lg font-medium transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="px-4 py-1.5 bg-brand hover:bg-brand-hover disabled:opacity-50 text-white rounded-lg font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Salvar Pesos
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
