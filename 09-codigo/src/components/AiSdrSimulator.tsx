import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, CheckCircle, Calendar, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'lead';
  text: string;
  timestamp: string;
}

export const AiSdrSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Olá! Sou a assistente de qualificação da FBR Agency. Vi que você buscou acelerar a prospecção B2B da sua empresa. Qual é o principal canal que você utiliza hoje para gerar novas reuniões de vendas?',
      timestamp: '14:30'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [qualificationStatus, setQualificationStatus] = useState<{
    stage: string;
    score: number;
    budgetIdentified: boolean;
    readyForCalendar: boolean;
  }>({
    stage: 'Diagnóstico Inicial',
    score: 65,
    budgetIdentified: false,
    readyForCalendar: false
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'lead',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulação de resposta da IA após 1s
    setTimeout(() => {
      let aiReply = '';
      if (inputMessage.toLowerCase().includes('email') || inputMessage.toLowerCase().includes('whatsapp') || inputMessage.toLowerCase().includes('indica')) {
        aiReply = 'Excelente! Muitas empresas com o seu perfil enfrentam um gargalo de tempo para personalizar mensagens em escala. Temos um modelo que automatiza 80% dessa esteira. Quantos vendedores ou SDRs você possui na equipe hoje?';
        setQualificationStatus({
          stage: 'Mapeamento de Equipe & Volume',
          score: 82,
          budgetIdentified: true,
          readyForCalendar: false
        });
      } else {
        aiReply = 'Entendi perfeitamente. Com base nesse cenário, faz total sentido apresentar nossa demonstração executiva de 20 minutos com nosso Head de Growth. Quinta às 14h ou Sexta às 10h fica melhor para você?';
        setQualificationStatus({
          stage: 'Pronto para Agendamento',
          score: 95,
          budgetIdentified: true,
          readyForCalendar: true
        });
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: 'Olá! Sou a assistente de qualificação da FBR Agency. Vi que você buscou acelerar a prospecção B2B da sua empresa. Qual é o principal canal que você utiliza hoje para gerar novas reuniões de vendas?',
        timestamp: '14:30'
      }
    ]);
    setQualificationStatus({
      stage: 'Diagnóstico Inicial',
      score: 65,
      budgetIdentified: false,
      readyForCalendar: false
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Area */}
      <div className="lg:col-span-2 bg-surface-card border border-surface-border rounded-xl flex flex-col h-[560px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-surface-border flex items-center justify-between bg-surface-elevated/40 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-purple">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                FBR Conversational AI SDR
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              </div>
              <p className="text-[11px] text-slate-400">Ambiente de Teste & Treinamento em Tempo Real</p>
            </div>
          </div>

          <button 
            onClick={resetChat}
            className="p-1.5 hover:bg-surface-elevated text-slate-400 hover:text-white rounded-lg transition"
            title="Reiniciar conversa"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2.5 ${msg.sender === 'lead' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'ai' 
                  ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' 
                  : 'bg-brand/20 text-brand border border-brand/30'
              }`}>
                {msg.sender === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                msg.sender === 'ai'
                  ? 'bg-surface-elevated text-slate-200 border border-surface-border'
                  : 'bg-brand text-white shadow-md shadow-brand/20'
              }`}>
                <p>{msg.text}</p>
                <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'ai' ? 'text-slate-400' : 'text-blue-200'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
              <Sparkles className="w-3.5 h-3.5 text-accent-purple animate-spin" />
              <span>AI SDR analisando intenção e gerando resposta...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-surface-border bg-surface/50 rounded-b-xl flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Simule uma resposta como Lead (ex: Usamos e-mail, mas a taxa de resposta caiu)..."
            className="flex-1 bg-surface-card border border-surface-border rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand transition"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-2 bg-brand hover:bg-brand-hover disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Send className="w-3.5 h-3.5" /> Enviar
          </button>
        </div>
      </div>

      {/* Realtime Lead Telemetry / AI Diagnostic */}
      <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-purple" />
          Telemetria de Qualificação
        </h3>

        <div className="bg-surface-elevated/60 border border-surface-border rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Score de Propensão:</span>
            <span className="font-bold text-accent-emerald text-sm">{qualificationStatus.score}/100</span>
          </div>
          <div className="w-full bg-surface-card rounded-full h-2 overflow-hidden border border-surface-border">
            <div 
              className="h-full bg-gradient-to-r from-brand to-accent-emerald rounded-full transition-all duration-500"
              style={{ width: `${qualificationStatus.score}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-surface-elevated/30 rounded-lg border border-surface-border">
            <span className="text-slate-300">Etapa Atual:</span>
            <span className="font-semibold text-brand">{qualificationStatus.stage}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-surface-elevated/30 rounded-lg border border-surface-border">
            <span className="text-slate-300">Dores Mapeadas:</span>
            <span className="font-semibold text-accent-emerald flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Baixa Conversão
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-surface-elevated/30 rounded-lg border border-surface-border">
            <span className="text-slate-300">Orçamento & Porte:</span>
            <span className={`font-semibold ${qualificationStatus.budgetIdentified ? 'text-accent-emerald' : 'text-slate-400'}`}>
              {qualificationStatus.budgetIdentified ? 'Identificado (ICP Alto)' : 'Pendente'}
            </span>
          </div>
        </div>

        {qualificationStatus.readyForCalendar && (
          <div className="p-3 bg-accent-emerald/10 border border-accent-emerald/30 rounded-lg text-accent-emerald text-xs space-y-1.5 animate-fade-in">
            <div className="font-bold flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Lead Pronto para Reunião
            </div>
            <p className="text-[11px] text-slate-300">
              O AI SDR identificou maturidade e disponibilizou horários sincronizados com o Google Calendar do Closer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
