import React, { useState } from 'react';
import { 
  MessageSquare, 
  QrCode, 
  ShieldCheck, 
  RefreshCw, 
  Wifi, 
  BatteryMedium, 
  Send, 
  CheckCheck,
  AlertCircle,
  Clock,
  PhoneCall
} from 'lucide-react';

export const WhatsAppHub: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [testNumber, setTestNumber] = useState('+55 11 99999-8888');
  const [testMessage, setTestMessage] = useState('Olá! Esta é uma mensagem de teste enviada via FBR Sales Engine.');
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleTestSend = () => {
    setSendSuccess(true);
    setTimeout(() => setSendSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent-emerald" />
            Central de Instâncias WhatsApp & Anti-Ban
          </h2>
          <p className="text-xs text-slate-400">
            Gateway integrado via Evolution API com controle de vazão, aquecimento de chip e delay randômico
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated rounded-lg border border-surface-border text-xs">
            <Wifi className="w-3.5 h-3.5 text-accent-emerald" />
            <span className="text-slate-300">Instância: <strong className="text-accent-emerald">FBR-Outbound-01</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated rounded-lg border border-surface-border text-xs text-slate-300">
            <BatteryMedium className="w-3.5 h-3.5 text-brand" />
            <span>88%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Instance Status & Anti-ban metrics */}
        <div className="space-y-4">
          <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Status da Conexão</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                isConnected ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30' : 'bg-accent-rose/20 text-accent-rose'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                {isConnected ? 'Ativo & Conectado' : 'Desconectado'}
              </span>
            </div>

            <div className="p-4 bg-surface-elevated/60 border border-surface-border rounded-xl flex items-center justify-center flex-col text-center space-y-3">
              {isConnected ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-accent-emerald/15 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald shadow-lg shadow-accent-emerald/10">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Número Protegido</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">+55 (11) 98765-4321</p>
                  </div>
                  <button 
                    onClick={() => setIsConnected(false)}
                    className="text-[11px] text-slate-400 hover:text-accent-rose underline transition"
                  >
                    Desconectar Sessão
                  </button>
                </>
              ) : (
                <>
                  <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-900" />
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Abra o WhatsApp {'>'} Dispositivos Conectados {'>'} Conectar
                  </p>
                  <button 
                    onClick={() => setIsConnected(true)}
                    className="px-3.5 py-1.5 bg-accent-emerald hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Confirmar Leitura do QR Code
                  </button>
                </>
              )}
            </div>

            {/* Anti-ban parameters */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-brand" /> Delay Randômico:
                </span>
                <strong className="text-white">45s ~ 120s</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-purple" /> Limite Diário Ativo:
                </span>
                <strong className="text-white">35 / 40 msgs hoje</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CheckCheck className="w-3.5 h-3.5 text-accent-emerald" /> Taxa de Entrega:
                </span>
                <strong className="text-accent-emerald font-bold">100%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Webhook & Dispatch Simulator */}
        <div className="lg:col-span-2 space-y-4">
          {/* Test Dispatch Box */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-brand" />
              Disparo de Teste Individual
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1 space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Número de Destino</label>
                <input 
                  type="text" 
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Mensagem de Teste</label>
                <input 
                  type="text" 
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Disparos respeitam a fila assíncrona com simulação de digitação humana.
              </span>
              <button 
                onClick={handleTestSend}
                className="px-4 py-2 bg-accent-emerald hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-md shadow-accent-emerald/20 transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Enviar Mensagem Agora
              </button>
            </div>

            {sendSuccess && (
              <div className="p-3 bg-accent-emerald/15 border border-accent-emerald/30 rounded-lg text-accent-emerald text-xs flex items-center gap-2 animate-fade-in">
                <CheckCheck className="w-4 h-4" /> Mensagem despachada com sucesso pela Evolution API! Status: ACK_SENT
              </div>
            )}
          </div>

          {/* Webhook Stream Log */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-accent-purple" />
                Stream de Webhooks em Tempo Real (Inbound & Outbound)
              </h3>
              <span className="text-[10px] text-slate-400">Supabase Realtime Feed</span>
            </div>

            <div className="bg-surface-elevated/80 border border-surface-border rounded-xl p-3 font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto">
              <div className="text-slate-300">
                <span className="text-slate-500">[15:02:12]</span> <span className="text-accent-emerald">[INBOUND_MSG]</span> De: +5511988221100 — "Podemos agendar sim, quinta às 14h está ótimo." {'->'} <span className="text-accent-purple">AI Intent: Interested (98%)</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500">[14:58:34]</span> <span className="text-brand">[OUTBOUND_SENT]</span> Para: +5511977112244 — Mensagem Step #2 despachada com delay de 72s.
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500">[14:45:01]</span> <span className="text-accent-emerald">[STATUS_UPDATE]</span> Instância FBR-Outbound-01 sincronizada com sucesso.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
