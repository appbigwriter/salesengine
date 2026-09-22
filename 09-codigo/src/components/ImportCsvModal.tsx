import React, { useState } from 'react';
import { Lead } from '../types';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface ImportCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newLeads: Lead[]) => void;
}

export const ImportCsvModal: React.FC<ImportCsvModalProps> = ({ isOpen, onClose, onImport }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [importedPreview, setImportedPreview] = useState<Lead[] | null>(null);

  if (!isOpen) return null;

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockCsvData: Lead[] = [
        {
          id: Date.now().toString(),
          companyName: 'LogExpress Transportes',
          contactName: 'Marcos Vinícius',
          jobTitle: 'Diretor de Logística',
          email: 'marcos@logexpress.com.br',
          whatsapp: '+55 11 97722-3344',
          industry: 'Logística & Supply Chain',
          employees: '250-500',
          icpScore: 91,
          status: 'ready',
          channels: { emailVerified: true, whatsappActive: true, linkedinFound: true }
        },
        {
          id: (Date.now() + 1).toString(),
          companyName: 'B2B Farma Distribuidora',
          contactName: 'Juliana Costa',
          jobTitle: 'Head Comercial',
          email: 'j.costa@b2bfarma.com.br',
          whatsapp: '+55 21 98833-2211',
          industry: 'Saúde & Farmacêutica',
          employees: '100-250',
          icpScore: 86,
          status: 'ready',
          channels: { emailVerified: true, whatsappActive: true, linkedinFound: false }
        }
      ];
      setImportedPreview(mockCsvData);
      setIsProcessing(false);
    }, 800);
  };

  const handleConfirmImport = () => {
    if (importedPreview) {
      onImport(importedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Importação em Lote via CSV</h3>
              <p className="text-[11px] text-slate-400">Deduplicação e validação automática de campos</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!importedPreview ? (
            <div 
              onClick={handleSimulateUpload}
              className="border-2 border-dashed border-surface-border hover:border-brand/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-surface-card/40 hover:bg-surface-elevated/40 space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center text-brand">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {isProcessing ? 'Lendo e validando arquivo CSV...' : 'Clique para selecionar seu arquivo CSV'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">Colunas suportadas: Empresa, Nome, Cargo, E-mail, Telefone, Setor, Funcionários</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5 text-accent-emerald">
                  <CheckCircle2 className="w-4 h-4" /> 2 Registros Válidos Encontrados
                </span>
                <span className="text-[11px] text-slate-400">Zero Duplicações</span>
              </div>

              <div className="bg-surface-elevated/80 border border-surface-border rounded-xl p-3 divide-y divide-surface-border text-xs">
                {importedPreview.map((lead) => (
                  <div key={lead.id} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{lead.companyName}</div>
                      <div className="text-[11px] text-slate-400">{lead.contactName} ({lead.email})</div>
                    </div>
                    <span className="text-brand font-bold text-xs">ICP: {lead.icpScore}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-border">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-lg text-xs font-medium transition"
            >
              Cancelar
            </button>
            {importedPreview && (
              <button 
                type="button"
                onClick={handleConfirmImport}
                className="px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5"
              >
                Confirmar Importação <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
