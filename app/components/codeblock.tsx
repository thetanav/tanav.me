"use client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useRef, useState } from "react";

const CodeBlock = ({ children, className }: any) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  const copyToClipboard = () => {
    const code = codeRef.current?.textContent || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 z-10 rounded-lg bg-[rgba(255,255,255,0.1)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-[rgba(255,255,255,0.2)] group-hover:opacity-100"
        aria-label="Copy code">
        {copied ? "✓ Copied!" : "Copy"}
      </button>
      <code
        ref={codeRef}
        className={`hljs block bg-transparent p-6 text-sm leading-relaxed ${className}`}>
        {children}
      </code>
    </div>
  );
};

export default CodeBlock;
