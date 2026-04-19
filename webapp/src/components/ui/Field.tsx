import { ComponentChildren } from 'preact';

interface FieldProps {
  label?: string;
  children: ComponentChildren;
  help?: string;
  className?: string;
}

export function Field({ label, children, help, className = '' }: FieldProps) {
  return (
    <label className={`block mb-3.5 ${className}`}>
      {label && <span className="block mb-2 text-[14px] font-semibold">{label}</span>}
      {children}
      {help && <p className="mt-2 text-[13px] leading-relaxed text-muted">{help}</p>}
    </label>
  );
}
