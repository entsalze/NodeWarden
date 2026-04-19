import { createPortal } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { TriangleAlert } from 'lucide-preact';
import { t } from '@/lib/i18n';

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
  return createPortal((
    <div
      className={`fixed inset-0 w-screen h-[100dvh] bg-slate-900/50 grid place-items-center z-[1200] p-5 backdrop-blur-md animate-fade-in ${props.variant === 'warning' ? 'bg-[radial-gradient(circle_at_top,rgba(255,237,213,0.32),transparent_34%),linear-gradient(180deg,rgba(127,29,29,0.36),rgba(15,23,42,0.72))] backdrop-blur-lg' : ''} ${closing ? 'animate-fade-out' : ''}`}
      onClick={(event) => {
        if (event.target !== event.currentTarget || !canDismiss) return;
        props.onCancel();
      }}
    >
      <form
        className={`w-[min(460px,100%)] bg-white rounded-[20px] border border-line shadow-[0_20px_50px_rgba(15,23,42,0.2)] p-5 text-center origin-[50%_30%] animate-dialog-in ${props.variant === 'warning' ? 'w-[min(520px,100%)] border-red-600/22 bg-gradient-to-b from-[rgba(255,246,246,0.98)] to-[rgba(255,255,255,0.99)] shadow-[0_36px_90px_rgba(69,10,10,0.28),0_0_0_1px_rgba(255,255,255,0.7)_inset]' : ''} ${closing ? 'animate-dialog-out' : ''}`}
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
            <div className="absolute inset-x-0 top-0 h-1.5 bg-red-600" aria-hidden="true" />
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-rose-50 to-rose-100 text-red-600 shadow-[0_12px_30px_rgba(220,38,38,0.18),0_0_0_1px_rgba(220,38,38,0.08)_inset]" aria-hidden="true">
                <TriangleAlert size={24} />
              </div>
              <div className="text-xs font-extrabold tracking-[0.16em] uppercase text-red-700">{t('txt_warning')}</div>
            </div>
          </>
        ) : null}
        <h3 className={`m-[6px_0] text-[30px] font-bold ${props.variant === 'warning' ? 'text-red-900 mb-2.5' : ''}`}>{props.title}</h3>
        <div className={`text-[#475467] mb-2.5 ${props.variant === 'warning' ? 'mb-4 p-4 rounded-2xl border border-red-600/16 bg-gradient-to-b from-rose-50/94 to-orange-50/90 text-red-800 leading-relaxed shadow-[inset_0_10px_28px_rgba(248,113,113,0.08)]' : ''}`}>{props.message}</div>
        {props.children}
        <button
          type="submit"
          className={`btn ${props.danger ? 'btn-danger' : 'btn-primary'} w-full h-[50px] text-xl mt-2`}
          disabled={props.confirmDisabled}
        >
          {props.confirmText || t('txt_yes')}
        </button>
        {!props.hideCancel && (
          <button
            type="button"
            className="btn btn-secondary w-full h-[50px] text-xl mt-2"
            disabled={props.cancelDisabled}
            onClick={() => {
              if (props.cancelDisabled) return;
              props.onCancel();
            }}
          >
            {props.cancelText || t('txt_no')}
          </button>
        )}
        {props.afterActions}
      </form>
    </div>
  ), document.body);
}
