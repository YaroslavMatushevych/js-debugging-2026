export function ConsoleLogsSlide() {
  const methods = [
    { method: 'console.log',        color: '#e6edf3', output: 'user clicked button',                     note: 'the classic' },
    { method: 'console.warn',       color: '#e3b341', output: 'cache miss — falling back to DB',         note: 'yellow in devtools' },
    { method: 'console.error',      color: '#f85149', output: 'failed to parse response',                note: 'red + stack trace' },
    { method: 'console.info',       color: '#79c0ff', output: 'server started on :4000',                 note: 'same as log, styled differently' },
    { method: 'console.table',      color: '#7ee787', output: '[{ id: 1, name: "Alice" }, ...]',         note: 'renders objects as a table' },
    { method: 'console.time',       color: '#d2a8ff', output: 'fetchUser: 42.3ms',                       note: 'measure how long something takes' },
    { method: 'console.group',      color: '#ffa657', output: '▼ request /api/users  ↳ auth  ↳ query',  note: 'collapsible group in devtools' },
    { method: 'console.trace',      color: '#8b949e', output: 'Trace: at render  at App  at root',       note: 'prints the full call stack' },
  ];

  return (
    <div className="slide">
      <div className="slide-inner">
        <h2 className="mb-20"><code style={{ fontFamily: 'var(--mono)', fontSize: '0.85em' }}>console.log</code> is the perfect tool for most day-to-day cases.</h2>

        <div style={{ background: '#161b22', borderRadius: 8, padding: '16px 20px', fontFamily: 'var(--mono)', fontSize: '0.8rem', lineHeight: 2, color: '#e6edf3' }}>
          {methods.map(({ method, color, output, note }) => (
            <div key={method} style={{ display: 'flex', gap: 0, alignItems: 'baseline' }}>
              <span style={{ color: '#d2a8ff' }}>console</span>
              <span style={{ color: '#e6edf3' }}>.</span>
              <span style={{ color: color, fontWeight: 600 }}>{method.replace('console.', '')}</span>
              <span style={{ color: '#e6edf3' }}>{'('}</span>
              <span style={{ color: '#a5d6ff' }}>'{output}'</span>
              <span style={{ color: '#e6edf3' }}>{')'}</span>
              <span style={{ color: '#6e7681', fontSize: '0.8rem', marginLeft: 12 }}>// {note}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
