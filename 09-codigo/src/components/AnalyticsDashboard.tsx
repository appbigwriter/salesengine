import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle,
  Clock,
  Layers
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const funnelSteps = [
    { label: 'Leads Enriquecidos (ICP)', count: 450, percent: 100, color: 'bg-brand' },
    { label: 'Abordagens Entregues', count: 412, percent: 91.5, color: 'bg-brand-secondary' },
    { label: 'Respostas Positivas', count: 108, percent: 24.0, color: 'bg-accent-purple' },
    { label: 'Reuniões Agendadas (SQL)', count: 32, percent: 7.1, color: 'bg-accent-amber' },
    { label: 'Propostas Apresentadas', count: 18, percent: 4.0, color: 'bg-accent-indigo' },
    { label: 'Contratos Fechados (Won)', count: 7, percent: 1.5, color: 'bg-accent-emerald' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand" />
            Revenue Intelligence & Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Atribuição precisa de receita gerada por canal, CAC e eficiência de conversão
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-elevated p-1 rounded-lg border border-surface-border text-xs">
          {['7d', '30d', '90d', 'Ano'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                timeRange === t ? 'bg-brand text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === '7d' ? '7 Dias' : t === '30d' ? 'Últimos 30 Dias' : t === '90d' ? 'Trimestre' : 'Este Ano'}
            </button>
          ))}
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Receita Fechada (ARR Novo)</span>
          <div className="text-2xl font-extrabold text-white">R$ 252.000<span className="text-xs text-slate-400 font-normal">/ano</span></div>
          <div className="text-xs text-accent-emerald font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% vs média trimestral
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400 font-medium">CAC Estimado por Cliente</span>
          <div className="text-2xl font-extrabold text-white">R$ 1.840<span className="text-xs text-slate-400 font-normal"> / fechamento</span></div>
          <div className="text-xs text-accent-emerald font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Redução de 38% com automação de IA
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400 font-medium">LTV / CAC Ratio</span>
          <div className="text-2xl font-extrabold text-accent-emerald">19.5x</div>
          <div className="text-xs text-slate-400">
            Excelente saúde financeira (Benchmark ideal {'>'} 5x)
          </div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand" />
          Funil de Conversão Comercial (End-to-End)
        </h3>

        <div className="space-y-4">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{step.label}</span>
                <span className="text-slate-400">
                  <strong className="text-white font-bold">{step.count}</strong> ({step.percent.toFixed(1)}%)
                </span>
              </div>

              <div className="w-full bg-surface-elevated rounded-full h-3 overflow-hidden border border-surface-border">
                <div 
                  className={`h-full ${step.color} rounded-full transition-all duration-700`}
                  style={{ width: `${step.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* A/B Copywriting Testing Arena */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            Arena de Testes A/B de Copywriting (Outbound E-mail)
          </h3>
          <span className="text-xs bg-accent-emerald/15 text-accent-emerald px-2 py-0.5 rounded font-semibold">
            Vencedor Identificado com 99% de Confiança
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Variant A */}
          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-accent-emerald/40 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Variante A: "Direto ao Ponto + Case Setorial"</span>
              <span className="text-[10px] bg-accent-emerald/20 text-accent-emerald px-1.5 py-0.5 rounded font-bold uppercase">
                Vencedor ★
              </span>
            </div>
            <p className="text-[11px] text-slate-300 italic">
              {'"Olá {{first_name}}, ajudamos uma empresa de logística a gerar +18 reuniões qualificadas em 30 dias..."'}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-border text-xs">
              <div>
                <div className="text-[10px] text-slate-400">Abertura:</div>
                <strong className="text-white">64.2%</strong>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Resposta:</div>
                <strong className="text-accent-emerald font-bold">29.4%</strong>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Reuniões:</div>
                <strong className="text-white">19 calls</strong>
              </div>
            </div>
          </div>

          {/* Variant B */}
          <div className="p-4 rounded-xl bg-surface-elevated/40 border border-surface-border space-y-3 opacity-75">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Variante B: "Abordagem Consultiva Longa"</span>
              <span className="text-[10px] bg-surface-card text-slate-400 px-1.5 py-0.5 rounded font-medium">
                Controle
              </span>
            </div>
            <p className="text-[11px] text-slate-300 italic">
              {'"Prezado {{first_name}}, gostaríamos de agendar uma demonstração completa de 45 minutos para apresentar..."'}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-border text-xs">
              <div>
                <div className="text-[10px] text-slate-400">Abertura:</div>
                <strong className="text-white">41.8%</strong>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Resposta:</div>
                <strong className="text-slate-300">12.1%</strong>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Reuniões:</div>
                <strong className="text-white">7 calls</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
