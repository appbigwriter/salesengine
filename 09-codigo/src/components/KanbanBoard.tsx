import React, { useState } from 'react';
import { Deal, DealStage } from '../types';
import { MoreHorizontal, Calendar, ArrowRight, DollarSign, UserCheck, FileSpreadsheet } from 'lucide-react';

interface KanbanBoardProps {
  onOpenCreateProposal?: (company: string) => void;
}

const initialDeals: Deal[] = [
  { id: '1', title: 'Implementação Sales Engine & Outbound', company: 'TechCorp Brasil', value: 48000, stage: 'meeting_scheduled', closer: 'Carlos M.', probability: 40, nextStep: 'Apresentação Diagnóstica (Qui 14h)' },
  { id: '2', title: 'Consultoria de Growth & AI SDR', company: 'Nexum Logística', value: 36000, stage: 'proposal_sent', closer: 'Mariana S.', probability: 70, nextStep: 'Aguardando aceite da proposta' },
  { id: '3', title: 'Automação Multicanal WhatsApp + E-mail', company: 'Vanguard Finanças', value: 72000, stage: 'negotiation', closer: 'Carlos M.', probability: 85, nextStep: 'Alinhamento de cláusulas de SLA' },
  { id: '4', title: 'Auditoria de Funil B2B & Prospecção', company: 'Solaris Energia', value: 24000, stage: 'qualified', closer: 'Mariana S.', probability: 25, nextStep: 'Agendar call de descoberta' },
  { id: '5', title: 'Contrato Anual de Aceleração Comercial', company: 'Apex Saúde Digital', value: 120000, stage: 'won', closer: 'FBR Team', probability: 100, nextStep: 'Onboarding iniciado' },
];

const stages: { id: DealStage; label: string; color: string }[] = [
  { id: 'qualified', label: 'Qualificado (ICP)', color: 'border-slate-500/40 text-slate-300' },
  { id: 'meeting_scheduled', label: 'Reunião Agendada', color: 'border-brand/40 text-brand' },
  { id: 'proposal_sent', label: 'Proposta Enviada', color: 'border-accent-purple/40 text-accent-purple' },
  { id: 'negotiation', label: 'Em Negociação', color: 'border-accent-amber/40 text-accent-amber' },
  { id: 'won', label: 'Fechado (Ganho)', color: 'border-accent-emerald/40 text-accent-emerald' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ onOpenCreateProposal }) => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const moveDeal = (dealId: string, direction: 'forward' | 'backward') => {
    const stageIds: DealStage[] = ['qualified', 'meeting_scheduled', 'proposal_sent', 'negotiation', 'won'];
    setDeals(prev => prev.map(deal => {
      if (deal.id !== dealId) return deal;
      const currentIndex = stageIds.indexOf(deal.stage);
      let nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= 0 && nextIndex < stageIds.length) {
        return { ...deal, stage: stageIds[nextIndex] };
      }
      return deal;
    }));
  };

  const totalPipeline = deals
    .filter(d => d.stage !== 'lost')
    .reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Pipeline de Oportunidades & Deals</h2>
          <p className="text-xs text-slate-400">Total ativo no funil: <strong className="text-accent-emerald font-semibold">R$ {totalPipeline.toLocaleString('pt-BR')},00</strong></p>
        </div>
        {onOpenCreateProposal && (
          <button 
            onClick={() => onOpenCreateProposal('TechCorp Brasil')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-brand to-accent-purple hover:opacity-90 text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 flex items-center gap-1.5 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> + Nova Proposta Interativa
          </button>
        )}
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((acc, curr) => acc + curr.value, 0);

          return (
            <div key={stage.id} className="bg-surface-card/60 border border-surface-border rounded-xl p-3 flex flex-col min-w-[240px]">
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-3">
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${stage.color}`}>
                    {stage.label}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {stageDeals.length} negócios • R$ {(stageTotal / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>

              {/* Stage Cards */}
              <div className="space-y-3 flex-1">
                {stageDeals.map(deal => (
                  <div 
                    key={deal.id}
                    className="bg-surface-elevated/80 border border-surface-border hover:border-brand/50 rounded-lg p-3.5 shadow-sm space-y-2.5 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white line-clamp-1">{deal.company}</span>
                      <MoreHorizontal className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                    </div>

                    <p className="text-[11px] text-slate-300 font-medium line-clamp-2 leading-relaxed">
                      {deal.title}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-border/60 text-xs">
                      <span className="font-bold text-accent-emerald flex items-center">
                        <DollarSign className="w-3 h-3 -mr-0.5" />
                        {deal.value.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-surface-card px-1.5 py-0.5 rounded border border-surface-border flex items-center gap-1">
                        <UserCheck className="w-2.5 h-2.5 text-brand" /> {deal.closer}
                      </span>
                    </div>

                    {/* Actions and Next Step */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span className="line-clamp-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {deal.nextStep}
                      </span>
                      <div className="flex items-center gap-1">
                        {stage.id === 'meeting_scheduled' && onOpenCreateProposal && (
                          <button
                            onClick={() => onOpenCreateProposal(deal.company)}
                            title="Gerar Proposta Comercial"
                            className="p-1 rounded bg-accent-purple/20 hover:bg-accent-purple/30 text-accent-purple transition"
                          >
                            <FileSpreadsheet className="w-3 h-3" />
                          </button>
                        )}
                        {stage.id !== 'won' && (
                          <button 
                            onClick={() => moveDeal(deal.id, 'forward')}
                            title="Avançar etapa"
                            className="p-1 rounded bg-brand/20 hover:bg-brand/30 text-brand transition"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="h-24 border border-dashed border-surface-border rounded-lg flex items-center justify-center text-xs text-slate-400">
                    Nenhum negócio
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
