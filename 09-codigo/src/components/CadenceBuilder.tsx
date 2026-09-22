import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Clock, 
  Plus, 
  Trash2, 
  Sparkles, 
  Settings2,
  CheckCircle2,
  Play,
  Pause
} from 'lucide-react';

interface CadenceStep {
  id: string;
  order: number;
  channel: 'email' | 'whatsapp' | 'linkedin';
  waitDays: number;
  subject?: string;
  body: string;
}

export const CadenceBuilder: React.FC = () => {
  const [cadenceName, setCadenceName] = useState('Outbound Executivo — Indústrias & Logística');
  const [isActive, setIsActive] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(40);
  const [spintaxPreview, setSpintaxPreview] = useState('');
  
  const [steps, setSteps] = useState<CadenceStep[]>([
    {
      id: '1',
      order: 1,
      channel: 'email',
      waitDays: 0,
      subject: '{Oportunidade de Crescimento|Aceleração de Vendas} para a {{company}}',
      body: 'Olá, {{first_name}}! {Espero que este e-mail o encontre bem.|Tudo bem com você?}\n\nAcompanhando o crescimento da {{company}} no setor de {{industry}}, percebi que muitas empresas com o seu perfil enfrentam desafios para manter uma esteira constante de reuniões qualificadas.\n\nA FBR Agency estruturou um motor de prospecção autônoma que tem gerado em média +15 reuniões mensais com decisores. Teria 15 minutos na quinta ou sexta para um diagnóstico rápido?'
    },
    {
      id: '2',
      order: 2,
      channel: 'whatsapp',
      waitDays: 2,
      body: 'Oi {{first_name}}, tudo bem? Te enviei um e-mail há dois dias sobre a prospecção da {{company}}. Queria saber se conseguiu dar uma olhada rápida!'
    },
    {
      id: '3',
      order: 3,
      channel: 'email',
      waitDays: 3,
      subject: 'Re: {Oportunidade|Aceleração} — Case de sucesso no setor',
      body: '{{first_name}}, caso ainda esteja avaliando, recentemente ajudamos uma empresa do mesmo segmento a aumentar a taxa de conversão em 34% em 60 dias.\n\nFaz sentido conversarmos esta semana?'
    }
  ]);

  const addStep = (channel: 'email' | 'whatsapp' | 'linkedin') => {
    const newStep: CadenceStep = {
      id: Date.now().toString(),
      order: steps.length + 1,
      channel,
      waitDays: 2,
      subject: channel === 'email' ? 'Follow-up comercial' : undefined,
      body: channel === 'whatsapp' 
        ? 'Olá {{first_name}}, passando para um follow-up rápido!' 
        : 'Olá {{first_name}}, gostaria de compartilhar mais um material com você.'
    };
    setSteps(prev => [...prev, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(prev => prev.filter(s => s.id !== id).map((s, idx) => ({ ...s, order: idx + 1 })));
  };

  const testSpintax = (text: string) => {
    const parsed = text.replace(/\{([^{}]+)\}/g, (_, choices) => {
      const options = choices.split('|');
      return options[Math.floor(Math.random() * options.length)];
    }).replace(/\{\{first_name\}\}/g, 'Roberto').replace(/\{\{company\}\}/g, 'TechLog').replace(/\{\{industry\}\}/g, 'Logística');
    setSpintaxPreview(parsed);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <input 
              type="text" 
              value={cadenceName}
              onChange={(e) => setCadenceName(e.target.value)}
              className="text-base font-bold text-white bg-transparent border-b border-dashed border-slate-500 focus:border-brand focus:outline-none"
            />
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
              isActive ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30' : 'bg-slate-800 text-slate-400'
            }`}>
              {isActive ? 'Ativa' : 'Pausada'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cadência sequencial com {steps.length} passos configurados • Rotação de 3 caixas de e-mail
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isActive 
                ? 'bg-accent-amber/20 hover:bg-accent-amber/30 text-accent-amber border border-accent-amber/30' 
                : 'bg-accent-emerald/20 hover:bg-accent-emerald/30 text-accent-emerald border border-accent-emerald/30'
            }`}
          >
            {isActive ? <><Pause className="w-3.5 h-3.5" /> Pausar Cadência</> : <><Play className="w-3.5 h-3.5" /> Ativar Cadência</>}
          </button>
          <button className="px-4 py-1.5 bg-brand hover:bg-brand-hover text-white rounded-lg text-xs font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" /> Salvar Alterações
          </button>
        </div>
      </div>

      {/* Cadence Settings Bar */}
      <div className="bg-surface-elevated/40 border border-surface-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-brand" /> Horário de Envio: <strong className="text-white">09:00 às 18:00 (Seg-Sex)</strong>
          </span>
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <Settings2 className="w-4 h-4 text-accent-purple" /> Limite Diário por Caixa:
          </span>
          <input 
            type="number" 
            value={dailyLimit} 
            onChange={(e) => setDailyLimit(Number(e.target.value))}
            className="w-16 bg-surface-card border border-surface-border rounded px-2 py-0.5 text-white font-bold text-center"
          />
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
          Proteção Anti-Spam & Spintax: <strong className="text-accent-emerald">Habilitada</strong>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4 hover:border-brand/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-surface-elevated flex items-center justify-center text-xs font-bold text-white border border-surface-border">
                  #{step.order}
                </span>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    step.channel === 'email' ? 'bg-brand/15 text-brand border border-brand/30' : 'bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30'
                  }`}>
                    {step.channel === 'email' ? <Mail className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                    {step.channel === 'email' ? 'Cold E-mail' : 'WhatsApp'}
                  </span>

                  {index > 0 && (
                    <span className="text-xs text-slate-400 flex items-center gap-1 bg-surface-elevated px-2 py-1 rounded border border-surface-border">
                      <Clock className="w-3 h-3 text-slate-400" /> Aguardar {step.waitDays} dias após o passo #{index}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => testSpintax(step.body)}
                  className="px-2.5 py-1 bg-surface-elevated hover:bg-accent-purple/20 hover:text-accent-purple text-slate-300 rounded text-xs font-medium border border-surface-border transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-accent-purple" /> Testar Variação Spintax
                </button>
                {steps.length > 1 && (
                  <button 
                    onClick={() => removeStep(step.id)}
                    className="p-1 hover:bg-accent-rose/20 text-slate-400 hover:text-accent-rose rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Subject if Email */}
            {step.channel === 'email' && (
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Assunto do E-mail (com Spintax)</label>
                <input 
                  type="text" 
                  value={step.subject}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSteps(prev => prev.map(s => s.id === step.id ? { ...s, subject: val } : s));
                  }}
                  className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand"
                />
              </div>
            )}

            {/* Body */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Corpo da Mensagem</label>
              <textarea 
                rows={4}
                value={step.body}
                onChange={(e) => {
                  const val = e.target.value;
                  setSteps(prev => prev.map(s => s.id === step.id ? { ...s, body: val } : s));
                }}
                className="w-full bg-surface-elevated border border-surface-border rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand font-mono"
              />
            </div>
          </div>
        ))}

        {/* Add Step Action */}
        <div className="flex items-center justify-center gap-3 py-2">
          <button 
            onClick={() => addStep('email')}
            className="px-4 py-2 bg-surface-card hover:bg-surface-elevated text-brand border border-surface-border hover:border-brand/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Passo: E-mail
          </button>
          <button 
            onClick={() => addStep('whatsapp')}
            className="px-4 py-2 bg-surface-card hover:bg-surface-elevated text-accent-emerald border border-surface-border hover:border-accent-emerald/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Passo: WhatsApp
          </button>
        </div>

        {/* Spintax Preview Box */}
        {spintaxPreview && (
          <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/30 text-xs space-y-2 animate-fade-in">
            <div className="font-bold text-accent-purple flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Exemplo de Variação Gerada para Lead "Roberto" da "TechLog":
            </div>
            <p className="text-slate-200 whitespace-pre-line bg-surface-card/70 p-3 rounded-lg border border-surface-border font-sans">
              {spintaxPreview}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
