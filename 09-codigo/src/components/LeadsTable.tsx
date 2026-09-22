import React from 'react';
import { Lead } from '../types';
import { Mail, MessageSquare, Linkedin, Sparkles, Plus, UploadCloud } from 'lucide-react';

interface LeadsTableProps {
  leads?: Lead[];
  onOpenNewLead?: () => void;
  onOpenImportCsv?: () => void;
}

const defaultLeads: Lead[] = [
  {
    id: '1',
    companyName: 'OmniLog Distribuição',
    contactName: 'Rodrigo Silveira',
    jobTitle: 'Diretor Comercial & Operações',
    email: 'rodrigo@omnilog.com.br',
    whatsapp: '+55 11 98822-1100',
    industry: 'Logística & Supply Chain',
    employees: '250-500',
    icpScore: 94,
    status: 'ready',
    channels: { emailVerified: true, whatsappActive: true, linkedinFound: true }
  },
  {
    id: '2',
    companyName: 'Kallos Cosméticos B2B',
    contactName: 'Fernanda Lins',
    jobTitle: 'Head de Vendas & Parcerias',
    email: 'fernanda.lins@kallos.com.br',
    whatsapp: '+55 11 97711-2244',
    industry: 'Indústria & Varejo',
    employees: '100-250',
    icpScore: 88,
    status: 'in_cadence',
    channels: { emailVerified: true, whatsappActive: true, linkedinFound: false }
  },
  {
    id: '3',
    companyName: 'Fintech Aurora Pay',
    contactName: 'Gabriel Medeiros',
    jobTitle: 'VP of Revenue',
    email: 'g.medeiros@aurorapay.io',
    whatsapp: '+55 21 99123-4567',
    industry: 'Serviços Financeiros',
    employees: '50-100',
    icpScore: 96,
    status: 'qualified',
    channels: { emailVerified: true, whatsappActive: true, linkedinFound: true }
  },
  {
    id: '4',
    companyName: 'AgroPrime Insumos',
    contactName: 'Luciano Prado',
    jobTitle: 'CEO & Fundador',
    email: 'luciano@agroprime.agr.br',
    whatsapp: '+55 19 98112-9900',
    industry: 'Agronegócio',
    employees: '500+',
    icpScore: 78,
    status: 'enriching',
    channels: { emailVerified: false, whatsappActive: true, linkedinFound: true }
  }
];

export const LeadsTable: React.FC<LeadsTableProps> = ({ 
  leads = defaultLeads, 
  onOpenNewLead, 
  onOpenImportCsv 
}) => {
  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Base de Contas & Decisores Enriquecidos
            <span className="text-xs bg-brand/20 text-brand px-2 py-0.5 rounded-full font-semibold border border-brand/30">
              {leads.length} Contas
            </span>
          </h2>
          <p className="text-xs text-slate-400">Classificação inteligente por ICP Score e validação de canais</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenImportCsv && (
            <button 
              onClick={onOpenImportCsv}
              className="px-3 py-1.5 bg-surface-elevated hover:bg-surface-border text-slate-200 rounded-lg text-xs font-medium border border-surface-border transition flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5 text-accent-purple" /> Importar CSV
            </button>
          )}
          {onOpenNewLead && (
            <button 
              onClick={onOpenNewLead}
              className="px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" /> + Nova Conta
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-border text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">Empresa & Setor</th>
              <th className="pb-3">Decisor & Cargo</th>
              <th className="pb-3">Canais Validados</th>
              <th className="pb-3">ICP Score</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border text-xs">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-surface-elevated/40 transition">
                {/* Empresa */}
                <td className="py-3.5 pl-2">
                  <div className="font-semibold text-white">{lead.companyName}</div>
                  <div className="text-[11px] text-slate-400">{lead.industry} • {lead.employees} func.</div>
                </td>

                {/* Decisor */}
                <td className="py-3.5">
                  <div className="font-medium text-slate-200">{lead.contactName}</div>
                  <div className="text-[11px] text-slate-400">{lead.jobTitle}</div>
                </td>

                {/* Canais */}
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <span title={lead.channels.emailVerified ? 'E-mail Válido' : 'E-mail Não Verificado'} className={`p-1.5 rounded ${lead.channels.emailVerified ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-surface-elevated text-slate-400'}`}>
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <span title={lead.channels.whatsappActive ? 'WhatsApp Ativo' : 'Sem WhatsApp'} className={`p-1.5 rounded ${lead.channels.whatsappActive ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-surface-elevated text-slate-400'}`}>
                      <MessageSquare className="w-3.5 h-3.5" />
                    </span>
                    <span title={lead.channels.linkedinFound ? 'LinkedIn Identificado' : 'Sem LinkedIn'} className={`p-1.5 rounded ${lead.channels.linkedinFound ? 'bg-brand/15 text-brand' : 'bg-surface-elevated text-slate-400'}`}>
                      <Linkedin className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </td>

                {/* ICP Score */}
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          lead.icpScore >= 90 ? 'bg-accent-emerald' : lead.icpScore >= 75 ? 'bg-brand' : 'bg-accent-amber'
                        }`}
                        style={{ width: `${lead.icpScore}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-white text-[11px]">{lead.icpScore}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    lead.status === 'qualified' ? 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30' :
                    lead.status === 'in_cadence' ? 'bg-brand/15 text-brand border-brand/30' :
                    lead.status === 'enriching' ? 'bg-accent-purple/15 text-accent-purple border-accent-purple/30 animate-pulse' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {lead.status === 'qualified' ? 'Qualificado' :
                     lead.status === 'in_cadence' ? 'Em Cadência' :
                     lead.status === 'enriching' ? 'Enriquecendo' : 'Pronto para Disparo'}
                  </span>
                </td>

                {/* Ações */}
                <td className="py-3.5 text-right pr-2">
                  <button className="px-2.5 py-1 bg-surface-elevated hover:bg-brand/20 hover:text-brand text-slate-300 rounded text-[11px] font-medium transition border border-surface-border">
                    Iniciar Cadência
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
