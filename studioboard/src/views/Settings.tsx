import { Check, Moon, RefreshCw, Sun } from 'lucide-react';
import type { Accent, Preferences, Theme } from '../types';
import Button from '../components/Button';
import Panel from '../components/Panel';

type SettingsProps = {
  theme: Theme;
  preferences: Preferences;
  onThemeChange: (theme: Theme) => void;
  onPreferencesChange: (preferences: Preferences) => void;
  onReset: () => void;
  onExport: () => void;
};

const accents: { value: Accent; label: string; description: string }[] = [
  { value: 'indigo', label: 'Indigo', description: 'Default SaaS blue-purple accent.' },
  { value: 'green', label: 'Green', description: 'Calmer finance and operations feel.' },
  { value: 'amber', label: 'Amber', description: 'Warmer studio-management tone.' },
  { value: 'rose', label: 'Rose', description: 'More energetic creative-agency look.' },
];

export default function Settings({ theme, preferences, onThemeChange, onPreferencesChange, onReset, onExport }: SettingsProps) {
  return (
    <div className="view-fill settings-grid">
      <Panel title="Settings" subtitle="Customize the demo workspace and visual preferences." className="view-card settings-main">
        <div className="settings-section">
          <div>
            <h3>Appearance</h3>
            <p>Switch themes without losing your current demo data.</p>
          </div>
          <div className="segmented-control">
            <button className={theme === 'light' ? 'active' : ''} onClick={() => onThemeChange('light')}><Sun size={16} /> Light</button>
            <button className={theme === 'dark' ? 'active' : ''} onClick={() => onThemeChange('dark')}><Moon size={16} /> Dark</button>
          </div>
        </div>

        <div className="settings-section">
          <div>
            <h3>Density</h3>
            <p>Choose more breathing room or a tighter information layout.</p>
          </div>
          <div className="segmented-control">
            <button className={preferences.density === 'comfortable' ? 'active' : ''} onClick={() => onPreferencesChange({ ...preferences, density: 'comfortable' })}>Comfortable</button>
            <button className={preferences.density === 'compact' ? 'active' : ''} onClick={() => onPreferencesChange({ ...preferences, density: 'compact' })}>Compact</button>
          </div>
        </div>

        <div className="settings-section stacked">
          <div>
            <h3>Accent color</h3>
            <p>Try a different product direction without changing the structure.</p>
          </div>
          <div className="accent-grid">
            {accents.map((accent) => (
              <button key={accent.value} className={`accent-card accent-${accent.value} ${preferences.accent === accent.value ? 'active' : ''}`} onClick={() => onPreferencesChange({ ...preferences, accent: accent.value })}>
                <span className="accent-dot" />
                <strong>{accent.label}</strong>
                <small>{accent.description}</small>
                {preferences.accent === accent.value && <Check size={17} />}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div>
            <h3>Workspace hints</h3>
            <p>Show helper copy under the page headings and panels.</p>
          </div>
          <button className={`switch ${preferences.showHints ? 'on' : ''}`} onClick={() => onPreferencesChange({ ...preferences, showHints: !preferences.showHints })} aria-label="Toggle workspace hints">
            <span />
          </button>
        </div>

        <div className="settings-section">
          <div>
            <h3>Smart notifications</h3>
            <p>Show alerts for overdue invoices, review work, and nearby deadlines.</p>
          </div>
          <button className={`switch ${preferences.notifications ? 'on' : ''}`} onClick={() => onPreferencesChange({ ...preferences, notifications: !preferences.notifications })} aria-label="Toggle smart notifications">
            <span />
          </button>
        </div>

        <div className="settings-section">
          <div>
            <h3>Auto-archive completed work</h3>
            <p>Keep completed projects out of active planning views after handoff.</p>
          </div>
          <button className={`switch ${preferences.autoArchive ? 'on' : ''}`} onClick={() => onPreferencesChange({ ...preferences, autoArchive: !preferences.autoArchive })} aria-label="Toggle auto archive">
            <span />
          </button>
        </div>

        <div className="settings-section">
          <div>
            <h3>Confirm destructive actions</h3>
            <p>Require an extra confirmation before deleting projects or invoices.</p>
          </div>
          <button className={`switch ${preferences.confirmDeletes ? 'on' : ''}`} onClick={() => onPreferencesChange({ ...preferences, confirmDeletes: !preferences.confirmDeletes })} aria-label="Toggle delete confirmations">
            <span />
          </button>
        </div>
      </Panel>

      <div className="settings-side">
        <Panel title="Demo controls" subtitle="Actions that affect the current mock workspace." className="view-card settings-card">
          <div className="settings-actions">
            <Button variant="primary" onClick={onExport}>Export workspace data</Button>
            <Button onClick={onReset}><RefreshCw size={15} /> Reset demo data</Button>
          </div>
        </Panel>
        <Panel title="Current preferences" subtitle="A quick summary of what is active." className="view-card settings-card">
          <div className="preference-summary">
            <span>Theme <strong>{theme}</strong></span>
            <span>Density <strong>{preferences.density}</strong></span>
            <span>Accent <strong>{preferences.accent}</strong></span>
            <span>Hints <strong>{preferences.showHints ? 'on' : 'off'}</strong></span>
            <span>Notifications <strong>{preferences.notifications ? 'on' : 'off'}</strong></span>
            <span>Auto-archive <strong>{preferences.autoArchive ? 'on' : 'off'}</strong></span>
            <span>Confirm delete <strong>{preferences.confirmDeletes ? 'on' : 'off'}</strong></span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
