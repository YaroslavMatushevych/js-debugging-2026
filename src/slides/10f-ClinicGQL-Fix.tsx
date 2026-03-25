export function ClinicGQL5Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 3 of 4</div>
        <h2 className="mb-8">Root cause - 70 new objects on every request</h2>
        <p className="mb-20" style={{ maxWidth: 720 }}>
          Once we saw the flame graph, the root cause was obvious. The fix was a one-liner.
        </p>

        <div className="flex-col gap-24">

          {/* Code side by side */}
          <div className="grid-2" style={{ gap: 20, alignItems: 'start' }}>

            {/* BEFORE */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 10 }}>Before - dataSources() called on every request</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#e6edf3', lineHeight: 1.9 }}>
                <div style={{ color: '#8b949e' }}>{'// contextFn - runs on every POST /graphql'}</div>
                <div><span style={{ color: '#79c0ff' }}>async function</span> <span style={{ color: '#d2a8ff' }}>contextFn</span>(req) {'{'}</div>
                <div style={{ paddingLeft: 18, color: '#f85149' }}>return {'{ dataSources: dataSources() }'}</div>
                <div>{'}'}</div>
                <div style={{ marginTop: 12, color: '#8b949e' }}>{'// every request: 70 new instances + 140 pino() calls'}</div>
                <div><span style={{ color: '#79c0ff' }}>function</span> <span style={{ color: '#d2a8ff' }}>dataSources</span>() {'{'}</div>
                <div style={{ paddingLeft: 18 }}>return {'{'}</div>
                <div style={{ paddingLeft: 36, color: '#f85149' }}>addressAPI: <span style={{ color: '#7ee787' }}>new</span> AddressDataAPI(),</div>
                <div style={{ paddingLeft: 36, color: '#f85149' }}>estimatesAPI: <span style={{ color: '#7ee787' }}>new</span> PropertyEstimatesAPI(),</div>
                <div style={{ paddingLeft: 36, color: '#8b949e' }}>{'// ... 68 more'}</div>
                <div style={{ paddingLeft: 18 }}>{'}'}</div>
                <div>{'}'}</div>
              </div>
              <div style={{ marginTop: 10, padding: '12px 14px', borderLeft: '3px solid var(--red)', background: 'var(--card)', borderRadius: '0 4px 4px 0' }}>
                <p style={{ fontSize: '0.85rem' }}>
                  Each constructor calls <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>getLogger()</code> → <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>pino().child()</code>. 70 datasources × 2 pino ops = <strong>140 pino calls per request</strong> - before a single resolver ran.
                </p>
              </div>
            </div>

            {/* AFTER */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: 10 }}>After - two changes, branch: fix/singleton-datasources-memory-leak</div>
              <div style={{ background: '#161b22', borderRadius: 6, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#e6edf3', lineHeight: 1.9 }}>
                <div style={{ color: '#8b949e' }}>{'// fix 1: 67 singletons at module level (once at startup)'}</div>
                <div style={{ color: '#7ee787' }}>const sharedSources = dataSources();</div>
                <div style={{ marginTop: 10, color: '#8b949e' }}>{'// fix 2: pino() once per request, not 70×'}</div>
                <div><span style={{ color: '#79c0ff' }}>async function</span> <span style={{ color: '#d2a8ff' }}>contextFn</span>(req) {'{'}</div>
                <div style={{ paddingLeft: 18, color: '#7ee787' }}>const logger = pino().child(requestBindings);</div>
                <div style={{ paddingLeft: 18, color: '#8b949e' }}>{'// singletons read it via AsyncLocalStorage'}</div>
                <div style={{ paddingLeft: 18, color: '#7ee787' }}>return {'{ dataSources: sharedSources }'}</div>
                <div>{'}'}</div>
              </div>
              <div style={{ marginTop: 10, padding: '12px 14px', borderLeft: '3px solid var(--text)', background: 'var(--card)', borderRadius: '0 4px 4px 0' }}>
                <p style={{ fontSize: '0.85rem', marginBottom: 6 }}>
                  3 datasources stay per-request: <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>BaseListing</code>, <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>PropertyIdMappingAPI</code>, <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>UserProfileV2API</code> - each creates a DataLoader in its constructor. DataLoader caches per instance, wrong as a singleton.
                </p>
                <p style={{ fontSize: '0.85rem' }}>
                  Singletons get <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>requestId</code>/<code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>traceId</code> via <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>AsyncLocalStorage</code> - no race condition, no method signature changes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
