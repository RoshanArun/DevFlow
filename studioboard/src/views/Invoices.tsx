import { Plus } from 'lucide-react';
import type { Invoice } from '../types';
import Button from '../components/Button';
import InvoiceTable from '../components/InvoiceTable';
import Panel from '../components/Panel';

type InvoicesProps = { invoices: Invoice[]; onAdd: () => void; onPaid: (id: number) => void; onDelete: (id: number) => void };

export default function Invoices({ invoices, onAdd, onPaid, onDelete }: InvoicesProps) {
  return (
    <Panel className="view-card invoices-panel" title="Invoices" subtitle="Track what is paid, pending, and overdue." action={<Button variant="primary" onClick={onAdd}><Plus size={16} /> New invoice</Button>}>
      <InvoiceTable invoices={invoices} onPaid={onPaid} onDelete={onDelete} />
    </Panel>
  );
}
