import { ComponentChildren } from 'preact';

interface CardProps {
  children: ComponentChildren;
  className?: string;
  variant?: 'default' | 'auth' | 'dialog' | 'sidebar';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseClasses = "bg-panel border border-line rounded-[18px] shadow-sm";
  
  const variantClasses = {
    default: "p-4.5 mb-2.5",
    auth: "w-full relative rounded-[24px] shadow-lg p-[30px] overflow-hidden origin-[50%_24%] animate-surface-enter",
    dialog: "bg-panel border border-line rounded-[18px] shadow-md animate-dialog-in",
    sidebar: "border border-line rounded-[19px] p-3 mb-2 bg-panel",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
