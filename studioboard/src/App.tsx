import { useMemo, useState } from 'react';
import type { Activity, Client, Invoice, ModalType, Preferences, Project, Theme, View } from './types';
import { initialActivity, initialClients, initialInvoices, initialProjects, statusOrder } from './data/mockData';
import { average, clamp } from './utils/format';
import AddModal from './components/AddModal';
import Header from './components/Header';
import ProjectDrawer from './components/ProjectDrawer';
import Sidebar from './components/Sidebar';
import Calendar from './views/Calendar';
import Clients from './views/Clients';
import Dashboard from './views/Dashboard';
import Invoices from './views/Invoices';
import Projects from './views/Projects';
import Reports from './views/Reports';
import Settings from './views/Settings';

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [preferences, setPreferences] = useState<Preferences>({ density: 'comfortable', accent: 'indigo', showHints: true, notifications: true, autoArchive: false, confirmDeletes: true });
  const [activeView, setActiveView] = useState<View>('Dashboard');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [activity, setActivity] = useState<Activity[]>(initialActivity);
  const [query, setQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [toast, setToast] = useState('Ready.');
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);

  const stats = useMemo(() => {
    const paidRevenue = invoices.filter((invoice) => invoice.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    const pendingRevenue = invoices.filter((invoice) => invoice.status !== 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    const activeProjects = projects.filter((project) => project.status !== 'Complete').length;
    const openInvoices = invoices.filter((invoice) => invoice.status !== 'Paid').length;
    const avgProgress = average(projects.map((project) => project.progress));
    return { paidRevenue, pendingRevenue, activeProjects, openInvoices, avgProgress };
  }, [projects, invoices]);

  const filteredProjects = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return projects;
    return projects.filter((project) => `${project.name} ${project.client} ${project.status} ${project.owner} ${project.priority}`.toLowerCase().includes(term));
  }, [projects, query]);

  const filteredClients = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return clients;
    return clients.filter((client) => `${client.name} ${client.company} ${client.email}`.toLowerCase().includes(term));
  }, [clients, query]);

  const filteredInvoices = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return invoices;
    return invoices.filter((invoice) => `${invoice.number} ${invoice.client} ${invoice.project} ${invoice.status}`.toLowerCase().includes(term));
  }, [invoices, query]);

  const statusData = useMemo(
    () => statusOrder.map((status) => ({ name: status, value: projects.filter((project) => project.status === status).length })),
    [projects]
  );

  const health = `${stats.activeProjects} active projects, ${invoices.filter((i) => i.status === 'Overdue').length} overdue invoice, and ${stats.avgProgress}% average completion.`;

  function pushActivity(title: string, description: string, tone: Activity['tone'] = 'blue') {
    setActivity((items) => [{ id: Date.now(), title, description, tone }, ...items].slice(0, 10));
    setToast(description);
  }

  function advanceProject(id: number) {
    let message = '';
    setProjects((items) => items.map((project) => {
      if (project.id !== id) return project;
      const currentIndex = statusOrder.indexOf(project.status);
      const nextStatus = statusOrder[Math.min(currentIndex + 1, statusOrder.length - 1)];
      const nextProgress = nextStatus === 'Complete' ? 100 : clamp(project.progress + 16, 0, 94);
      message = `${project.name} moved to ${nextStatus}.`;
      return { ...project, status: nextStatus, progress: nextProgress };
    }));
    setSelectedProject((current) => {
      if (!current || current.id !== id) return current;
      const nextStatus = statusOrder[Math.min(statusOrder.indexOf(current.status) + 1, statusOrder.length - 1)];
      return { ...current, status: nextStatus, progress: nextStatus === 'Complete' ? 100 : clamp(current.progress + 16, 0, 94) };
    });
    pushActivity('Project advanced', message || 'Project advanced.', 'green');
  }

  function deleteProject(id: number) {
    const project = projects.find((item) => item.id === id);
    setProjects((items) => items.filter((item) => item.id !== id));
    setSelectedProject((current) => current?.id === id ? null : current);
    pushActivity('Project removed', `${project?.name || 'Project'} was removed.`, 'red');
  }

  function markInvoicePaid(id: number) {
    const invoice = invoices.find((item) => item.id === id);
    setInvoices((items) => items.map((item) => item.id === id ? { ...item, status: 'Paid' } : item));
    pushActivity('Invoice paid', `${invoice?.number || 'Invoice'} was marked paid.`, 'green');
  }

  function deleteInvoice(id: number) {
    const invoice = invoices.find((item) => item.id === id);
    setInvoices((items) => items.filter((item) => item.id !== id));
    pushActivity('Invoice removed', `${invoice?.number || 'Invoice'} was removed.`, 'red');
  }

  function addProject(project: Omit<Project, 'id'>) {
    const nextProject = { ...project, id: Date.now(), progress: clamp(project.progress) };
    setProjects((items) => [nextProject, ...items]);
    setActiveView('Projects');
    pushActivity('Project created', `${project.name} was added to the pipeline.`, 'blue');
  }

  function addClient(client: Omit<Client, 'id'>) {
    setClients((items) => [{ ...client, id: Date.now() }, ...items]);
    setActiveView('Clients');
    pushActivity('Client added', `${client.company} was added to the client list.`, 'purple');
  }

  function addInvoice(invoice: Omit<Invoice, 'id'>) {
    setInvoices((items) => [{ ...invoice, id: Date.now() }, ...items]);
    setActiveView('Invoices');
    pushActivity('Invoice added', `${invoice.number} was created for ${invoice.client}.`, 'amber');
  }

  function exportData() {
    const payload = JSON.stringify({ projects, clients, invoices }, null, 2);
    navigator.clipboard?.writeText(payload).catch(() => undefined);
    console.log('StudioBoard export', payload);
    pushActivity('Workspace exported', 'Demo data was copied to clipboard and logged to console.', 'blue');
  }

  function resetDemo() {
    setProjects(initialProjects);
    setClients(initialClients);
    setInvoices(initialInvoices);
    setActivity(initialActivity);
    setSelectedProject(null);
    setQuery('');
    setMobileActionsOpen(false);
    setToast('Demo workspace reset.');
  }

  function renderView() {
    if (activeView === 'Projects') return <Projects projects={filteredProjects} onAdd={() => setModal('project')} onOpen={setSelectedProject} onAdvance={advanceProject} onDelete={deleteProject} />;
    if (activeView === 'Clients') return <Clients clients={filteredClients} onAdd={() => setModal('client')} onContact={(client) => pushActivity('Draft started', `A follow-up draft was prepared for ${client.company}.`, 'blue')} />;
    if (activeView === 'Invoices') return <Invoices invoices={filteredInvoices} onAdd={() => setModal('invoice')} onPaid={markInvoicePaid} onDelete={deleteInvoice} />;
    if (activeView === 'Calendar') return <Calendar projects={filteredProjects} />;
    if (activeView === 'Reports') return <Reports projects={filteredProjects} clients={filteredClients} invoices={filteredInvoices} />;
    if (activeView === 'Settings') return <Settings theme={theme} preferences={preferences} onThemeChange={setTheme} onPreferencesChange={setPreferences} onReset={resetDemo} onExport={exportData} />;
    return (
      <Dashboard
        projects={filteredProjects}
        invoices={filteredInvoices}
        activity={activity}
        stats={stats}
        statusData={statusData}
        onOpenProject={setSelectedProject}
        onAdvanceProject={advanceProject}
        onDeleteProject={deleteProject}
        onPaidInvoice={markInvoicePaid}
        onDeleteInvoice={deleteInvoice}
        onOpenAddProject={() => setModal('project')}
        onOpenAddInvoice={() => setModal('invoice')}
        onToast={(message) => pushActivity('Shared', message, 'purple')}
      />
    );
  }

  return (
    <div className={`app-shell ${theme} accent-${preferences.accent} density-${preferences.density} ${preferences.showHints ? 'show-hints' : 'hide-hints'}`}>
      <Sidebar activeView={activeView} onViewChange={(view) => { setActiveView(view); setMobileActionsOpen(false); }} onReset={resetDemo} health={health} />
      <main className="main-content">
        <Header
          activeView={activeView}
          query={query}
          onQueryChange={setQuery}
          theme={theme}
          onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          onExport={exportData}
          onOpenModal={setModal}
          menuOpen={mobileActionsOpen}
          onToggleMenu={() => setMobileActionsOpen((value) => !value)}
        />
        {renderView()}
      </main>
      <div className="toast" role="status">{toast}</div>
      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} onAdvance={advanceProject} onDelete={deleteProject} />
      <AddModal modal={modal} onClose={() => setModal(null)} onAddProject={addProject} onAddClient={addClient} onAddInvoice={addInvoice} />
    </div>
  );
}
