export function ReRendersImpactSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 01 · zoopla-web · impact</div>
        <h2 className="mb-20">Does it actually matter for real users?</h2>

        <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>

          {/* Left — the chain of impact */}
          <div className="flex-col gap-16">

            <div style={{ padding: '16px 18px', background: 'var(--card)', borderRadius: 8, borderLeft: '3px solid var(--red)' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 12 }}>The chain of impact</div>
              <div className="flex-col gap-10">
                {[
                  { icon: '🔁', label: '100+ unnecessary re-renders', sub: 'on every page load, search results page' },
                  { icon: '↓', label: '', sub: '' },
                  { icon: '⚙️', label: 'Extra JS execution on the main thread', sub: 'each re-render = diffing + DOM reconciliation' },
                  { icon: '↓', label: '', sub: '' },
                  { icon: '🚫', label: 'Main thread blocked', sub: 'Long Tasks (>50ms) delay user interaction' },
                  { icon: '↓', label: '', sub: '' },
                  { icon: '📊', label: 'Worse Core Web Vitals', sub: 'higher TBT → higher INP → Google ranking hit' },
                ].map((row, i) => (
                  row.label === '' ? (
                    <div key={i} style={{ color: 'var(--dim)', fontSize: '1.1rem', textAlign: 'center', lineHeight: 1 }}>↓</div>
                  ) : (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{row.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)' }}>{row.label}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{row.sub}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div style={{ padding: '14px 16px', background: 'rgba(220,38,38,0.05)', borderRadius: 6, borderLeft: '3px solid var(--red)' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>TBT and INP — the metrics that matter</div>
              <ul className="styled">
                <li><strong>TBT</strong> (Total Blocking Time) — total time main thread is blocked &gt;50ms during load. Re-renders directly contribute.</li>
                <li><strong>INP</strong> (Interaction to Next Paint) — how fast the page responds to clicks. Unnecessary renders running during interaction = higher INP.</li>
                <li>Google uses both for search ranking. Zoopla has 1M+ pages indexed.</li>
              </ul>
            </div>

          </div>

          {/* Right — how to verify */}
          <div className="flex-col gap-16">

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dim)', marginBottom: 10 }}>How to verify — Chrome Performance tab</div>
              <div className="steps">
                <div className="step">
                  <div className="step-num">1</div>
                  <div className="step-body">
                    <div className="step-title">Open DevTools → Performance</div>
                    <p>Hit ⏺ Record, load the search results page, stop recording.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">2</div>
                  <div className="step-body">
                    <div className="step-title">Look for Long Tasks (red triangles)</div>
                    <p>Any task &gt;50ms blocks the main thread. Zoom into them — React's reconciler will be visible in the flame chart.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">3</div>
                  <div className="step-body">
                    <div className="step-title">Find React in the flame chart</div>
                    <p>Look for <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>performWorkOnRoot</code> / <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>renderWithHooks</code> — wide bar = too much render work.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">4</div>
                  <div className="step-body">
                    <div className="step-title">Fix → record again → compare TBT</div>
                    <p>After memoizing the context value, the long task shrinks. TBT and INP both improve.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '14px 16px', background: 'rgba(22,163,74,0.06)', borderRadius: 6, borderLeft: '3px solid var(--green)' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>Real answer for zoopla-web search</div>
              <ul className="styled">
                <li className="green">Yes — <strong>100+ extra re-renders on page load</strong> meant React reconciler ran twice as long during the critical load window.</li>
                <li className="green">Fixing <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>UserProvider</code> with <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>useMemo</code> eliminated the cascade — all 20+ ListingSlim cards stopped re-rendering unnecessarily.</li>
                <li>Measurable: reduced Long Task duration on the main thread → lower TBT → better INP score.</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
