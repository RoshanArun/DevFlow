import type { InvoiceStatus, Priority, ProjectStatus } from '../types';

type BadgeProps = {
  children: React.ReactNode;
  tone?: ProjectStatus | InvoiceStatus | Priority | 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple';
};

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  const safeTone = String(tone).toLowerCase().replace(/\s+/g, '-');
  return <span className={`badge badge-${safeTone}`}>{children}</span>;
}
