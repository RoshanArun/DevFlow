import { X } from 'lucide-react';
import type { Project } from '../types';
import { money } from '../utils/format';
import Badge from './Badge';
import Button from './Button';

type ProjectDrawerProps = {
  project: Project | null;
  onClose: () => void;
  onAdvance: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ProjectDrawer({ project, onClose, onAdvance, onDelete }: ProjectDrawerProps) {
  if (!project) return null;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="project-drawer" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <Badge tone={project.status}>{project.status}</Badge>
            <h2>{project.name}</h2>
            <p>{project.client} · Owner: {project.owner}</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close project panel"><X size={18} /></button>
        </div>
        <div className="drawer-section">
          <span>Progress</span>
          <div className="progress-cell wide">
            <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
            <small>{project.progress}%</small>
          </div>
        </div>
        <div className="drawer-grid">
          <div><span>Budget</span><strong>{money(project.budget)}</strong></div>
          <div><span>Deadline</span><strong>{project.deadline}</strong></div>
          <div><span>Priority</span><strong>{project.priority}</strong></div>
          <div><span>Status</span><strong>{project.status}</strong></div>
        </div>
        <div className="drawer-section">
          <span>Notes</span>
          <p>{project.notes}</p>
        </div>
        <div className="drawer-section">
          <span>Next steps</span>
          <ul>
            <li>Confirm the next client review checkpoint.</li>
            <li>Update invoice timing after the next milestone.</li>
            <li>Keep the project notes short and action-focused.</li>
          </ul>
        </div>
        <div className="drawer-actions">
          <Button variant="primary" onClick={() => onAdvance(project.id)}>Advance status</Button>
          <Button variant="danger" onClick={() => onDelete(project.id)}>Delete project</Button>
        </div>
      </aside>
    </div>
  );
}
