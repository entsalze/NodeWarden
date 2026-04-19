import { ArrowUpDown, Cloud, Clock3, Folder as FolderIcon, KeyRound, Lock, LogOut, Send as SendIcon, Settings as SettingsIcon, Shield, ShieldUser } from 'lucide-preact';
import { Link } from 'wouter';
import AppMainRoutes from '@/components/AppMainRoutes';
import ThemeSwitch from '@/components/ThemeSwitch';
import type { AppMainRoutesProps } from '@/components/AppMainRoutes';
import { t } from '@/lib/i18n';
import type { Profile } from '@/lib/types';

interface AppAuthenticatedShellProps {
  profile: Profile | null;
  location: string;
  mobilePrimaryRoute: string;
  currentPageTitle: string;
  showSidebarToggle: boolean;
  sidebarToggleTitle: string;
  settingsAccountRoute: string;
  importRoute: string;
  isImportRoute: boolean;
  darkMode: boolean;
  themeToggleTitle: string;
  onLock: () => void;
  onLogout: () => void;
  onToggleTheme: () => void;
  mainRoutesProps: AppMainRoutesProps;
}

export default function AppAuthenticatedShell(props: AppAuthenticatedShellProps) {
  const routeAnimationKey = props.isImportRoute ? props.importRoute : props.location;

  return (
    <div className="min-h-full p-5 relative bg-transparent">
      <div className="h-[calc(100vh-40px)] max-w-[1600px] mx-auto relative bg-panel-soft border border-line rounded-[28px] shadow-lg flex flex-col overflow-hidden animate-shell-enter">
        <header className="h-[58px] border-b border-line-soft bg-[rgba(244,248,255,0.72)] flex items-center justify-between px-4.5 transition-colors duration-180 ease-smooth">
          <div className="inline-flex items-center gap-2 text-[34px] font-extrabold text-text">
            <img src="/logo-64.png" alt="NodeWarden logo" className="w-10.5 h-10.5 object-contain transition-all duration-240 ease-out-soft [filter:drop-shadow(0_10px_22px_rgba(43,102,217,0.22))]" />
            <img src="/nodewarden-wordmark.svg" alt="NodeWarden" className="block h-auto w-[clamp(210px,20vw,290px)] max-w-full [filter:drop-shadow(0_12px_24px_rgba(43,102,217,0.12))]" />
            <span className="hidden min-w-0 max-w-[min(58vw,240px)] overflow-hidden text-ellipsis whitespace-nowrap text-[19px] leading-[1.2] font-extrabold text-[#0f172a]">{props.currentPageTitle}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="user-chip">
              <ShieldUser size={16} />
              <span>{props.profile?.email}</span>
            </div>
            <ThemeSwitch checked={props.darkMode} title={props.themeToggleTitle} onToggle={props.onToggleTheme} />
            <button type="button" className="btn btn-secondary small" onClick={props.onLock}>
              <Lock size={14} className="flex-shrink-0" /> {t('txt_lock')}
            </button>
            {props.showSidebarToggle && (
              <button
                type="button"
                className="btn btn-secondary small hidden"
                aria-label={props.sidebarToggleTitle}
                title={props.sidebarToggleTitle}
                onClick={() => window.dispatchEvent(new CustomEvent('nodewarden:toggle-sidebar'))}
              >
                <FolderIcon size={16} className="flex-shrink-0" />
              </button>
            )}
            <div className="hidden">
              <ThemeSwitch checked={props.darkMode} title={props.themeToggleTitle} onToggle={props.onToggleTheme} />
            </div>
            <button type="button" className="btn btn-secondary small hidden" aria-label={t('txt_lock')} title={t('txt_lock')} onClick={props.onLock}>
              <Lock size={14} className="flex-shrink-0" />
            </button>
            <button type="button" className="btn btn-secondary small" onClick={props.onLogout}>
              <LogOut size={14} className="flex-shrink-0" /> {t('txt_sign_out')}
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 grid grid-cols-[200px_1fr]">
          <aside className="border-r border-line-soft p-4 flex flex-col gap-2">
            <Link href="/vault" className={`side-link ${props.location === '/vault' ? 'active' : ''}`}>
              <KeyRound size={16} />
              <span>{t('nav_my_vault')}</span>
            </Link>
            <Link href="/vault/totp" className={`side-link ${props.location === '/vault/totp' ? 'active' : ''}`}>
              <Clock3 size={16} />
              <span>{t('txt_verification_code')}</span>
            </Link>
            <Link href="/sends" className={`side-link ${props.location === '/sends' ? 'active' : ''}`}>
              <SendIcon size={16} />
              <span>{t('nav_sends')}</span>
            </Link>
            {props.profile?.role === 'admin' && (
              <Link href="/admin" className={`side-link ${props.location === '/admin' ? 'active' : ''}`}>
                <ShieldUser size={16} />
                <span>{t('nav_admin_panel')}</span>
              </Link>
            )}
            <Link href={props.settingsAccountRoute} className={`side-link ${props.location === props.settingsAccountRoute ? 'active' : ''}`}>
              <SettingsIcon size={16} />
              <span>{t('nav_account_settings')}</span>
            </Link>
            <Link href="/security/devices" className={`side-link ${props.location === '/security/devices' ? 'active' : ''}`}>
              <Shield size={16} />
              <span>{t('nav_device_management')}</span>
            </Link>
            {props.profile?.role === 'admin' && (
              <Link href="/backup" className={`side-link ${props.location === '/backup' ? 'active' : ''}`}>
                <Cloud size={16} />
                <span>{t('nav_backup_strategy')}</span>
              </Link>
            )}
            <Link href={props.importRoute} className={`side-link ${props.isImportRoute ? 'active' : ''}`}>
              <ArrowUpDown size={14} />
              <span>{t('nav_import_export')}</span>
            </Link>
          </aside>
          <main className="min-h-0 p-3.5 overflow-hidden">
            <div key={routeAnimationKey} className="h-full min-h-0 overflow-auto animate-route-stage-in">
              <AppMainRoutes {...props.mainRoutesProps} />
            </div>
          </main>
        </div>

        <nav className="hidden" aria-label={t('txt_menu')}>
          <Link href="/vault" className={`mobile-tab ${props.mobilePrimaryRoute === '/vault' ? 'active' : ''}`}>
            <KeyRound size={18} />
            <span>{t('nav_my_vault')}</span>
          </Link>
          <Link href="/vault/totp" className={`mobile-tab ${props.mobilePrimaryRoute === '/vault/totp' ? 'active' : ''}`}>
            <Clock3 size={18} />
            <span>{t('txt_verification_code')}</span>
          </Link>
          <Link href="/sends" className={`mobile-tab ${props.mobilePrimaryRoute === '/sends' ? 'active' : ''}`}>
            <SendIcon size={18} />
            <span>{t('nav_sends')}</span>
          </Link>
          <Link href="/settings" className={`mobile-tab ${props.mobilePrimaryRoute === '/settings' ? 'active' : ''}`}>
            <SettingsIcon size={18} />
            <span>{t('txt_settings')}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
