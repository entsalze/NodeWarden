import type { ComponentChildren } from 'preact';
import { APP_VERSION } from '@shared/app-version';
import { Card } from '@/components/ui/Card';

interface StandalonePageFrameProps {
  title: string;
  children: ComponentChildren;
}

export default function StandalonePageFrame(props: StandalonePageFrameProps) {
  return (
    <div className="w-[min(640px,100%)] grid gap-3.5 animate-fade-in-up">
      <div className="inline-flex items-center gap-3.5 mb-3 justify-center w-full mb-0.5">
        <img 
          src="/logo-64.png" 
          alt="NodeWarden logo" 
          className="w-14 h-14 object-contain shrink-0 drop-shadow-[0_8px_18px_rgba(43,102,217,0.22)]" 
        />
        <div>
          <img 
            src="/nodewarden-wordmark.svg" 
            alt="NodeWarden" 
            className="block h-auto w-[clamp(200px,30vw,360px)] max-w-full drop-shadow-[0_10px_22px_rgba(43,102,217,0.18)]" 
          />
        </div>
      </div>

      <Card variant="auth">
        <h1 className="m-0 mb-1 text-center text-left text-[31px] leading-[1.15] tracking-[-0.035em]">{props.title}</h1>
        {props.children}
      </Card>

      <div className="w-full text-center text-[13px] text-slate-500">
        <a href="https://github.com/shuaiplus/NodeWarden" target="_blank" rel="noreferrer" className="text-[#1d4ed8] font-bold no-underline hover:underline">NodeWarden Repository</a>
        <span> | </span>
        <a href="https://github.com/shuaiplus" target="_blank" rel="noreferrer" className="text-[#1d4ed8] font-bold no-underline hover:underline">Author: @shuaiplus</a>
        <span> | </span>
        <span className="font-bold text-[#1d4ed8]">v{APP_VERSION}</span>
      </div>
    </div>
  );
}
