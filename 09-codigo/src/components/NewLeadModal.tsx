import React, { useState } from 'react';
import { Lead } from '../types';
import { X, Sparkles, Building2, User, Mail, Phone, Globe, Check } from 'lucide-react';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({ isOpen, onClose, onAddLead }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [jobTitle, setJobTitle] = useState('Diretor Comercial');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [industry, setIndustry] = useState('Tecnologia & SaaS');
  const [employees, setEmployees] = useState('100-250');

  if (!isOpen) return null;

  const calculateScore = () => {
    let score = 50;
    if (employees === '250-500' || employees === '500+') score += 25;
    if (jobTitle.toLowerCase().includes('diretor') || jobTitle.toLowerCase().includes('ceo') || jobTitle.toLowerCase().includes('head')) score += 20;
    if (email.includes('.com') || email.includes('.br')) score += 5;
    return Math.min(score, 98);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email) return;

    const newLead: Lead = {
      id: Date.now().toString(),
      companyName,
      contactName,
      jobTitle,
      email,
      whatsapp: whatsapp || '+55 11 99999-0000',
      industry,
      employees,
      icpScore: calculateScore(),
      status: 'ready',
      channels: {
        emailVerified: true,
        whatsappActive: !!whatsapp,
        linkedinFound: true,
      }
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Cadastrar Nova Conta no ICP</h3>
              <p className="text-[11px] text-slate-400">Enriquecimento e cálculo de propensão automático</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Nome da Empresa *</label>
              <input 
                type="text" 
                required 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ex: Nexus Logística" 
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Setor de Atuação</label>
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              >
                <option value="Tecnologia & SaaS">Tecnologia & SaaS</option>
                <option value="Logística & Supply Chain">Logística & Supply Chain</option>
                <option value="Serviços Financeiros">Serviços Financeiros</option>
                <option value="Indústria & Manufatura">Indústria & Manufatura</option>
                <option value="Agronegócio">Agronegócio</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Nome do Decisor *</label>
              <input 
                type="text" 
                required 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Ex: Carlos Santana" 
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Cargo</label>
              <input 
                type="text" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ex: VP of Growth" 
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">E-mail Corporativo *</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carlos@nexuslog.com.br" 
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">WhatsApp</label>
              <input 
                type="text" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+55 11 98765-4321" 
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="p-3 bg-brand/10 border border-brand/30 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand" /> Score Estimado:
            </span>
            <span className="font-extrabold text-brand text-sm">{calculateScore()} / 100</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-border">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-lg text-xs font-medium transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Salvar & Enriquecer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
