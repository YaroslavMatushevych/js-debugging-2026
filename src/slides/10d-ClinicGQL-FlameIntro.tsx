export function ClinicGQL3Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 3 of 5</div>
        <h2 className="mb-8">How to read a flame graph</h2>
        <p className="mb-20" style={{ maxWidth: 700 }}>
          Most people see a flame graph and have no idea where to look. Here's the mental model - it takes 2 minutes to get.
        </p>

        <div className="flex-col gap-20">

          {/* Visual explanation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

            {/* Left: What it is */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 14 }}>What you're looking at</div>
              <div className="flex-col gap-10">
                {[
                  {
                    rule: 'X axis = time (CPU samples)',
                    detail: 'Each sample is a snapshot of what\'s running. The wider a bar, the more CPU samples were captured for that function - i.e. more time spent there.'
                  },
                  {
                    rule: 'Y axis = call stack depth',
                    detail: 'Bottom = entry points (HTTP handler, event loop tick). Top = the actual leaf function doing the work. Taller towers = deeper call chains.'
                  },
                  {
                    rule: 'Wide bars at the top = hot spots',
                    detail: 'If a function near the top is wide, it\'s burning CPU directly. If a function near the bottom is wide, it\'s because everything it calls is busy.'
                  },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--border2)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 4 }}>{item.rule}</div>
                    <p style={{ fontSize: '0.82rem' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ASCII diagram */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 14 }}>A simplified example</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.78rem', color: '#e6edf3', lineHeight: 1.7 }}>
                <div style={{ color: '#8b949e', marginBottom: 8 }}>{'← X axis: CPU time →'}</div>
                {/* "stack frames" as colored rows */}
                {[
                  { label: 'logsomething()         ', bg: '#f85149', pct: '28%', note: '← hot! wide = most CPU here' },
                  { label: 'processRequest()       ', bg: '#e3b341', pct: '42%', note: '' },
                  { label: 'handleRoute()          ', bg: '#7ee787', pct: '60%', note: '' },
                  { label: 'expressMiddleware()    ', bg: '#388bfd', pct: '80%', note: '' },
                  { label: 'httpServer.emit()      ', bg: '#8b949e', pct: '95%', note: '' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <div style={{ width: row.pct, height: 18, background: row.bg, borderRadius: 2, flexShrink: 0, minWidth: 40 }} />
                    <span style={{ color: '#8b949e', fontSize: '0.72rem' }}>{row.note}</span>
                  </div>
                ))}
                <div style={{ color: '#8b949e', marginTop: 10, fontSize: '0.75rem' }}>
                  ↑ bottom = entry point &nbsp;&nbsp; top = leaf function
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', marginTop: 10, color: 'var(--muted)' }}>
                In this example, <code style={{ fontFamily: 'var(--mono)' }}>logsomething()</code> is the hottest leaf - it's where the CPU is actually spending time. Everything below it is just the call chain to get there.
              </p>
            </div>

          </div>

          {/* Tips row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {[
              {
                tip: 'Filter to "Application"',
                detail: 'Click "Application" in the legend. This hides Node.js internals and npm packages - shows only your code. Much less noise.',
                color: 'var(--border2)'
              },
              {
                tip: 'Ignore tall-but-narrow towers',
                detail: 'A deep call stack that\'s narrow means it\'s fast. You care about wide, not tall. Wide = time. Tall = complex but potentially fine.',
                color: 'var(--border2)'
              },
              {
                tip: 'Suspicious: infra code in the hot path',
                detail: 'If a framework cleanup hook or a logger is the hottest frame, something is wrong upstream. The real work should dominate.',
                color: 'var(--red)'
              },
            ].map(t => (
              <div key={t.tip} style={{ padding: '12px 14px', background: 'var(--card)', borderRadius: 6, borderTop: `2px solid ${t.color}` }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6 }}>{t.tip}</div>
                <p style={{ fontSize: '0.82rem' }}>{t.detail}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px 16px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--red)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🔥</span>
            <p style={{ fontSize: '0.88rem' }}>
              <strong>The one question to ask:</strong> "what is the widest bar at the top of the flame graph?" That function is consuming the most CPU. If it's infrastructure (cleanup, logger, framework internals), it means your app is creating a lot of objects and those objects are triggering cleanup work. The fix is usually to create fewer objects.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
