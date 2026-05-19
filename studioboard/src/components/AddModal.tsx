import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Client, Invoice, InvoiceStatus, ModalType, Priority, Project, ProjectStatus } from '../types';
import Button from './Button';

type AddModalProps = {
  modal: ModalType;
  onClose: () => void;
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onAddClient: (client: Omit<Client, 'id'>) => void;
  onAddInvoice: (invoice: Omit<Invoice, 'id'>) => void;
};

export default function AddModal({ modal, onClose, onAddProject, onAddClient, onAddInvoice }: AddModalProps) {
  const [project, setProject] = useState({ name: 'New Website Sprint', client: 'New Client', owner: 'You', status: 'Discovery' as ProjectStatus, budget: 4500, progress: 15, deadline: 'Jul 30', priority: 'Medium' as Priority, notes: 'Customize this project before adding it.' });
  const [client, setClient] = useState({ name: 'Jordan Lee', company: 'New Studio', email: 'jordan@example.com', activeProjects: 1, revenue: 4500, lastContact: 'Today', satisfaction: 90 });
  const [invoice, setInvoice] = useState({ number: 'INV-1050', client: 'New Client', project: 'New Website Sprint', amount: 2500, due: 'Jul 15', status: 'Pending' as InvoiceStatus });

  useEffect(() => {
    if (!modal) return;
    const closeOnEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
  }, [modal, onClose]);

  if (!modal) return null;

  const title = modal === 'project' ? 'Add project' : modal === 'client' ? 'Add client' : 'Add invoice';

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (modal === 'project') onAddProject(project);
    if (modal === 'client') onAddClient(client);
    if (modal === 'invoice') onAddInvoice(invoice);
    onClose();
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form className="modal-card" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div><h2>{title}</h2><p>Customize the demo record before it is added.</p></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
        </div>

        {modal === 'project' && (
          <div className="form-grid">
            <label>Project name<input value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} /></label>
            <label>Client<input value={project.client} onChange={(e) => setProject({ ...project, client: e.target.value })} /></label>
            <label>Owner<input value={project.owner} onChange={(e) => setProject({ ...project, owner: e.target.value })} /></label>
            <label>Status<select value={project.status} onChange={(e) => setProject({ ...project, status: e.target.value as ProjectStatus })}><option>Discovery</option><option>Design</option><option>Development</option><option>Review</option><option>Complete</option></select></label>
            <label>Budget<input type="number" value={project.budget} onChange={(e) => setProject({ ...project, budget: Number(e.target.value) })} /></label>
            <label>Progress<input type="number" min="0" max="100" value={project.progress} onChange={(e) => setProject({ ...project, progress: Number(e.target.value) })} /></label>
            <label>Deadline<input value={project.deadline} onChange={(e) => setProject({ ...project, deadline: e.target.value })} /></label>
            <label>Priority<select value={project.priority} onChange={(e) => setProject({ ...project, priority: e.target.value as Priority })}><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="full-field">Notes<textarea value={project.notes} onChange={(e) => setProject({ ...project, notes: e.target.value })} /></label>
          </div>
        )}

        {modal === 'client' && (
          <div className="form-grid">
            <label>Contact name<input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} /></label>
            <label>Company<input value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} /></label>
            <label>Email<input value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} /></label>
            <label>Active projects<input type="number" value={client.activeProjects} onChange={(e) => setClient({ ...client, activeProjects: Number(e.target.value) })} /></label>
            <label>Revenue<input type="number" value={client.revenue} onChange={(e) => setClient({ ...client, revenue: Number(e.target.value) })} /></label>
            <label>Satisfaction<input type="number" min="0" max="100" value={client.satisfaction} onChange={(e) => setClient({ ...client, satisfaction: Number(e.target.value) })} /></label>
          </div>
        )}

        {modal === 'invoice' && (
          <div className="form-grid">
            <label>Invoice #<input value={invoice.number} onChange={(e) => setInvoice({ ...invoice, number: e.target.value })} /></label>
            <label>Client<input value={invoice.client} onChange={(e) => setInvoice({ ...invoice, client: e.target.value })} /></label>
            <label>Project<input value={invoice.project} onChange={(e) => setInvoice({ ...invoice, project: e.target.value })} /></label>
            <label>Amount<input type="number" value={invoice.amount} onChange={(e) => setInvoice({ ...invoice, amount: Number(e.target.value) })} /></label>
            <label>Due date<input value={invoice.due} onChange={(e) => setInvoice({ ...invoice, due: e.target.value })} /></label>
            <label>Status<select value={invoice.status} onChange={(e) => setInvoice({ ...invoice, status: e.target.value as InvoiceStatus })}><option>Pending</option><option>Paid</option><option>Overdue</option></select></label>
          </div>
        )}

        <div className="modal-actions">
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Add {modal}</Button>
        </div>
      </form>
    </div>
  );
}
