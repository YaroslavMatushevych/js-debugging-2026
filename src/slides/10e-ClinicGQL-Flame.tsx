export function ClinicGQL4Slide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 2 of 4</div>
        <h2 className="mb-8">clinic flame - before</h2>
        <p className="mb-12" style={{ whiteSpace: 'nowrap' }}>
          Doctor said "CPU high - run flame". We did. 60% of all CPU samples were in one place - nothing to do with resolvers.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ padding: '2px 10px', background: 'var(--red)', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>BEFORE</div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>hottest frame: <code style={{ fontFamily: 'var(--mono)' }}>dataSources()</code> · 60% · driven by <code style={{ fontFamily: 'var(--mono)' }}>pino</code> · 37%</span>
        </div>
        <img
          src="/screenshots/graphql-clinic-flame-before.png"
          alt="clinic flame before - dataSources consuming 60% of CPU"
          style={{ width: '100%', height: 520, objectFit: 'fill', borderRadius: 6, border: '2px solid var(--red)', display: 'block' }}
        />
      </div>
    </div>
  );
}

export function ClinicGQL4AfterSlide() {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 03 · clinic.js · step 2 of 4</div>
        <h2 className="mb-8">clinic flame - after</h2>
        <p className="mb-12" style={{ whiteSpace: 'nowrap' }}>
          Doctor said "CPU high - run flame". We did. 60% of all CPU samples were in one place - nothing to do with resolvers.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ padding: '2px 10px', background: 'var(--text)', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700, color: 'var(--bg)' }}>AFTER</div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}><code style={{ fontFamily: 'var(--mono)' }}>dataSources()</code> gone · hottest: <code style={{ fontFamily: 'var(--mono)' }}>pino</code> · 16.7% · actual request logging</span>
        </div>
        <img
          src="/screenshots/graphql-clinic-flame-after.png"
          alt="clinic flame after - dataSources gone, pino now hottest at 16.7%"
          style={{ width: '100%', height: 520, objectFit: 'fill', borderRadius: 6, border: '2px solid var(--border2)', display: 'block' }}
        />
      </div>
    </div>
  );
}
