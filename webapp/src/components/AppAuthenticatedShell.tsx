import { ArrowUpDown, Cloud, Clock3, Folder as FolderIcon, KeyRound, Lock, LogOut, Send as SendIcon, Settings as SettingsIcon, Shield, ShieldUser } from 'lucide-preact';
import { Link } from 'wouter';
import AppMainRoutes from '@/components/AppMainRoutes';
import ThemeSwitch from '@/components/ThemeSwitch';
import type { AppMainRoutesProps } from '@/components/AppMainRoutes';
import { t } from '@/lib/i18n';
import type { Profile } from '@/lib/types';
import { Button } from '@/components/ui/Button';

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
        <header className="h-[58px] border-b border-line-soft text-slate-900 bg-[#f4f8ff]/72 flex items-center justify-between px-4.5 transition-all duration-fast ease-smooth">
          <div className="inline-flex items-center gap-2 text-[34px] font-extrabold text-text">
            <img src="/logo-64.png" alt="NodeWarden logo" className="w-[42px] h-[42px] object-contain drop-shadow-[0_10px_22px_rgba(43,102,217,0.22)] transition-all duration-medium ease-out-soft" />
            <img src="/nodewarden-wordmark.svg" alt="NodeWarden" className="block h-auto w-[clamp(210px,20vw,290px)] max-w-full drop-shadow-[0_12px_24px_rgba(43,102,217,0.12)]" />
            <span className="hidden min-w-0 max-w-[min(58vw,240px)] overflow-hidden text-ellipsis whitespace-nowrap text-[19px] leading-tight font-extrabold text-slate-900">{props.currentPageTitle}</span>
          </div>
          <div className="flex items-center gap-2.5 topbar-actions">
            <div className="inline-flex items-center gap-1.5 h-[34px] rounded-full px-3 border border-slate-400/30 bg-white/92 text-muted-strong text-sm font-semibold shadow-[0_10px_18px_rgba(13,31,68,0.05)] transition-all duration-220 ease-out-soft hover:-translate-y-px hover:shadow-[0_16px_28px_rgba(15,23,42,0.08)] user-chip">
              <ShieldUser size={16} />
              <span>{props.profile?.email}</span>
            </div>
            <ThemeSwitch checked={props.darkMode} title={props.themeToggleTitle} onToggle={props.onToggleTheme} />
            <Button variant="secondary" size="small" onClick={props.onLock} icon={Lock}>
              {t('txt_lock')}
            </Button>
            {props.showSidebarToggle && (
              <Button
                variant="secondary"
                size="small"
                className="md:hidden"
                aria-label={props.sidebarToggleTitle}
                title={props.sidebarToggleTitle}
                onClick={() => window.dispatchEvent(new CustomEvent('nodewarden:toggle-sidebar'))}
                icon={FolderIcon}
              />
            )}
            <div className="hidden mobile-theme-btn">
              <ThemeSwitch checked={props.darkMode} title={props.themeToggleTitle} onToggle={props.onToggleTheme} />
            </div>
            <Button variant="secondary" size="small" className="hidden mobile-lock-btn" aria-label={t('txt_lock')} title={t('txt_lock')} onClick={props.onLock} icon={Lock} />
            <Button variant="secondary" size="small" onClick={props.onLogout} icon={LogOut}>
              {t('txt_sign_out')}
            </Button>
          </div>
        </header>

        <div className="flex-1 min-h-0 grid grid-cols-[200px_1fr] app-main">
          <aside className="border-r border-line-soft p-4 px-3 flex flex-col gap-2 app-side">
            <Link href="/vault" className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === '/vault' ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
              <KeyRound size={16} />
              <span>{t('nav_my_vault')}</span>
            </Link>
            <Link href="/vault/totp" className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === '/vault/totp' ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
              <Clock3 size={16} />
              <span>{t('txt_verification_code')}</span>
            </Link>
            <Link href="/sends" className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === '/sends' ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
              <SendIcon size={16} />
              <span>{t('nav_sends')}</span>
            </Link>
            {props.profile?.role === 'admin' && (
              <Link href="/admin" className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === '/admin' ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
                <ShieldUser size={16} />
                <span>{t('nav_admin_panel')}</span>
              </Link>
            )}
            <Link href={props.settingsAccountRoute} className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === props.settingsAccountRoute ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
              <SettingsIcon size={16} />
              <span>{t('nav_account_settings')}</span>
            </Link>
            <Link href="/security/devices" className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === '/security/devices' ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
              <Shield size={16} />
              <span>{t('nav_device_management')}</span>
            </Link>
            {props.profile?.role === 'admin' && (
              <Link href="/backup" className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.location === '/backup' ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
                <Cloud size={16} />
                <span>{t('nav_backup_strategy')}</span>
              </Link>
            )}
            <Link href={props.importRoute} className={`flex items-center gap-2.5 p-[11px_12px] rounded-xl text-muted-strong no-underline border border-transparent font-semibold text-sm transition-all duration-fast ease-smooth hover:bg-white hover:border-line/18 hover:text-text hover:shadow-[0_14px_24px_rgba(15,23,42,0.05)] side-link ${props.isImportRoute ? 'active bg-linear-to-br from-primary/18 to-blue-500/8 border-primary/28 text-primary-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.64),0_10px_18px_rgba(37,99,235,0.1)]' : ''}`}>
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

        <nav className="hidden mobile-tabbar" aria-label={t('txt_menu')}>
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
