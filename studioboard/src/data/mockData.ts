import type { Activity, Client, Invoice, Project, ProjectStatus } from '../types';

export const statusOrder: ProjectStatus[] = ['Discovery', 'Design', 'Development', 'Review', 'Complete'];
export const chartColors = ['#4f7cff', '#34c38f', '#f4b740', '#ef6262', '#8b6ff6'];

export const initialProjects: Project[] = [
  { id: 1, name: 'Evergreen Website Refresh', client: 'Evergreen Market', owner: 'You', status: 'Development', budget: 7950, progress: 68, deadline: 'Jun 18', priority: 'High', notes: 'Homepage build is complete. Product pages need responsive cleanup and final copy.' },
  { id: 2, name: 'Brightline Brand Portal', client: 'Brightline Creative', owner: 'You', status: 'Review', budget: 7600, progress: 86, deadline: 'Jun 21', priority: 'High', notes: 'Client is reviewing asset library, roles, and brand download flows.' },
  { id: 3, name: 'Northstar Booking Flow', client: 'Northstar Studio', owner: 'Maya', status: 'Design', budget: 5200, progress: 42, deadline: 'Jun 25', priority: 'Medium', notes: 'Wireframes approved. Waiting on final service categories.' },
  { id: 4, name: 'Atlas Analytics Landing', client: 'Atlas Labs', owner: 'Theo', status: 'Discovery', budget: 4200, progress: 18, deadline: 'Jul 02', priority: 'Medium', notes: 'Research competitor layouts and define conversion goals.' },
  { id: 5, name: 'Summit Course Platform', client: 'Summit Academy', owner: 'You', status: 'Development', budget: 11200, progress: 57, deadline: 'Jul 08', priority: 'High', notes: 'Course catalog is working. Student dashboard needs empty states.' },
  { id: 6, name: 'Mint & Co Ecommerce Tuneup', client: 'Mint & Co', owner: 'Maya', status: 'Complete', budget: 6400, progress: 100, deadline: 'May 30', priority: 'Low', notes: 'Delivered final handoff and performance report.' },
  { id: 7, name: 'Harbor Social Kit', client: 'Harbor House', owner: 'Theo', status: 'Review', budget: 3800, progress: 78, deadline: 'Jun 17', priority: 'Medium', notes: 'Waiting on testimonial copy before final export.' },
  { id: 8, name: 'Pinecrest Member Dashboard', client: 'Pinecrest Club', owner: 'You', status: 'Development', budget: 9800, progress: 63, deadline: 'Jul 12', priority: 'High', notes: 'Member profile layout done. Billing panel still in progress.' },
  { id: 9, name: 'Bluebird Event Microsite', client: 'Bluebird Events', owner: 'Maya', status: 'Design', budget: 2950, progress: 35, deadline: 'Jun 28', priority: 'Low', notes: 'Designing speaker cards and schedule sections.' },
  { id: 10, name: 'Luma Fitness App Site', client: 'Luma Fitness', owner: 'You', status: 'Discovery', budget: 6100, progress: 24, deadline: 'Jul 16', priority: 'Medium', notes: 'Define app feature story and pricing section.' },
  { id: 11, name: 'Oak & River Portfolio CMS', client: 'Oak & River', owner: 'Theo', status: 'Development', budget: 8700, progress: 51, deadline: 'Jul 22', priority: 'Medium', notes: 'CMS schema finished. Preview mode needs polish.' },
  { id: 12, name: 'Canyon Coffee Campaign', client: 'Canyon Coffee', owner: 'Maya', status: 'Design', budget: 3350, progress: 48, deadline: 'Jul 01', priority: 'Low', notes: 'Landing page art direction is approved.' },
];

