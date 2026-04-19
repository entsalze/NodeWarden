import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Eye, EyeOff } from 'lucide-preact';

interface InputProps extends Omit<JSX.HTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, 'onInput'> {
  type?: string;
  isPassword?: boolean;
  onInput?: (e: JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, Event>) => void;
}

export function Input({ type = 'text', isPassword, className = '', ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const baseClasses = "w-full h-[48px] border border-line-soft rounded-[14px] px-[14px] text-[16px] outline-hidden text-text bg-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-180 ease-smooth focus:border-primary/60 focus:bg-[#fbfdff] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.11),0_10px_20px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] focus:-translate-y-px disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed";

  if (isPassword) {
    return (
      <div className="relative">
        <input
          {...(props as any)}
          type={showPassword ? 'text' : 'password'}
          className={`${baseClasses} pr-11 ${className}`}
        />
        <button
          type="button"
          className="absolute right-2.5 bottom-[9px] w-[30px] h-[30px] border-none bg-transparent cursor-pointer grid place-items-center text-slate-600 transition-all duration-180 ease-smooth hover:text-primary hover:-translate-y-px hover:scale-105"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    );
  }

  if (type === 'textarea') {
    return <textarea {...(props as any)} className={`${baseClasses} h-auto min-h-[110px] resize-y ${className}`} />;
  }

  if (type === 'select') {
    return (
      <select 
        {...(props as any)} 
        className={`${baseClasses} appearance-none pr-11 bg-[linear-gradient(45deg,transparent_50%,#365fa8_50%),linear-gradient(135deg,#365fa8_50%,transparent_50%)] bg-[position:calc(100%-18px)_calc(50%-3px),calc(100%-12px)_calc(50%-3px)] bg-[size:6px_6px,6px_6px] bg-no-repeat ${className}`} 
      />
    );
  }

  return <input {...(props as any)} type={type} className={`${baseClasses} ${className}`} />;
}
