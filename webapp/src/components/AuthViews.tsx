import { ArrowLeft, LogIn, LogOut, Unlock, UserPlus } from 'lucide-preact';
import StandalonePageFrame from '@/components/StandalonePageFrame';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Field } from '@/components/ui/Field';

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
            <p className="text-center text-muted mb-4">{props.emailForLock}</p>
            <input type="text" value={props.emailForLock} autoComplete="username" readOnly hidden tabIndex={-1} aria-hidden="true" />
            <Field label={t('txt_master_password')}>
              <Input
                isPassword
                value={props.unlockPassword}
                autoFocus
                autoComplete="current-password"
                onInput={(e) => props.onChangeUnlock(e.currentTarget.value)}
              />
            </Field>
            <div className="flex items-center justify-between gap-2.5 -mt-0.5 mb-3">
              <span />
              <Button
                variant="link"
                onClick={props.onShowLockedPasswordHint}
                disabled={unlockBusy || props.unlockPreparing}
              >
                {t('txt_show_password_hint')}
              </Button>
            </div>
            {props.unlockPreparing ? (
              <p className="text-center text-muted mb-4">{t('txt_loading')}</p>
            ) : null}
            <Button 
              type="submit" 
              size="full" 
              variant="primary"
              disabled={unlockBusy || props.unlockPreparing || !props.unlockReady}
              loading={unlockBusy}
              icon={Unlock}
            >
              {props.unlockPreparing ? t('txt_loading') : t('txt_unlock')}
            </Button>
            <div className="text-center my-2.5 text-slate-600 font-bold">{t('txt_or')}</div>
            <Button 
              variant="secondary" 
              size="full" 
              onClick={props.onLogout} 
              disabled={unlockBusy}
              icon={LogOut}
            >
              {t('txt_log_out')}
            </Button>
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
            <Field label={t('txt_name')}>
              <Input
                value={props.registerValues.name}
                autoComplete="name"
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, name: e.currentTarget.value })
                }
              />
            </Field>
            <Field label={t('txt_email')}>
              <Input
                type="email"
                value={props.registerValues.email}
                autoComplete="email"
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, email: e.currentTarget.value })
                }
              />
            </Field>
            <Field label={t('txt_master_password')}>
              <Input
                isPassword
                value={props.registerValues.password}
                autoComplete="new-password"
                onInput={(e) => props.onChangeRegister({ ...props.registerValues, password: e.currentTarget.value })}
              />
            </Field>
            <Field label={t('txt_confirm_master_password')}>
              <Input
                isPassword
                value={props.registerValues.password2}
                autoComplete="new-password"
                onInput={(e) => props.onChangeRegister({ ...props.registerValues, password2: e.currentTarget.value })}
              />
            </Field>
            <Field label={t('txt_password_hint_optional')}>
              <Input
                maxLength={120}
                value={props.registerValues.passwordHint}
                placeholder={t('txt_password_hint_register_placeholder')}
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, passwordHint: e.currentTarget.value })
                }
              />
            </Field>
            <Field label={t('txt_invite_code_optional')}>
              <Input
                value={props.registerValues.inviteCode}
                autoComplete="off"
                onInput={(e) =>
                  props.onChangeRegister({ ...props.registerValues, inviteCode: e.currentTarget.value })
                }
              />
            </Field>
            <Button 
              type="submit" 
              variant="primary" 
              size="full" 
              disabled={registerBusy}
              loading={registerBusy}
              icon={UserPlus}
            >
              {t('txt_create_account')}
            </Button>
            <div className="text-center my-2.5 text-slate-600 font-bold">{t('txt_or')}</div>
            <Button 
              variant="secondary" 
              size="full" 
              onClick={props.onGotoLogin} 
              disabled={registerBusy}
              icon={ArrowLeft}
            >
              {t('txt_back_to_login')}
            </Button>
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
          <Field label={t('txt_email')}>
            <Input
              type="email"
              value={props.loginValues.email}
              autoComplete="email"
              onInput={(e) =>
                props.onChangeLogin({ ...props.loginValues, email: e.currentTarget.value })
              }
            />
          </Field>
          <Field label={t('txt_master_password')}>
            <Input
              isPassword
              value={props.loginValues.password}
              autoComplete="current-password"
              onInput={(e) => props.onChangeLogin({ ...props.loginValues, password: e.currentTarget.value })}
            />
          </Field>
          <div className="flex items-center justify-between gap-2.5 -mt-0.5 mb-3">
            <span />
            <Button
              variant="link"
              onClick={props.onTogglePasswordHint}
              disabled={loginBusy || props.loginHintLoading}
            >
              {t('txt_get_password_hint')}
            </Button>
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            size="full" 
            disabled={loginBusy}
            loading={loginBusy}
            icon={LogIn}
          >
            {t('txt_log_in')}
          </Button>
          <div className="text-center my-2.5 text-slate-600 font-bold">{t('txt_or')}</div>
          <Button 
            variant="secondary" 
            size="full" 
            onClick={props.onGotoRegister} 
            disabled={loginBusy}
            icon={UserPlus}
          >
            {t('txt_create_account')}
          </Button>
        </form>
      </StandalonePageFrame>
    </div>
  );
}
