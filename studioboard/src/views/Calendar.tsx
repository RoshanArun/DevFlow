import { CalendarCheck, Clock3, Flag, Layers3 } from 'lucide-react';
import type { Project } from '../types';
import Badge from '../components/Badge';
import Panel from '../components/Panel';

export default function Calendar({ projects }: { projects: Project[] }) {
  const upcoming = projects.slice().sort((a, b) => new Date(`${a.deadline} 2026`).getTime() - new Date(`${b.deadline} 2026`).getTime());
  const thisMonth = upcoming.filter((project) => project.deadline.startsWith('Jun'));
  const highPriority = upcoming.filter((project) => project.priority === 'High');
  const reviewReady = upcoming.filter((project) => project.status === 'Review' || project.status === 'Complete');

  return (
    <div className="view-fill calendar-grid">
      <Panel title="Calendar" subtitle="Upcoming delivery windows, review checkpoints, and workload pressure." className="view-card calendar-main">
        <div className="calendar-toolbar">
          <div className="calendar-metric"><CalendarCheck size={18} /><strong>{upcoming.length}</strong><span>scheduled</span></div>
          <div className="calendar-metric"><Flag size={18} /><strong>{highPriority.length}</strong><span>high priority</span></div>
          <div className="calendar-metric"><Clock3 size={18} /><strong>{thisMonth.length}</strong><span>due in June</span></div>
          <div className="calendar-metric"><Layers3 size={18} /><strong>{reviewReady.length}</strong><span>review/complete</span></div>
        </div>

        <div className="calendar-board scroll-area">
          {upcoming.map((project, index) => (
            <article className="calendar-card" key={project.id}>
              <div className="date-tile">
                <span>{project.deadline.split(' ')[0]}</span>
                <strong>{project.deadline.split(' ')[1]}</strong>
              </div>
              <div className="calendar-copy">
                <div className="calendar-card-top">
                  <h3>{project.name}</h3>
                  <Badge tone={index < 3 ? 'red' : project.priority}>{project.priority}</Badge>
                </div>
                <p>{project.client} · Owner: {project.owner}</p>
                <div className="calendar-progress">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
                <small>{project.notes}</small>
              </div>
              <Badge tone={project.status}>{project.status}</Badge>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Review lane" subtitle="Items that need client decisions soon." className="view-card calendar-side">
        <div className="review-list scroll-area">
          {upcoming.filter((project) => project.status === 'Review' || project.priority === 'High').map((project) => (
            <div className="review-card" key={project.id}>
              <span>{project.deadline}</span>
              <strong>{project.name}</strong>
              <p>{project.client} · {project.status} · {project.progress}% done</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
