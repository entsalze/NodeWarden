import { useState } from 'preact/hooks';
import { ArrowLeft, Eye, EyeOff, LogIn, LogOut, Unlock, UserPlus } from 'lucide-preact';
import StandalonePageFrame from '@/components/StandalonePageFrame';
import { t } from '@/lib/i18n';

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  password2: string;
  passwordHint: string;
  inviteCode: string;
}

interface AuthViewsProps {
  mode: 'login' | 'register' | 'locked';
  pendingAction: 'login' | 'register' | 'unlock' | null;
  unlockReady: boolean;
  unlockPreparing: boolean;
  loginValues: LoginValues;
  registerValues: RegisterValues;
  unlockPassword: string;
  emailForLock: string;
  loginHintLoading: boolean;
  onChangeLogin: (next: LoginValues) => void;
  onChangeRegister: (next: RegisterValues) => void;
  onChangeUnlock: (password: string) => void;
  onSubmitLogin: () => void;
  onSubmitRegister: () => void;
  onSubmitUnlock: () => void;
  onGotoLogin: () => void;
  onGotoRegister: () => void;
  onLogout: () => void;
  onTogglePasswordHint: () => void;
  onShowLockedPasswordHint: () => void;
}

function PasswordField(props: {
  label: string;
  value: string;
  onInput: (v: string) => void;
  autoFocus?: boolean;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <label className="block mb-3.5">
      <span className="block mb-2 text-sm font-semibold">{props.label}</span>
      <div className="relative">
        <input
          className="input pr-11"
          type={show ? 'text' : 'password'}
          value={props.value}
          onInput={(e) => props.onInput((e.currentTarget as HTMLInputElement).value)}
          autoFocus={props.autoFocus}
          autoComplete={props.autoComplete}
        />
        <button type="button" className="absolute right-2.5 bottom-2.25 w-7.5 h-7.5 border-none bg-transparent cursor-pointer grid place-items-center text-slate-700 transition-all duration-180 ease-smooth hover:text-primary hover:-translate-y-px hover:scale-104" onClick={() => setShow((v) => !v)}>
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </label>
  );
}

