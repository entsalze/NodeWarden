import type { ComponentChildren } from 'preact';
import { APP_VERSION } from '@shared/app-version';

interface StandalonePageFrameProps {
  title: string;
  children: ComponentChildren;
}

export default function StandalonePageFrame(props: StandalonePageFrameProps) {
  return (
    <div className="w-[min(640px,100%)] grid gap-3.5 animate-fade-in-up [animation-duration:420ms]">
      <div className="inline-flex items-center gap-3.5 mb-3 justify-center w-full mb-0.5">
        <img src="/logo-64.png" alt="NodeWarden logo" className="w-14 h-14 object-contain flex-shrink-0 [filter:drop-shadow(0_8px_18px_rgba(43,102,217,0.22))]" />
        <div>
          <img src="/nodewarden-wordmark.svg" alt="NodeWarden" className="block h-auto w-[clamp(200px,30vw,360px)] max-w-full [filter:drop-shadow(0_10px_22px_rgba(43,102,217,0.18))]" />
        </div>
      </div>

      <div className="w-full relative bg-panel border border-line rounded-3xl shadow-lg p-7.5 overflow-hidden origin-[50%_24%] animate-surface-enter">
        <h1 className="m-0 mb-1 text-left text-[31px] leading-tight tracking-[-0.035em] font-bold">{props.title}</h1>
        {props.children}
      </div>

      <div className="w-full text-center text-sm text-slate-500">
        <a href="https://github.com/shuaiplus/NodeWarden" target="_blank" rel="noreferrer" className="text-blue-700 font-bold no-underline hover:underline">NodeWarden Repository</a>
        <span> | </span>
        <a href="https://github.com/shuaiplus" target="_blank" rel="noreferrer" className="text-blue-700 font-bold no-underline hover:underline">Author: @shuaiplus</a>
        <span> | </span>
        <span className="font-bold text-blue-700">v{APP_VERSION}</span>
      </div>
    </div>
  );
}
