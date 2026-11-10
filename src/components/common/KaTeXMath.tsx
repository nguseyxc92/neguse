import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      return `<code class="text-xs font-mono text-cyan-400">${math}</code>`;
    }
  }, [math, block]);

  return (
    <span
      className={`inline-block font-sans ${block ? 'my-2 w-full text-center overflow-x-auto py-1' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