export default function AuthViews(props: AuthViewsProps) {
  const loginBusy = props.pendingAction === 'login';
  const registerBusy = props.pendingAction === 'register';
  const unlockBusy = props.pendingAction === 'unlock';

  if (props.mode === 'locked') {
    return (
      <div className="min-h-full grid place-items-center p-6 relative bg-transparent">
        <StandalonePageFrame title={t('txt_unlock_vault')}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmitUnlock();
            }}
          >
            <p className="m-0 mb-4 text-center text-muted leading-relaxed text-left">{props.emailForLock}</p>
            <input type="text" value={props.emailForLock} autoComplete="username" readOnly hidden tabIndex={-1} aria-hidden="true" />
            <PasswordField
              label={t('txt_master_password')}
              value={props.unlockPassword}
              autoFocus
              autoComplete="current-password"
              onInput={props.onChangeUnlock}
            />
            <div className="flex items-center justify-between mt-[-4px] mb-3">
              <span />
              <button
                type="button"
                className="border-none bg-transparent text-primary text-sm font-bold cursor-pointer p-1 transition-opacity duration-180 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={props.onShowLockedPasswordHint}
                disabled={unlockBusy || props.unlockPreparing}
              >
                {t('txt_show_password_hint')}
              </button>
            </div>
            {props.unlockPreparing ? (
              <p className="m-0 mb-4 text-center text-muted leading-relaxed text-left">{t('txt_loading')}</p>
            ) : null}
            <button type="submit" className="btn btn-primary w-full" disabled={unlockBusy || props.unlockPreparing || !props.unlockReady}>
              <Unlock size={16} className="flex-shrink-0" />
              {unlockBusy ? t('txt_unlocking') : props.unlockPreparing ? t('txt_loading') : t('txt_unlock')}
            </button>
            <div className="text-center my-2.5 text-slate-700">{t('txt_or')}</div>
            <button type="button" className="btn btn-secondary w-full" onClick={props.onLogout} disabled={unlockBusy}>
              <LogOut size={16} className="flex-shrink-0" />
              {t('txt_log_out')}
            </button>
          </form>
        </StandalonePageFrame>
      </div>
    );
  }

  if (props.mode === 'register') {
    return (
      <div className="min-h-full grid place-items-center p-6 relative bg-transparent">
        <StandalonePageFrame title={t('txt_create_account')}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmitRegister();
            }}
          >
            <label className="block mb-3.5">
              <span className="block mb-2 text-sm font-semibold">{t('txt_name')}</span>
              <input
                className="input"
                value={props.registerValues.name}
                autoComplete="name"
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, name: (e.currentTarget as HTMLInputElement).value })
                }
              />
            </label>
            <label className="block mb-3.5">
              <span className="block mb-2 text-sm font-semibold">{t('txt_email')}</span>
              <input
                className="input"
                type="email"
                value={props.registerValues.email}
                autoComplete="email"
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, email: (e.currentTarget as HTMLInputElement).value })
                }
              />
            </label>
            <PasswordField
              label={t('txt_master_password')}
              value={props.registerValues.password}
              autoComplete="new-password"
              onInput={(v) => props.onChangeRegister({ ...props.registerValues, password: v })}
            />
            <PasswordField
              label={t('txt_confirm_master_password')}
              value={props.registerValues.password2}
              autoComplete="new-password"
              onInput={(v) => props.onChangeRegister({ ...props.registerValues, password2: v })}
            />
            <label className="block mb-3.5">
              <span className="block mb-2 text-sm font-semibold">{t('txt_password_hint_optional')}</span>
              <input
                className="input"
                maxLength={120}
                value={props.registerValues.passwordHint}
                placeholder={t('txt_password_hint_register_placeholder')}
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, passwordHint: (e.currentTarget as HTMLInputElement).value })
                }
              />
            </label>
            <label className="block mb-3.5">
              <span className="block mb-2 text-sm font-semibold">{t('txt_invite_code_optional')}</span>
              <input
                className="input"
                value={props.registerValues.inviteCode}
                autoComplete="off"
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, inviteCode: (e.currentTarget as HTMLInputElement).value })
                }
              />
            </label>
            <button type="submit" className="btn btn-primary w-full" disabled={registerBusy}>
              <UserPlus size={16} className="flex-shrink-0" />
              {registerBusy ? t('txt_registering') : t('txt_create_account')}
            </button>
            <div className="text-center my-2.5 text-slate-700">{t('txt_or')}</div>
            <button type="button" className="btn btn-secondary w-full" onClick={props.onGotoLogin} disabled={registerBusy}>
              <ArrowLeft size={16} className="flex-shrink-0" />
              {t('txt_back_to_login')}
            </button>
          </form>
        </StandalonePageFrame>
      </div>
    );
  }

  return (
    <div className="min-h-full grid place-items-center p-6 relative bg-transparent">
      <StandalonePageFrame title={t('txt_log_in')}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmitLogin();
          }}
        >
          <label className="block mb-3.5">
            <span className="block mb-2 text-sm font-semibold">{t('txt_email')}</span>
            <input
              className="input"
              type="email"
              value={props.loginValues.email}
              autoComplete="username"
              onInput={(e) => props.onChangeLogin({ ...props.loginValues, email: (e.currentTarget as HTMLInputElement).value })}
            />
          </label>
          <PasswordField
            label={t('txt_master_password')}
            value={props.loginValues.password}
            autoComplete="current-password"
            onInput={(v) => props.onChangeLogin({ ...props.loginValues, password: v })}
            autoFocus
          />
          <div className="flex items-center justify-between mt-[-4px] mb-3">
            <span />
            <button
              type="button"
              className="border-none bg-transparent text-primary text-sm font-bold cursor-pointer p-1 transition-opacity duration-180 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={props.onTogglePasswordHint}
              disabled={loginBusy || !props.loginValues.email.trim()}
            >
              {props.loginHintLoading
                ? t('txt_loading_password_hint')
                : t('txt_show_password_hint')}
            </button>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loginBusy}>
            <LogIn size={16} className="flex-shrink-0" />
            {loginBusy ? t('txt_logging_in') : t('txt_log_in')}
          </button>
          <div className="text-center my-2.5 text-slate-700">{t('txt_or')}</div>
          <button type="button" className="btn btn-secondary w-full" onClick={props.onGotoRegister} disabled={loginBusy}>
            <UserPlus size={16} className="flex-shrink-0" />
            {t('txt_create_account')}
          </button>
        </form>
      </StandalonePageFrame>
    </div>
  );
}
