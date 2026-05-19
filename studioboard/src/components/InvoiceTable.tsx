import { Check, Trash2 } from 'lucide-react';
import type { Invoice } from '../types';
import { money } from '../utils/format';
import Badge from './Badge';
import Button from './Button';

type InvoiceTableProps = {
  invoices: Invoice[];
  onPaid: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function InvoiceTable({ invoices, onPaid, onDelete }: InvoiceTableProps) {
  return (
    <div className="table-scroll small-table">
      <table className="data-table">
        <thead>
          <tr>
            <th>Invoice</th><th>Client</th><th>Project</th><th>Amount</th><th>Due</th><th>Status</th><th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td><strong>{invoice.number}</strong></td>
              <td>{invoice.client}</td>
              <td>{invoice.project}</td>
              <td>{money(invoice.amount)}</td>
              <td>{invoice.due}</td>
              <td><Badge tone={invoice.status}>{invoice.status}</Badge></td>
              <td>
                <div className="row-actions">
                  <Button size="sm" onClick={() => onPaid(invoice.id)} disabled={invoice.status === 'Paid'}><Check size={14} /> Paid</Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete(invoice.id)}><Trash2 size={14} /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
