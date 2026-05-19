import { Download, Menu, Moon, Plus, Search, Sun, X } from 'lucide-react';
import type { ModalType, Theme, View } from '../types';
import Button from './Button';

type HeaderProps = {
  activeView: View;
  query: string;
  onQueryChange: (value: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onExport: () => void;
  onOpenModal: (modal: Exclude<ModalType, null>) => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

const modalForView = (view: View): Exclude<ModalType, null> => {
  if (view === 'Clients') return 'client';
  if (view === 'Invoices') return 'invoice';
  return 'project';
};

export default function Header({ activeView, query, onQueryChange, theme, onToggleTheme, onExport, onOpenModal, menuOpen, onToggleMenu }: HeaderProps) {
  const modal = modalForView(activeView);
  const addLabel = modal === 'client' ? 'Add client' : modal === 'invoice' ? 'Add invoice' : 'Add project';
  return (
    <header className="top-header">
      <div className="title-block">
        <p>{activeView}</p>
        <h1>Studio operations, clearly organized.</h1>
        <span>Track work, revenue, deadlines, clients, and invoices from one polished workspace.</span>
      </div>

      <div className="header-actions desktop-actions">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search projects, clients, status..." />
        </label>
        <Button onClick={onToggleTheme}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}</Button>
        <Button onClick={onExport}><Download size={16} /> Export</Button>
        <Button variant="primary" onClick={() => onOpenModal(modal)}><Plus size={16} /> {addLabel}</Button>
      </div>

      <button className="mobile-menu-button" onClick={onToggleMenu} aria-label="Open dashboard actions">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
        <div className="mobile-actions-popover">
          <label className="search-box full">
            <Search size={18} />
            <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search workspace..." />
          </label>
          <Button onClick={onToggleTheme}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}</Button>
          <Button onClick={onExport}><Download size={16} /> Export</Button>
          <Button variant="primary" onClick={() => onOpenModal(modal)}><Plus size={16} /> {addLabel}</Button>
        </div>
      )}
    </header>
  );
}
