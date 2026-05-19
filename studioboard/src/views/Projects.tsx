import { Plus } from 'lucide-react';
import type { Project } from '../types';
import Button from '../components/Button';
import Panel from '../components/Panel';
import ProjectTable from '../components/ProjectTable';

type ProjectsProps = {
  projects: Project[];
  onAdd: () => void;
  onOpen: (project: Project) => void;
  onAdvance: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function Projects({ projects, onAdd, onOpen, onAdvance, onDelete }: ProjectsProps) {
  return (
    <Panel className="view-card projects-view-panel" title="Projects" subtitle="Manage active, upcoming, and shipped work without the page stretching forever." action={<Button variant="primary" onClick={onAdd}><Plus size={16} /> New project</Button>}>
      <ProjectTable projects={projects} onOpen={onOpen} onAdvance={onAdvance} onDelete={onDelete} />
    </Panel>
  );
}
