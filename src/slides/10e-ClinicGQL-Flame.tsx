export function ClinicGQL4Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 2 of 4</div>
        <h2 className="mb-8">clinic flame - before vs after</h2>
        <p className="mb-20" style={{ maxWidth: 720 }}>
          Doctor said "CPU high - run flame". We did. 60% of all CPU samples were in one place - and it had nothing to do with resolvers.
        </p>

        <div className="grid-2" style={{ gap: 20 }}>

          {/* Before */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ padding: '2px 10px', background: 'var(--red)', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>BEFORE</div>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>hottest frame: <code style={{ fontFamily: 'var(--mono)' }}>dataSources()</code> · 60% · driven by <code style={{ fontFamily: 'var(--mono)' }}>pino</code> · 37%</span>
            </div>
            <img
              src="/screenshots/graphql-clinic-flame-before.png"
              alt="clinic flame before - dataSources consuming 60% of CPU"
              style={{ width: '100%', objectFit: 'contain', borderRadius: 6, border: '2px solid var(--red)', display: 'block' }}
            />
            <div style={{ marginTop: 12, padding: '12px 14px', borderLeft: '3px solid var(--red)', background: 'var(--card)', borderRadius: '0 4px 4px 0' }}>
              <p style={{ fontSize: '0.85rem' }}>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>dataSources()</code> was 60% of CPU - 70 datasource constructors each calling <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>pino().child()</code>. 140 pino calls per request, before a single resolver ran.
              </p>
            </div>
          </div>

          {/* After */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ padding: '2px 10px', background: 'var(--text)', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700, color: 'var(--bg)' }}>AFTER</div>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}><code style={{ fontFamily: 'var(--mono)' }}>dataSources()</code> gone · <code style={{ fontFamily: 'var(--mono)' }}>executeHTTPGraphQLRequest</code> now dominant</span>
            </div>
            <img
              src="/screenshots/graphql-clinic-flame-after.png"
              alt="clinic flame after - dataSources gone, GraphQL execution now visible"
              style={{ width: '100%', objectFit: 'contain', borderRadius: 6, border: '2px solid var(--border2)', display: 'block' }}
            />
            <div style={{ marginTop: 12, padding: '12px 14px', borderLeft: '3px solid var(--border2)', background: 'var(--card)', borderRadius: '0 4px 4px 0' }}>
              <p style={{ fontSize: '0.85rem' }}>
                <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>dataSources()</code> disappeared. <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>executeHTTPGraphQLRequest</code> is now the widest block - actual GraphQL work. The server is doing 7× more requests in the same window.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
