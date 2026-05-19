import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Client, Invoice, Project } from '../types';
import { utilizationData } from '../data/mockData';
import { money, average } from '../utils/format';
import Panel from '../components/Panel';

export default function Reports({ projects, clients, invoices }: { projects: Project[]; clients: Client[]; invoices: Invoice[] }) {
  const totalPipeline = projects.reduce((sum, project) => sum + project.budget, 0);
  const avgProgress = average(projects.map((p) => p.progress));
  const overdue = invoices.filter((invoice) => invoice.status === 'Overdue').length;
  const paid = invoices.filter((invoice) => invoice.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const topClients = [...clients].sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  const highPriority = projects.filter((project) => project.priority === 'High').length;
  const [utilizationSpan, setUtilizationSpan] = useState<4 | 8 | 12>(8);
  const visibleUtilizationData = useMemo(() => utilizationData.slice(-utilizationSpan), [utilizationSpan]);
  const chartTooltipStyle = { background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 14, color: 'var(--text)', boxShadow: 'var(--shadow-soft)' };
  const chartLabelStyle = { color: 'var(--text)', fontWeight: 800 };

  return (
    <div className="view-fill reports-grid">
      <Panel title="Studio report" subtitle="A stronger snapshot than just the dashboard cards." className="view-card report-overview">
        <div className="report-summary-grid">
          <div><span>Total pipeline</span><strong>{money(totalPipeline)}</strong><p>Across {projects.length} projects.</p></div>
          <div><span>Collected revenue</span><strong>{money(paid)}</strong><p>Marked paid in demo invoices.</p></div>
          <div><span>Average delivery progress</span><strong>{avgProgress}%</strong><p>Weighted equally per project.</p></div>
          <div><span>Risk flags</span><strong>{overdue + highPriority}</strong><p>{overdue} overdue invoices, {highPriority} high-priority projects.</p></div>
        </div>
      </Panel>

      <Panel title="Weekly utilization" subtitle="Billable, admin, and revision work." action={<div className="mini-segmented">{([4, 8, 12] as const).map((span) => <button key={span} className={utilizationSpan === span ? 'active' : ''} onClick={() => setUtilizationSpan(span)}>{span}W</button>)}</div>} className="view-card chart-panel compact-chart">
        <div className="chart-box report-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visibleUtilizationData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 8" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} labelStyle={chartLabelStyle} itemStyle={{ color: 'var(--text)' }} />
              <Bar dataKey="billable" fill="#4f7cff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="admin" fill="#f4b740" radius={[8, 8, 0, 0]} />
              <Bar dataKey="revision" fill="#ef6262" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Top clients" subtitle="Highest lifetime revenue in this workspace." className="view-card report-card-tall">
        <div className="rank-list scroll-area small-scroll">
          {topClients.map((client, index) => (
            <div className="rank-row" key={client.id}>
              <span>{index + 1}</span>
              <div className="rank-client-copy">
                <strong>{client.company}</strong>
                <p>{client.name} · {client.activeProjects} active · {client.satisfaction}% satisfaction</p>
              </div>
              <b>{money(client.revenue)}</b>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Recommendations" subtitle="Simple product-style insights from the data." className="view-card report-card-tall">
        <div className="insight-list scroll-area small-scroll">
          <div><strong>Follow up on overdue invoices.</strong><p>There are {overdue} overdue invoices that could impact monthly cash flow.</p></div>
          <div><strong>Balance the workload.</strong><p>{highPriority} high-priority projects are active. Keep delivery dates realistic.</p></div>
          <div><strong>Use reviews to close work.</strong><p>Projects in review should get a specific approval deadline to avoid drift.</p></div>
          <div><strong>Protect the highest-value clients.</strong><p>{topClients[0]?.company || 'Your top client'} is the largest account. Prioritize polish and communication there.</p></div>
          <div><strong>Keep pipeline visible.</strong><p>Discovery projects should either move forward or be archived so the dashboard stays actionable.</p></div>
        </div>
      </Panel>
    </div>
  );
}
