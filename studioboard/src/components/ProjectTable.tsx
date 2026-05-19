import type { Project } from '../types';
import { money } from '../utils/format';
import Badge from './Badge';
import Button from './Button';
import { Trash2 } from 'lucide-react';

type ProjectTableProps = {
  projects: Project[];
  compact?: boolean;
  onOpen: (project: Project) => void;
  onAdvance: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ProjectTable({ projects, compact = false, onOpen, onAdvance, onDelete }: ProjectTableProps) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Progress</th>
            <th>Deadline</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.slice(0, compact ? 8 : undefined).map((project) => (
            <tr key={project.id}>
              <td>
                <strong>{project.name}</strong>
                <small>Owner: {project.owner} · {project.priority}</small>
              </td>
              <td>{project.client}</td>
              <td><Badge tone={project.status}>{project.status}</Badge></td>
              <td>{money(project.budget)}</td>
              <td>
                <div className="progress-cell">
                  <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
                  <small>{project.progress}%</small>
                </div>
              </td>
              <td>{project.deadline}</td>
              <td>
                <div className="row-actions">
                  <Button size="sm" onClick={() => onOpen(project)}>Open</Button>
                  <Button size="sm" onClick={() => onAdvance(project.id)}>Advance</Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete(project.id)} aria-label={`Delete ${project.name}`}><Trash2 size={14} /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
