import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Send, 
  MessageSquare,
  Kanban, 
  Bot, 
  BarChart3,
  ShieldCheck, 
  Settings,
  Sparkles,
  Layers,
  Target
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'opportunities', label: 'Opportunity Builder', icon: Target, badge: 'Afiliados', isAi: false },
    { id: 'leads', label: 'Leads & ICP', icon: Users, badge: '24 novos' },
    { id: 'cadences', label: 'Cadências Outbound', icon: Send },
    { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare, badge: 'Anti-ban' },
    { id: 'pipeline', label: 'Pipeline CRM', icon: Kanban, badge: 'R$ 480k' },
    { id: 'ai-sdr', label: 'AI SDR Assistant', icon: Bot, isAi: true },
    { id: 'analytics', label: 'Analytics & BI', icon: BarChart3 },
    { id: 'gates', label: 'Gates & Auditoria', icon: ShieldCheck, badge: '2 pendentes', alert: true },
  ];

  return (
    <aside className="w-68 min-w-[270px] bg-surface border-r border-surface-border flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-surface-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-accent-purple flex items-center justify-center shadow-lg shadow-brand/20 shrink-0">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5 truncate">
            FBR <span className="text-brand font-extrabold">Sales Engine</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-medium truncate">B2B Revenue Acceleration</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto">
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Módulos Principais
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-brand/15 text-brand border border-brand/30 shadow-sm'
                  : 'text-slate-300 hover:bg-surface-elevated hover:text-white'
              }`}
              title={item.label}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-brand' : item.isAi ? 'text-accent-purple' : 'text-slate-400 group-hover:text-slate-200'
                }`} />
                <span className="truncate whitespace-nowrap text-left">{item.label}</span>
              </div>

              {item.isAi && (
                <span className="flex items-center gap-1 text-[9px] bg-accent-purple/20 text-accent-purple px-1.5 py-0.5 rounded font-semibold border border-accent-purple/30 shrink-0 ml-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              )}

              {item.badge && !item.isAi && (
                <span className={`text-[9px] tracking-tight px-1.5 py-0.5 rounded-full font-semibold shrink-0 ml-1 ${
                  item.alert 
                    ? 'bg-accent-amber/20 text-accent-amber border border-accent-amber/30 animate-pulse' 
                    : 'bg-surface-elevated text-slate-300 border border-surface-border'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-surface-border bg-surface-card/40">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse shrink-0"></div>
            <span className="truncate">Workspace: <strong className="text-slate-300">FBR Hub</strong></span>
          </div>
          <Settings className="w-3.5 h-3.5 shrink-0 cursor-pointer hover:text-white transition" />
        </div>
      </div>
    </aside>
  );
};
