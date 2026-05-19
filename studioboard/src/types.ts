export type View = 'Dashboard' | 'Projects' | 'Clients' | 'Invoices' | 'Calendar' | 'Reports' | 'Settings';
export type Theme = 'light' | 'dark';
export type Density = 'comfortable' | 'compact';
export type Accent = 'indigo' | 'green' | 'amber' | 'rose';
export type ProjectStatus = 'Discovery' | 'Design' | 'Development' | 'Review' | 'Complete';
export type Priority = 'Low' | 'Medium' | 'High';
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';
export type ModalType = 'project' | 'client' | 'invoice' | null;

export type Preferences = {
  density: Density;
  accent: Accent;
  showHints: boolean;
  notifications: boolean;
  autoArchive: boolean;
  confirmDeletes: boolean;
};

export type Project = {
  id: number;
  name: string;
  client: string;
  owner: string;
  status: ProjectStatus;
  budget: number;
  progress: number;
  deadline: string;
  priority: Priority;
  notes: string;
};

export type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  activeProjects: number;
  revenue: number;
  lastContact: string;
  satisfaction: number;
};

export type Invoice = {
  id: number;
  number: string;
  client: string;
  project: string;
  amount: number;
  due: string;
  status: InvoiceStatus;
};

export type Activity = {
  id: number;
  title: string;
  description: string;
  tone: 'blue' | 'green' | 'amber' | 'red' | 'purple';
};
