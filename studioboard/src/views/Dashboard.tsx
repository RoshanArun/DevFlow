import { useMemo, useState } from 'react';
import { Bell, Briefcase, CheckCircle2, CircleDollarSign, FileText, Plus, Send } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Activity, Invoice, Project } from '../types';
import { chartColors, revenueData, statusOrder } from '../data/mockData';
import { money } from '../utils/format';
import Badge from '../components/Badge';
import Button from '../components/Button';
import InvoiceTable from '../components/InvoiceTable';
import Panel from '../components/Panel';
import ProjectTable from '../components/ProjectTable';
import StatCard from '../components/StatCard';

type DashboardProps = {
  projects: Project[];
  invoices: Invoice[];
  activity: Activity[];
  stats: { paidRevenue: number; pendingRevenue: number; activeProjects: number; openInvoices: number; avgProgress: number };
  statusData: { name: string; value: number }[];
  onOpenProject: (project: Project) => void;
  onAdvanceProject: (id: number) => void;
  onDeleteProject: (id: number) => void;
  onPaidInvoice: (id: number) => void;
  onDeleteInvoice: (id: number) => void;
  onOpenAddProject: () => void;
  onOpenAddInvoice: () => void;
  onToast: (message: string) => void;
};

export default function Dashboard(props: DashboardProps) {
  const { projects, invoices, activity, stats, statusData } = props;
  const [revenueSpan, setRevenueSpan] = useState<3 | 6 | 12>(6);
  const visibleRevenueData = useMemo(() => revenueData.slice(-revenueSpan), [revenueSpan]);
  const chartTooltipStyle = { background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 14, color: 'var(--text)', boxShadow: 'var(--shadow-soft)' };
  const chartLabelStyle = { color: 'var(--text)', fontWeight: 800 };
  return (
    <div className="dashboard-stack">
      <div className="stat-grid">
        <StatCard label="Paid revenue" value={money(stats.paidRevenue)} helper={`${money(stats.pendingRevenue)} still pending`} icon={CircleDollarSign} tone="green" />
        <StatCard label="Active projects" value={stats.activeProjects} helper={`${projects.filter((p) => p.status === 'Review').length} currently in review`} icon={Briefcase} tone="blue" />
        <StatCard label="Open invoices" value={stats.openInvoices} helper="Click invoices to mark paid" icon={FileText} tone="amber" />
        <StatCard label="Avg. progress" value={`${stats.avgProgress}%`} helper="Across all active and shipped work" icon={CheckCircle2} tone="purple" />
      </div>

      <div className="dashboard-grid">
        <Panel title="Revenue trend" subtitle="Monthly income versus expenses." action={<div className="panel-actions-row"><div className="mini-segmented">{([3, 6, 12] as const).map((span) => <button key={span} className={revenueSpan === span ? 'active' : ''} onClick={() => setRevenueSpan(span)}>{span}M</button>)}</div><Button onClick={() => props.onToast('Share link generated for the revenue report.')}><Send size={16} /> Share</Button></div>} className="chart-panel">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visibleRevenueData} margin={{ top: 18, right: 18, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f7cff" stopOpacity={0.38}/>
                    <stop offset="95%" stopColor="#4f7cff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 8" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={54} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={chartLabelStyle} itemStyle={{ color: 'var(--text)' }} formatter={(value) => money(Number(value))} />
                <Area type="monotone" dataKey="revenue" stroke="#4f7cff" strokeWidth={3} fill="url(#revenueFill)" />
                <Area type="monotone" dataKey="expenses" stroke="#f4b740" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Recent activity" subtitle="What changed recently." action={<Bell size={18} />} className="activity-panel">
          <div className="activity-list scroll-area">
            {activity.map((item) => (
              <div className="activity-item" key={item.id}>
                <span className={`dot dot-${item.tone}`} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <Badge tone="purple">New</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="dashboard-grid lower-grid">
        <Panel title="Priority projects" subtitle={`${Math.min(projects.length, 7)} shown`} action={<Button onClick={props.onOpenAddProject}><Plus size={15} /> Add</Button>} className="projects-panel">
          <ProjectTable compact projects={projects} onOpen={props.onOpenProject} onAdvance={props.onAdvanceProject} onDelete={props.onDeleteProject} />
        </Panel>

        <Panel title="Project mix" subtitle="By workflow stage." className="mix-panel">
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                  {statusData.map((_, index) => <Cell key={index} fill={chartColors[index % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={chartLabelStyle} itemStyle={{ color: 'var(--text)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mix-list scroll-area small-scroll">
            {statusOrder.map((status, index) => (
              <div key={status} className="mix-row"><span><i style={{ background: chartColors[index] }} />{status}</span><strong>{statusData.find((item) => item.name === status)?.value || 0}</strong></div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="invoices-panel dashboard-invoices" title="Open invoices" subtitle="Mark paid or remove demo records." action={<Button onClick={props.onOpenAddInvoice}><Plus size={15} /> Add invoice</Button>}>
        <InvoiceTable invoices={invoices.filter((invoice) => invoice.status !== 'Paid')} onPaid={props.onPaidInvoice} onDelete={props.onDeleteInvoice} />
      </Panel>
    </div>
  );
}
