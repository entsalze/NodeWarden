import { createPortal } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { TriangleAlert } from 'lucide-preact';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  variant?: 'default' | 'warning';
  showIcon?: boolean;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  hideCancel?: boolean;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ComponentChildren;
  afterActions?: ComponentChildren;
}

function incrementDialogBodyLock() {
  if (typeof document === 'undefined') return;
  const body = document.body;
  const nextCount = Number(body.dataset.dialogCount || '0') + 1;
  body.dataset.dialogCount = String(nextCount);
  body.classList.add('dialog-open');
}

function decrementDialogBodyLock() {
  if (typeof document === 'undefined') return;
  const body = document.body;
  const nextCount = Math.max(0, Number(body.dataset.dialogCount || '0') - 1);
  if (nextCount === 0) {
    delete body.dataset.dialogCount;
    body.classList.remove('dialog-open');
    return;
  }
  body.dataset.dialogCount = String(nextCount);
}

export function useDialogLifecycle(active: boolean, onCancel?: (() => void) | null) {
  useEffect(() => {
    if (!active) return;
    incrementDialogBodyLock();
    return () => decrementDialogBodyLock();
  }, [active]);

  useEffect(() => {
    if (!active || !onCancel || typeof window === 'undefined') return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, onCancel]);
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const [present, setPresent] = useState(props.open);
  const [closing, setClosing] = useState(false);
  const canDismiss = !props.cancelDisabled && !closing && !props.hideCancel;

  useEffect(() => {
    if (props.open) {
      setPresent(true);
      setClosing(false);
      return;
    }
    if (!present) return;
    setClosing(true);
    const timer = window.setTimeout(() => {
      setPresent(false);
      setClosing(false);
    }, 240);
    return () => window.clearTimeout(timer);
  }, [props.open, present]);

  useDialogLifecycle(present, canDismiss ? props.onCancel : null);

  if (!present || typeof document === 'undefined') return null;

  const isOpen = props.open && !closing;

  return createPortal((
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-[90] transition-all duration-240 ease-smooth ${props.variant === 'warning' ? 'bg-amber-950/20' : 'bg-slate-950/40'} ${isOpen ? 'opacity-100 visible backdrop-blur-[2px]' : 'opacity-0 invisible pointer-events-none'}`}
      onClick={(event) => {
        if (event.target !== event.currentTarget || !canDismiss) return;
        props.onCancel();
      }}
    >
      <form
        className={`w-full max-w-[420px] bg-panel border border-line rounded-[22px] shadow-lg p-6 relative overflow-hidden transition-all duration-240 ease-out-strong ${isOpen ? 'animate-dialog-in opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'} ${props.variant === 'warning' ? 'border-amber-200' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
        onSubmit={(e) => {
          e.preventDefault();
          if (props.confirmDisabled || closing) return;
          props.onConfirm();
        }}
      >
        {props.variant === 'warning' ? (
          <>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-400" aria-hidden="true" />
            <div className="flex flex-col items-center gap-2 mt-2 mb-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center" aria-hidden="true">
                <TriangleAlert size={32} />
              </div>
              <div className="text-amber-800 font-extrabold text-sm uppercase tracking-wider">{t('txt_warning')}</div>
            </div>
          </>
        ) : null}
        <h3 className="text-xl font-extrabold mb-3 text-text text-center">{props.title}</h3>
        <div className={`text-slate-600 leading-relaxed mb-6 text-center ${props.variant === 'warning' ? 'text-slate-700' : ''}`}>{props.message}</div>
        {props.children}
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            variant={props.danger ? 'danger' : 'primary'}
            className="w-full h-11 rounded-xl"
            disabled={props.confirmDisabled}
          >
            {props.confirmText || t('txt_yes')}
          </Button>
          {!props.hideCancel && (
            <Button
              variant="secondary"
              className="w-full h-11 rounded-xl"
              disabled={props.cancelDisabled}
              onClick={() => {
                if (props.cancelDisabled) return;
                props.onCancel();
              }}
            >
              {props.cancelText || t('txt_no')}
            </Button>
          )}
        </div>
        {props.afterActions}
      </form>
    </div>
  ), document.body);
}
