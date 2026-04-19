import type { ToastMessage } from '@/lib/types';

interface ToastHostProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function ToastHost({ toasts, onClose }: ToastHostProps) {
  if (!toasts.length) return null;
  return (
    <ul className="fixed bottom-2.5 right-2.5 z-[1400] w-[min(420px,calc(100vw-20px))] list-none m-0 p-0 grid gap-2.5 max-[600px]:top-2.5 max-[600px]:left-2.5 max-[600px]:right-2.5 max-[600px]:w-auto max-[600px]:bottom-auto">
      {toasts.map((toast) => (
        <li
          key={toast.id}
          className={`relative rounded-xl border p-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] overflow-hidden flex justify-between items-center animate-toast-in ${
            toast.type === 'error' || toast.type === 'warning'
              ? 'border-[#f2b8c1] bg-[#fde7eb] text-[#9f1239]'
              : 'border-[#bbdfc6] bg-[#dff4e5] text-[#0f5132]'
          }`}
        >
          <div className="font-bold pr-2.5">{toast.text}</div>
          <button type="button" className="border-none bg-transparent cursor-pointer text-xl text-inherit font-normal" onClick={() => onClose(toast.id)}>
            ×
          </button>
          <div className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20 w-full" />
        </li>
      ))}
    </ul>
  );
}
