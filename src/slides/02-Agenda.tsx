export function AgendaSlide() {
  const sections = [
    { num: '01', label: 'Frontend',  title: 'Spotting Unnecessary Re-renders',       tools: ['React Scan', 'why-did-you-render'] },
    { num: '02', label: 'Frontend',  title: 'Memory Leaks in the Browser',           tools: ['Chrome DevTools', 'Heap Snapshots'] },
    { num: '03', label: 'Backend',   title: 'GraphQL Performance & Hidden Waste',    tools: ['OpenTelemetry', 'AWS X-Ray'] },
    { num: '04', label: 'Backend',   title: 'Node.js Memory Leaks & GC Hell',        tools: ['clinic.js', 'autocannon'] },
    { num: '05', label: 'Toolkit',   title: 'Debugging Tools Worth Knowing',         tools: ['Replay.io', '0x', 'Sentry Replay'] },
  ];

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="eyebrow">today</div>
        <h2 className="mb-24">What we're covering</h2>
        <div className="flex-col" style={{ gap: 1 }}>
          {sections.map((s, i) => (
            <div key={s.num} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '16px 0',
              borderBottom: i < sections.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '1.6rem',
                fontWeight: 300,
                color: 'var(--dim)',
                minWidth: 44,
                lineHeight: 1,
              }}>
                {s.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--dim)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text)' }}>{s.title}</div>
              </div>
              <div className="flex gap-6" style={{ flexShrink: 0 }}>
                {s.tools.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, borderLeft: '2px solid var(--border2)', paddingLeft: 16 }}>
          <p style={{ fontSize: '0.88rem' }}>
            <strong>All examples are real</strong>
            <span style={{ color: 'var(--muted)' }}> — production incidents and wins from Zoopla. No made-up demos.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
