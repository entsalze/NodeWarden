import { JSX, ComponentChildren } from 'preact';
import { LucideIcon } from 'lucide-preact';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'full';
  icon?: LucideIcon;
  loading?: boolean;
  href?: string;
  children?: ComponentChildren;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon: Icon, 
  loading, 
  className = '', 
  disabled,
  href,
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-1.5 font-bold cursor-pointer transition-all duration-180 ease-smooth disabled:cursor-not-allowed disabled:opacity-70 active:scale-95 hover:-translate-y-0.5";
  
  const variantClasses = {
    primary: "bg-linear-to-br from-[#2563eb] to-[#3b82f6] border border-[#0f3f98]/32 text-white shadow-[0_14px_28px_rgba(37,99,235,0.24)] hover:shadow-[0_18px_34px_rgba(37,99,235,0.28)]",
    secondary: "bg-panel border border-[#2563eb]/22 text-primary-strong shadow-[0_8px_18px_rgba(13,31,68,0.05)] hover:bg-[#f4f8ff] hover:border-[#2563eb]/34",
    danger: "bg-white/80 border border-[#d92d57]/28 text-danger hover:bg-rose-50 hover:border-[#d92d57]/38",
    link: "bg-transparent border-none text-[#1d4ed8] text-[13px] hover:underline hover:translate-x-0.5 active:scale-100 font-bold p-0 h-auto",
  };

  const sizeClasses = {
    small: "h-[30px] px-3 rounded-full text-[12px]",
    medium: "h-[36px] px-4 rounded-full text-[15px]",
    full: "w-full h-[50px] px-6 rounded-[24px] text-[22px] my-2.5",
  };

  const combinedClasses = `btn ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...(props as any)}>
        {Icon && <Icon size={size === 'small' ? 14 : 16} className="shrink-0" />}
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClasses} disabled={disabled || loading} {...(props as any)}>
      {Icon && <Icon size={size === 'small' ? 14 : 16} className="shrink-0" />}
      {loading ? '...' : children}
    </button>
  );
}
