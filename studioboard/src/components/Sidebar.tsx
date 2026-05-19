import { Briefcase, CalendarDays, CreditCard, LayoutDashboard, RefreshCw, Settings, TrendingUp, Users } from 'lucide-react';
import type { View } from '../types';
import Button from './Button';

type SidebarProps = {
  activeView: View;
  onViewChange: (view: View) => void;
  onReset: () => void;
  health: string;
};

const navItems: { label: View; icon: React.ElementType }[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Projects', icon: Briefcase },
  { label: 'Clients', icon: Users },
  { label: 'Invoices', icon: CreditCard },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Reports', icon: TrendingUp },
];

export default function Sidebar({ activeView, onViewChange, onReset, health }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">SB</div>
        <div>
          <strong>StudioBoard</strong>
          <span>Freelance operations</span>
        </div>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItems.map(({ label, icon: Icon }) => (
          <button key={label} className={`nav-item ${activeView === label ? 'active' : ''}`} onClick={() => onViewChange(label)}>
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="workspace-card">
          <strong>Workspace health</strong>
          <p>{health}</p>
          <Button variant="ghost" onClick={onReset}><RefreshCw size={15} /> Reset demo</Button>
        </div>
        <button className={`settings-link ${activeView === 'Settings' ? 'active' : ''}`} onClick={() => onViewChange('Settings')}>
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}
