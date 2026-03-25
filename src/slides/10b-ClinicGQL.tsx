export function ClinicGQL1Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 04 · clinic.js · real api-graphql-lambda</div>
        <h2 className="mb-8">The problem we were trying to solve</h2>
        <p className="mb-20" style={{ maxWidth: 700 }}>
          <code style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>api-graphql-lambda</code> - Apollo Server sitting between zoopla-web and ~60 upstream REST APIs. Memory usage was high, p99 latency was spiky. Classic GC pressure. We had a hunch but no proof.
        </p>

        <div className="flex-col gap-24">

          {/* The architecture context */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12 }}>What the service does</div>
              <div className="flex-col gap-8">
                {[
                  { icon: '→', text: 'Receives every GraphQL request from zoopla.co.uk' },
                  { icon: '→', text: 'Fans out to ~60 REST APIs (listings, geo, auth, CMS…)' },
                  { icon: '→', text: 'Peak traffic: ~3,000 requests/second' },
                  { icon: '→', text: 'Per request: creates a full context object with all data sources' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>{item.icon}</span>
                    <span style={{ fontSize: '0.95rem' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12 }}>Symptoms we saw in prod</div>
              <div className="flex-col gap-8">
                {[
                  { color: 'var(--red)', label: 'High GC activity', detail: 'Memory sawtooth in dashboards' },
                  { color: 'var(--red)', label: 'Spiky p99 latency', detail: 'Occasional 200–500ms spikes under load' },
                  { color: 'var(--red)', label: 'RSS growing over time', detail: 'Process memory never fully came back down' },
                  { color: 'var(--muted)', label: 'CPU high but unclear why', detail: 'Not obviously slow code - where was the time going?' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '8px 12px', borderLeft: `3px solid ${s.color}`, background: 'var(--card)', borderRadius: '0 4px 4px 0' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{s.label}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: 8 }}>{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What we did */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16 }}>What we did - in order</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { step: '1', label: 'clinic doctor', desc: 'Run first. Gives you a diagnosis + tells you which tool to run next.', color: 'var(--border2)' },
                { step: '2', label: 'clinic flame', desc: 'Doctor said "event loop utilization high" → run flame to see what\'s burning CPU.', color: 'var(--border2)' },
                { step: '3', label: 'Found the cause', desc: 'Flame showed dataSources() at 60% of CPU - driven by pino logger construction. executeHTTPGraphQLRequest was only 8%.', color: 'var(--red)' },
                { step: '4', label: 'Verified + fixed', desc: '67 datasources moved to singletons. pino() created once per request instead of 70×. Ran doctor again to confirm. 9.3× throughput.', color: 'var(--text)' },
              ].map(s => (
                <div key={s.step} className="card" style={{ borderTop: `2px solid ${s.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem', color: s.color === 'var(--text)' ? 'var(--bg)' : '#fff', flexShrink: 0 }}>{s.step}</div>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700 }}>{s.label}</code>
                  </div>
                  <p style={{ fontSize: '0.85rem' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Command to run */}
          <div style={{ padding: '14px 18px', background: 'var(--card)', borderRadius: 6, borderLeft: '3px solid var(--border2)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 8 }}>The command we ran</div>
            <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: 'var(--muted)', display: 'block', lineHeight: 1.8 }}>
              NO_INSIGHT=1 clinic doctor --autocannon [ -c 20 -d 30 -m POST -H "Content-Type: application/json" -b '&#123;"query":"&#123;__typename&#125;"&#125;' http://localhost:4000/graphql ] -- node server.js
            </code>
            <p style={{ fontSize: '0.82rem', marginTop: 8 }}>
              <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>NO_INSIGHT=1</code> skips the interactive prompt.{' '}
              <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>--autocannon</code> runs a load test automatically while clinic records. You get 30 seconds of real traffic, then an HTML report.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
