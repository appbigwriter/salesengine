import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  description
}) => {
  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-5 hover:border-brand/40 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-slate-300 group-hover:text-brand group-hover:bg-brand/10 transition">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
          isPositive ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-rose/15 text-accent-rose'
        }`}>
          {change}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
};
