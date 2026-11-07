import { useState } from "react";

type File = { name: string; lang: string; code: string };

/** Tabbed code viewer for short illustrative snippets. */
export default function CodeTabs({ files, caption }: { files: File[]; caption?: string }) {
  const [active, setActive] = useState(0);
  const file = files[active];
  return (
    <figure className="reveal min-w-0">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-white/10 px-3 pt-3" role="tablist">
          {files.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-t-lg px-4 py-2 font-mono text-xs transition ${
                i === active ? "bg-night/70 text-cyan" : "text-slate-400 hover:text-white"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
        <pre className="max-h-[28rem] overflow-auto bg-night/70 p-5 text-[13px] leading-relaxed text-slate-200">
          <code className={`language-${file.lang}`}>{file.code}</code>
        </pre>
      </div>
      {caption && <figcaption className="mt-3 text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
