import React from 'react';
import { Bell, Search, Zap, CheckCircle2, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenGates: () => void;
  pendingGatesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGates, pendingGatesCount }) => {
  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-surface-border px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar empresas, tomadores de decisão ou deals..."
          className="w-full bg-surface-card border border-surface-border rounded-lg pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand transition"
        />
      </div>

      {/* Status Indicators & Profile */}
      <div className="flex items-center gap-5">
        {/* System Health Status */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
            <span>WhatsApp API: <strong className="text-accent-emerald">Conectado</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-accent-purple" />
            <span>AI SDR: <strong className="text-accent-purple">Ativo (v2.4)</strong></span>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-surface-border"></div>

        {/* Human Gate Alert Button */}
        {pendingGatesCount > 0 && (
          <button 
            onClick={onOpenGates}
            className="flex items-center gap-2 px-3 py-1.5 bg-accent-amber/15 hover:bg-accent-amber/25 text-accent-amber border border-accent-amber/30 rounded-lg text-xs font-semibold transition"
          >
            <Shield className="w-3.5 h-3.5 animate-bounce" />
            <span>{pendingGatesCount} Gate(s) Pendente(s)</span>
          </button>
        )}

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-brand absolute top-1.5 right-1.5"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-accent-emerald flex items-center justify-center text-xs font-bold text-white shadow-sm">
            FB
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-white">FBR Operações</div>
            <div className="text-[10px] text-slate-400">Head of Growth</div>
          </div>
        </div>
      </div>
    </header>
  );
};
