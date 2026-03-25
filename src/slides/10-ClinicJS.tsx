export function ClinicJSSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · profiling · real homes-user-service</div>
        <h2 className="mb-8">clinic.js on a real production service</h2>
        <p className="mb-20">
          Ran all three clinic tools against <code style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>homes-user-service</code> — the Fastify API that handles Zoopla user accounts, saved searches, and affordability data.
        </p>

        <div className="flex-col gap-28">

          {/* Step 1: Doctor */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>clinic doctor — start here, it diagnoses and tells you which tool next</div>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
                  NO_INSIGHT=1 clinic doctor --on-port 'autocannon -c 30 -d 10 localhost:$PORT/health' -- node server.js
                </code>
              </div>
            </div>
            <img
              src="/screenshots/hus-clinic-doctor.png"
              alt="clinic doctor report on homes-user-service showing Event Loop Utilization issue"
              style={{ width: '100%', borderRadius: 6, border: '1px solid var(--border2)', display: 'block' }}
            />
            <div style={{ marginTop: 10, padding: '12px 16px', borderLeft: '3px solid var(--red)', background: 'var(--card)' }}>
              <p>
                <strong>Found: Event Loop Utilization issue.</strong>{' '}
                Doctor flagged that the event loop is spending a high % of time busy rather than idle. On{' '}
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>/health</code> this is Zod schema validation running synchronously on every request.
                Doctor recommendation: run <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>clinic flame</code>.
              </p>
            </div>
          </div>

          {/* Step 2: Flame */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>clinic flame — CPU flamegraph, find what's burning cycles</div>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
                  NO_INSIGHT=1 clinic flame --on-port 'autocannon -c 30 -d 8 localhost:$PORT/health' -- node server.js
                </code>
              </div>
            </div>
            <img
              src="/screenshots/hus-clinic-flame.png"
              alt="clinic flame CPU flamegraph for homes-user-service"
              style={{ width: '100%', borderRadius: 6, border: '1px solid var(--border2)', display: 'block', maxHeight: 280, objectFit: 'cover', objectPosition: 'top' }}
            />
            <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--muted)' }}>
              Wide bars = functions burning the most CPU. Click "Application" in the legend to filter out node internals and focus only on your code. The towers on the right are the hot paths — drill in to find the exact function.
            </p>
          </div>

          {/* Step 3: Heapprofiler */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>clinic heapprofiler — what's being allocated?</div>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
                  NO_INSIGHT=1 clinic heapprofiler --on-port 'autocannon -c 20 -d 8 localhost:$PORT/health' -- node server.js
                </code>
              </div>
            </div>
            <img
              src="/screenshots/hus-clinic-heapprofiler.png"
              alt="clinic heapprofiler showing real allocation tree for homes-user-service"
              style={{ width: '100%', borderRadius: 6, border: '1px solid var(--border2)', display: 'block' }}
            />
            <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--muted)' }}>
              Retaining tree sorted by biggest allocation. Real homes-user-service output:{' '}
              <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>fastify/lib/validation.js</code>{' '}
              at the top — Zod schemas allocated per-request instead of compiled once at startup.
            </p>
          </div>

          {/* Step 4: Bubbleprof */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>4</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>clinic bubbleprof — async operation graph</div>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
                  NO_INSIGHT=1 clinic bubbleprof --on-port 'autocannon -c 10 -d 8 localhost:$PORT/health' -- node server.js
                </code>
              </div>
            </div>
            <img
              src="/screenshots/hus-clinic-bubbleprof.png"
              alt="clinic bubbleprof async waterfall visualization for homes-user-service"
              style={{ width: '100%', borderRadius: 6, border: '1px solid var(--border2)', display: 'block' }}
            />
            <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--muted)' }}>
              Each bubble = a group of async operations. Lines = async dependencies. Size = time waiting. Use when CPU is low but the service feels slow — bubbleprof finds the long gaps <em>between</em> operations (e.g. sequential DB calls that could be parallelized).
            </p>
          </div>

          {/* Quick reference */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            {[
              { name: 'clinic doctor', use: 'Always start here. Diagnoses CPU + heap + event loop. Tells you which tool to run next.' },
              { name: 'clinic flame', use: 'CPU high / event loop busy → CPU flamegraph. Find the hot synchronous code paths.' },
              { name: 'clinic heapprofiler', use: 'Heap growing → allocation tree. Find exactly what objects are being created and retained.' },
              { name: 'clinic bubbleprof', use: 'Slow despite low CPU → async waterfall. Find long idle gaps between async operations.' },
            ].map(t => (
              <div key={t.name} className="card" style={{ borderTop: '2px solid var(--border2)' }}>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>{t.name}</code>
                <p style={{ fontSize: '0.88rem' }}>{t.use}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px 16px', background: 'var(--card)', borderRadius: 4, borderLeft: '3px solid var(--border2)' }}>
            <p>
              <strong>Node version:</strong>{' '}clinic requires Node ≤ 22. Use{' '}
              <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>volta pin node@22</code> or{' '}
              <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>nvm use 22</code>.
              Always add <code style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>NO_INSIGHT=1</code> to skip the interactive prompt that hangs non-TTY terminals.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
