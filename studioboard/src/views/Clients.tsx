import { Mail, Plus, TrendingUp, UserRoundCheck } from 'lucide-react';
import type { Client } from '../types';
import { money } from '../utils/format';
import Button from '../components/Button';
import Panel from '../components/Panel';

type ClientsProps = { clients: Client[]; onAdd: () => void; onContact: (client: Client) => void };

export default function Clients({ clients, onAdd, onContact }: ClientsProps) {
  return (
    <Panel title="Clients" subtitle="Relationship snapshots with revenue, satisfaction, project load, and recent contact." action={<Button variant="primary" onClick={onAdd}><Plus size={16} /> New client</Button>} className="view-card clients-panel">
      <div className="client-grid scroll-area cards-scroll">
        {clients.map((client) => (
          <article className="client-card" key={client.id}>
            <div className="client-card-header">
              <div className="avatar">{client.company.slice(0, 2).toUpperCase()}</div>
              <div className="client-main">
                <h3>{client.company}</h3>
                <p>{client.name} · {client.email}</p>
              </div>
            </div>

            <div className="client-stats">
              <span><UserRoundCheck size={15} /><strong>{client.activeProjects}</strong> active projects</span>
              <span><TrendingUp size={15} /><strong>{money(client.revenue)}</strong> revenue</span>
              <span><strong>{client.satisfaction}%</strong> satisfaction</span>
            </div>

            <div className="client-health">
              <div>
                <span>Relationship health</span>
                <strong>{client.satisfaction >= 92 ? 'Excellent' : client.satisfaction >= 88 ? 'Healthy' : 'Needs care'}</strong>
              </div>
              <div className="client-bar"><span style={{ width: `${client.satisfaction}%` }} /></div>
            </div>

            <div className="client-footer">
              <small>Last contact: {client.lastContact}</small>
              <Button size="sm" onClick={() => onContact(client)}><Mail size={14} /> Draft follow-up</Button>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
