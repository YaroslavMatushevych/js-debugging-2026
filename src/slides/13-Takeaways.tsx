export function TakeawaysSlide() {
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="slide-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow">key takeaways</div>
        <h2 className="mb-24">What to actually do on Monday</h2>

        <div className="grid-2" style={{ gap: 20 }}>
          <div className="flex-col gap-12">

            <div className="card">
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Frontend</div>
              <ul className="styled">
                <li><strong>React Scan first</strong> — script tag, 30 seconds, instant visual feedback on any app</li>
                <li><strong>WDYR</strong> for surgical diagnosis — shows you prev/next props, finds the exact cause</li>
                <li>Every inline <span className="mono">{'{ }'}</span> in JSX creates a new reference — that's your re-render budget</li>
                <li>Heap Snapshot + "Objects between snapshots" = find any frontend leak in minutes</li>
              </ul>
            </div>

            <div className="card">
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>GraphQL</div>
              <ul className="styled">
                <li><strong>Trace everything.</strong> You can't optimise what you can't see. OpenTelemetry + X-Ray.</li>
                <li>Resolvers should only fetch what the query <em>actually requests</em></li>
                <li>One PR removed 67% of response time on 1M+ URLs. No feature change.</li>
              </ul>
            </div>

          </div>

          <div className="flex-col gap-12">

            <div className="card">
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Node.js memory</div>
              <ul className="styled">
                <li><strong>clinic doctor</strong> first — it tells you which tool to use next, always</li>
                <li>GC overdrive is a symptom. <span className="red">Don't add RAM.</span> Find the leak.</li>
                <li><span className="mono">kill -USR2 &lt;PID&gt;</span> → diagnostic report, zero downtime, built into Node</li>
                <li>Bounded LRU cache (max N entries) — stops heap growth permanently</li>
              </ul>
            </div>

            <div style={{ borderLeft: '2px solid var(--border2)', paddingLeft: 16, paddingTop: 4 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', marginBottom: 10 }}>The meta lesson</div>
              <div className="flex-col gap-8">
                {[
                  'Observability is not a nice-to-have. It\'s how you find bugs that only happen on weekends.',
                  'New tools exist (2023–2024). Spend 30 min with them before the next incident.',
                  'The most impactful fixes are boring: remove unused code, stabilize refs, bound your caches.',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-8">
                    <span style={{ color: 'var(--dim)', flexShrink: 0, marginTop: 2, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>→</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