export const initialClients: Client[] = [
  { id: 1, name: 'Nora Ellis', company: 'Evergreen Market', email: 'nora@evergreen.example', activeProjects: 2, revenue: 14350, lastContact: 'Today', satisfaction: 96 },
  { id: 2, name: 'Cal Brooks', company: 'Brightline Creative', email: 'cal@brightline.example', activeProjects: 1, revenue: 7600, lastContact: 'Yesterday', satisfaction: 91 },
  { id: 3, name: 'Ava Morgan', company: 'Summit Academy', email: 'ava@summit.example', activeProjects: 1, revenue: 11200, lastContact: '2 days ago', satisfaction: 88 },
  { id: 4, name: 'Liam Hart', company: 'Pinecrest Club', email: 'liam@pinecrest.example', activeProjects: 1, revenue: 9800, lastContact: '3 days ago', satisfaction: 93 },
  { id: 5, name: 'Mina Patel', company: 'Harbor House', email: 'mina@harbor.example', activeProjects: 1, revenue: 3800, lastContact: '4 days ago', satisfaction: 85 },
  { id: 6, name: 'Jon Pierce', company: 'Atlas Labs', email: 'jon@atlas.example', activeProjects: 1, revenue: 4200, lastContact: '1 week ago', satisfaction: 89 },
];

export const initialInvoices: Invoice[] = [
  { id: 1, number: 'INV-1042', client: 'Evergreen Market', project: 'Evergreen Website Refresh', amount: 4200, due: 'Jun 14', status: 'Pending' },
  { id: 2, number: 'INV-1043', client: 'Brightline Creative', project: 'Brightline Brand Portal', amount: 3600, due: 'Jun 16', status: 'Paid' },
  { id: 3, number: 'INV-1044', client: 'Summit Academy', project: 'Summit Course Platform', amount: 5800, due: 'Jun 10', status: 'Overdue' },
  { id: 4, number: 'INV-1045', client: 'Pinecrest Club', project: 'Pinecrest Member Dashboard', amount: 4900, due: 'Jun 24', status: 'Pending' },
  { id: 5, number: 'INV-1046', client: 'Mint & Co', project: 'Mint & Co Ecommerce Tuneup', amount: 6400, due: 'May 30', status: 'Paid' },
  { id: 6, number: 'INV-1047', client: 'Atlas Labs', project: 'Atlas Analytics Landing', amount: 2100, due: 'Jul 01', status: 'Pending' },
];

export const initialActivity: Activity[] = [
  { id: 1, title: 'Review submitted', description: 'Brightline Brand Portal moved into client review.', tone: 'green' },
  { id: 2, title: 'Invoice overdue', description: 'Summit Academy invoice needs a follow-up.', tone: 'red' },
  { id: 3, title: 'Deadline approaching', description: 'Harbor Social Kit is due this week.', tone: 'amber' },
  { id: 4, title: 'Project updated', description: 'Pinecrest dashboard reached 63% progress.', tone: 'blue' },
  { id: 5, title: 'New lead captured', description: 'Luma Fitness requested a proposal revision.', tone: 'purple' },
];

export const revenueData = [
  { month: 'Jul', revenue: 9800, expenses: 4200 },
  { month: 'Aug', revenue: 12600, expenses: 4700 },
  { month: 'Sep', revenue: 11100, expenses: 4400 },
  { month: 'Oct', revenue: 14200, expenses: 5200 },
  { month: 'Nov', revenue: 17600, expenses: 5600 },
  { month: 'Dec', revenue: 16400, expenses: 5400 },
  { month: 'Jan', revenue: 11800, expenses: 4800 },
  { month: 'Feb', revenue: 15400, expenses: 5300 },
  { month: 'Mar', revenue: 13600, expenses: 5100 },
  { month: 'Apr', revenue: 20800, expenses: 6100 },
  { month: 'May', revenue: 26800, expenses: 6600 },
  { month: 'Jun', revenue: 23200, expenses: 5900 },
];

export const utilizationData = [
  { week: 'W1', billable: 28, admin: 9, revision: 6 },
  { week: 'W2', billable: 31, admin: 8, revision: 5 },
  { week: 'W3', billable: 34, admin: 6, revision: 4 },
  { week: 'W4', billable: 30, admin: 10, revision: 6 },
  { week: 'W5', billable: 32, admin: 8, revision: 5 },
  { week: 'W6', billable: 36, admin: 7, revision: 4 },
  { week: 'W7', billable: 29, admin: 10, revision: 7 },
  { week: 'W8', billable: 38, admin: 6, revision: 3 },
  { week: 'W9', billable: 35, admin: 7, revision: 5 },
  { week: 'W10', billable: 39, admin: 5, revision: 4 },
  { week: 'W11', billable: 33, admin: 9, revision: 6 },
  { week: 'W12', billable: 37, admin: 6, revision: 4 },
];
