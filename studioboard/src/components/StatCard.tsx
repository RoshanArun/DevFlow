import type { LucideIcon } from 'lucide-react';

type StatCardProps = {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
  tone: 'green' | 'blue' | 'amber' | 'purple';
};

export default function StatCard({ label, value, helper, icon: Icon, tone }: StatCardProps) {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <strong>{value}</strong>
        <span>{helper}</span>
      </div>
      <div className={`stat-icon stat-${tone}`}>
        <Icon size={20} />
      </div>
    </div>
  );
}
