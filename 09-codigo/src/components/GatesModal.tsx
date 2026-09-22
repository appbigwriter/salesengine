import React from 'react';
import { AuditGateItem } from '../types';
import { ShieldCheck, Check, X, AlertTriangle, User, Calendar } from 'lucide-react';

interface GatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  gates: AuditGateItem[];
  onDecide: (id: string, decision: 'approved' | 'rejected') => void;
}

export const GatesModal: React.FC<GatesModalProps> = ({
  isOpen,
  onClose,
  gates,
  onDecide
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-amber/20 border border-accent-amber/30 flex items-center justify-center text-accent-amber">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Central de Governança & Human Gates</h2>
              <p className="text-xs text-slate-400">Aprovações operacionais antes de disparos em massa ou alterações de alto risco</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-surface-elevated transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {gates.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              <ShieldCheck className="w-8 h-8 text-accent-emerald mx-auto mb-2 opacity-80" />
              Nenhum Gate pendente no momento. Todas as operações estão seguras.
            </div>
          ) : (
            gates.map((gate) => (
              <div 
                key={gate.id}
                className="bg-surface-card border border-surface-border hover:border-accent-amber/40 rounded-xl p-4 space-y-3 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-accent-amber/15 text-accent-amber border border-accent-amber/30">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{gate.action}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{gate.details}</p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-accent-amber/20 text-accent-amber border border-accent-amber/30">
                    {gate.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-border text-[11px] text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" /> Solicitado por: <strong className="text-slate-200">{gate.requestedBy}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> {gate.createdAt}
                    </span>
                  </div>

                  {gate.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDecide(gate.id, 'rejected')}
                        className="px-2.5 py-1 bg-surface-elevated hover:bg-accent-rose/20 hover:text-accent-rose text-slate-300 rounded text-xs font-medium border border-surface-border transition flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Rejeitar
                      </button>
                      <button
                        onClick={() => onDecide(gate.id, 'approved')}
                        className="px-3 py-1 bg-accent-emerald hover:bg-emerald-600 text-white rounded text-xs font-semibold transition flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Aprovar e Executar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-card flex items-center justify-between text-xs text-slate-400">
          <span>Política de Compliance: <strong>FBR Zero-Spam Standard</strong></span>
          <button
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
