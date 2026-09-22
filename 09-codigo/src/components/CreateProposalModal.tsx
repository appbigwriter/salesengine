import React, { useState } from 'react';
import { X, FileSpreadsheet, Plus, Trash2, Check, ExternalLink, Sparkles } from 'lucide-react';

interface ProposalItem {
  id: string;
  description: string;
  amount: number;
}

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealCompany?: string;
}

export const CreateProposalModal: React.FC<CreateProposalModalProps> = ({ 
  isOpen, 
  onClose, 
  dealCompany = 'TechCorp Brasil' 
}) => {
  const [proposalTitle, setProposalTitle] = useState(`Proposta Comercial — Aceleração de Vendas para ${dealCompany}`);
  const [clientName, setClientName] = useState(dealCompany);
  const [items, setItems] = useState<ProposalItem[]>([
    { id: '1', description: 'Implementação de Motor de Prospecção Outbound Omnichannel', amount: 24000 },
    { id: '2', description: 'Configuração e Treinamento de AI SDR para WhatsApp & Inbound', amount: 18000 },
    { id: '3', description: 'Acompanhamento Estratégico & Otimização de Funil (Mensalidade x 3)', amount: 18000 },
  ]);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, curr) => acc + curr.amount, 0);

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now().toString(), description: 'Novo Serviço Adicional', amount: 5000 }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const token = 'prop-' + Math.random().toString(36).substring(2, 9);
    setGeneratedLink(`/p/${token}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Gerador de Propostas Comerciais</h3>
              <p className="text-[11px] text-slate-400">Gere links públicos dinâmicos com rastreamento e assinatura digital</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generatedLink ? (
          <form onSubmit={handleGenerate} className="p-5 space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Título da Proposta</label>
              <input 
                type="text" 
                required 
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>

            {/* Escopo & Itens */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Itens do Escopo & Investimento</label>
                <button 
                  type="button" 
                  onClick={addItem}
                  className="text-xs text-brand hover:text-brand-hover font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Item
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2 bg-surface-elevated/60 p-2.5 rounded-lg border border-surface-border">
                    <input 
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setItems(prev => prev.map(i => i.id === item.id ? { ...i, description: val } : i));
                      }}
                      className="flex-1 bg-transparent text-xs text-white focus:outline-none border-b border-transparent focus:border-brand"
                    />
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-400 font-medium">R$</span>
                      <input 
                        type="number"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setItems(prev => prev.map(i => i.id === item.id ? { ...i, amount: val } : i));
                        }}
                        className="w-24 bg-surface-card border border-surface-border rounded px-2 py-1 text-right text-accent-emerald font-bold"
                      />
                    </div>
                    {items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-slate-400 hover:text-accent-rose transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between border border-surface-border text-xs">
              <span className="font-bold text-white">Total do Investimento:</span>
              <span className="text-base font-extrabold text-accent-emerald">
                R$ {totalAmount.toLocaleString('pt-BR')},00
              </span>
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
                className="px-4 py-2 bg-gradient-to-r from-brand to-accent-purple hover:opacity-90 text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Gerar Proposta Interativa
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-accent-emerald/20 text-accent-emerald flex items-center justify-center mx-auto border border-accent-emerald/30 shadow-lg shadow-accent-emerald/10">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Proposta Criada com Sucesso!</h3>
              <p className="text-xs text-slate-400 mt-1">O link público com telemetria de visualizações está pronto para ser enviado ao cliente.</p>
            </div>

            <div className="p-3 bg-surface-elevated rounded-xl border border-surface-border flex items-center justify-between gap-3 text-xs">
              <span className="font-mono text-brand truncate">{window.location.origin}{generatedLink}</span>
              <a 
                href={generatedLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-brand hover:bg-brand-hover text-white rounded-lg font-semibold flex items-center gap-1 shrink-0 transition"
              >
                Visualizar <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button 
              onClick={() => { setGeneratedLink(null); onClose(); }}
              className="px-5 py-2 bg-surface-elevated hover:bg-surface-border text-white rounded-xl text-xs font-medium transition"
            >
              Concluir & Voltar ao Funil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
