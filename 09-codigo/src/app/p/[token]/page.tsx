'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Calendar, 
  DollarSign, 
  Check,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ProposalPublicPage({ params }: { params: Promise<{ token: string }> }) {
  const unwrappedParams = React.use(params);
  const [isAccepted, setIsAccepted] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [signerRole, setSignerRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const proposalData = {
    number: 'PROP-2026-089',
    title: 'Aceleração de Receita & Prospecção B2B com Inteligência Artificial',
    clientCompany: 'TechCorp Brasil S/A',
    decisionMaker: 'Eduardo Guimarães (Diretor Comercial)',
    date: '22 de Setembro de 2026',
    validUntil: '06 de Outubro de 2026 (14 dias)',
    deliverables: [
      {
        title: 'Módulo 1: Estruturação & Enriquecimento de ICP',
        desc: 'Mapeamento de 500 contas ideais, validação de e-mails corporativos e telefones de decisores.'
      },
      {
        title: 'Módulo 2: Motor de Cadência Omnichannel',
        desc: 'Configuração de sequenciamento com Cold E-mail, Spintax, aquecimento de domínio e WhatsApp integrado.'
      },
      {
        title: 'Módulo 3: Agente AI SDR Conversacional',
        desc: 'Atendimento instantâneo com qualificação BANT e agendamento automático no Google Calendar dos executivos.'
      }
    ],
    pricing: [
      { item: 'Setup & Implementação de Infraestrutura', value: 'R$ 24.000,00' },
      { item: 'Acompanhamento & Otimização Contínua (3 meses)', value: 'R$ 24.000,00' },
    ],
    total: 'R$ 48.000,00'
  };

  const handleAcceptProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName || !signerRole) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAccepted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 md:p-10 flex flex-col items-center">
      {/* Brand Header */}
      <div className="w-full max-w-4xl flex items-center justify-between py-4 border-b border-surface-border mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent-purple flex items-center justify-center shadow-lg shadow-brand/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
              FBR <span className="text-brand font-extrabold">Agency</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Proposta Comercial Interativa</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-surface-card border border-surface-border text-slate-300 px-3 py-1 rounded-full font-mono">
            {proposalData.number}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl space-y-6">
        {/* Hero Card */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/15 text-brand text-xs font-semibold border border-brand/30">
            <Sparkles className="w-3.5 h-3.5" /> Proposta Exclusiva
          </div>
          <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {proposalData.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-surface-border text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Empresa Cliente:</span>
              <strong className="text-white text-sm">{proposalData.clientCompany}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Aos cuidados de:</span>
              <strong className="text-white text-sm">{proposalData.decisionMaker}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Validade da Oferta:</span>
              <strong className="text-accent-amber text-sm">{proposalData.validUntil}</strong>
            </div>
          </div>
        </div>

        {/* Deliverables / Scope */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand" />
            Escopo de Trabalho & Entregáveis
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {proposalData.deliverables.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-elevated/60 border border-surface-border flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-brand/20 text-brand flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Table */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent-emerald" />
            Investimento & Condições
          </h3>

          <div className="bg-surface-elevated/40 rounded-xl border border-surface-border overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-elevated border-b border-surface-border text-slate-400 text-[11px] font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Item / Serviço</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {proposalData.pricing.map((p, idx) => (
                  <tr key={idx} className="hover:bg-surface-elevated/20">
                    <td className="py-3.5 px-4 text-slate-200 font-medium">{p.item}</td>
                    <td className="py-3.5 px-4 text-right text-white font-bold">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Investimento Total do Projeto:</span>
            <span className="text-2xl font-black text-accent-emerald">{proposalData.total}</span>
          </div>
        </div>

        {/* Acceptance Box */}
        <div className="bg-gradient-to-br from-surface-card to-surface-elevated border border-surface-border rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
          {!isAccepted ? (
            <form onSubmit={handleAcceptProposal} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent-emerald" />
                  Aceite da Proposta & Assinatura Digital Simplificada
                </h3>
                <p className="text-xs text-slate-400">
                  Ao confirmar o aceite, nosso time iniciará o setup imediatamente e enviará o contrato formal para assinatura.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Nome Completo do Responsável</label>
                  <input 
                    type="text" 
                    required 
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    placeholder="Ex: Eduardo Guimarães"
                    className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Cargo / Função</label>
                  <input 
                    type="text" 
                    required 
                    value={signerRole}
                    onChange={(e) => setSignerRole(e.target.value)}
                    placeholder="Ex: Diretor Comercial"
                    className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-accent-emerald to-teal-600 hover:opacity-95 text-white font-bold rounded-xl text-sm shadow-lg shadow-accent-emerald/20 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Registrando Aceite...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Aceitar Proposta e Iniciar Onboarding
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-accent-emerald/20 border border-accent-emerald/30 text-accent-emerald flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Proposta Aceita com Sucesso!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Obrigado, <strong>{signerName}</strong> ({signerRole}). Registramos o aceite desta proposta. A equipe executiva da FBR Agency já foi notificada para dar início à implementação.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
