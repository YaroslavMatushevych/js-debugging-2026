interface CodeBlockProps {
  filename?: string;
  lang?: string;
  children: string;
}

export function CodeBlock({ filename, lang = 'ts', children }: CodeBlockProps) {
  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot" style={{ background: '#ff5f56' }} />
          <div className="code-dot" style={{ background: '#ffbd2e' }} />
          <div className="code-dot" style={{ background: '#27c93f' }} />
        </div>
        {filename && <span className="dim font-mono" style={{ fontSize: '0.72rem' }}>{filename}</span>}
        {lang && <span className="badge blue">{lang}</span>}
      </div>
      <div className="code-body" dangerouslySetInnerHTML={{ __html: highlight(children, lang) }} />
    </div>
  );
}

interface TerminalProps {
  title?: string;
  lines: Array<{ type: 'prompt' | 'cmd' | 'out' | 'err' | 'hl' | 'info' | 'success' | 'blank'; text: string }>;
}

export function Terminal({ title = 'terminal', lines }: TerminalProps) {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="code-dots">
          <div className="code-dot" style={{ background: '#ff5f56' }} />
          <div className="code-dot" style={{ background: '#ffbd2e' }} />
          <div className="code-dot" style={{ background: '#27c93f' }} />
        </div>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i} className={line.type === 'blank' ? '' : line.type}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// Minimal syntax highlighter
function highlight(code: string, lang: string): string {
  if (lang === 'bash' || lang === 'sh') {
    return highlightBash(code);
  }
  return highlightJS(code);
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightBash(code: string): string {
  return esc(code)
    .replace(/(#.*)/g, '<span style="color:#6e7681">$1</span>')
    .replace(/\b(npm|node|npx|clinic|0x|autocannon|curl|export|cd|ls|cat)\b/g, '<span style="color:#f85149">$1</span>')
    .replace(/"([^"]*)"/g, '<span style="color:#a5d6ff">"$1"</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#79c0ff">$1</span>');
}

function highlightJS(code: string): string {
  return esc(code)
    .replace(/(\/\/.*)/g, '<span style="color:#6e7681;font-style:italic">$1</span>')
    .replace(/\/\*[\s\S]*?\*\//g, (m) => `<span style="color:#6e7681;font-style:italic">${m}</span>`)
    .replace(/'([^']*)'/g, '<span style="color:#a5d6ff">\'$1\'</span>')
    .replace(/"([^"]*)"/g, '<span style="color:#a5d6ff">"$1"</span>')
    .replace(/`([^`]*)`/g, '<span style="color:#a5d6ff">`$1`</span>')
    .replace(/\b(const|let|var|function|return|async|await|import|export|from|default|type|interface|class|extends|implements|new|if|else|for|while|try|catch|finally|throw|of|in)\b/g,
      '<span style="color:#ff7b72">$1</span>')
    .replace(/\b(true|false|null|undefined|void)\b/g, '<span style="color:#79c0ff">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#79c0ff">$1</span>')
    .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span style="color:#ffa657">$1</span>')
    .replace(/\b(console|process|require|module|exports)\b/g, '<span style="color:#d2a8ff">$1</span>');
}
