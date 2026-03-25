export function XRaySlide() {
  // Realistic X-Ray trace: zoopla-web → graphql-lambda → upstream APIs
  // Span names match OTel instrumentation-undici (semconv v1.24: just "GET"/"POST")
  // Sequential calls: addressSearch (80ms) → fetchEstimates (1200ms) → fetchTrackedProperties (380ms)
  // Total: ~1800ms
  const rows: {
    name: string;
    sub?: string;        // hostname shown as secondary label (from url.full attr)
    resource?: string;   // AWS resource type badge
    http: string;
    dur: string;
    barStart: number;    // % offset
    barWidth: number;    // % of 1800ms
    indent: number;
    hot?: boolean;
    separator?: boolean;
  }[] = [
    { name: 'zoopla-web',         resource: 'AWS::ECS::EC2', http: '200', dur: '1.80s', barStart: 0,  barWidth: 100, indent: 0 },
    { name: 'POST',               sub: 'graphql-lambda.zoopla.co.uk', http: '200', dur: '1.75s', barStart: 1,  barWidth: 97,  indent: 1 },
    { name: 'graphql-lambda',     resource: 'AWS::Lambda::Function', http: '200', dur: '1.75s', barStart: 1,  barWidth: 97,  indent: 0, separator: true },
    { name: 'Initialization',     http: '-',   dur: '12ms',   barStart: 1,  barWidth: 1,   indent: 1 },
    { name: 'Invocation',         http: '-',   dur: '1.72s',  barStart: 2,  barWidth: 96,  indent: 1 },
    { name: '## resolveHousePrices', http: '200', dur: '1.71s', barStart: 2, barWidth: 95, indent: 2 },
    { name: 'GET',                sub: 'address-search.api.zoopla.co.uk', http: '200', dur: '80ms',   barStart: 2,  barWidth: 4,   indent: 3 },
    { name: 'GET',                sub: 'historical-estimates.api.zoopla.co.uk', http: '200', dur: '1.20s', barStart: 6,  barWidth: 67,  indent: 3, hot: true },
    { name: 'GET',                sub: 'tracked-properties.api.zoopla.co.uk',   http: '200', dur: '380ms', barStart: 74, barWidth: 21,  indent: 3 },
  ];

  const AWS_BLUE = '#0073bb';

  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="section-label">part 02 · backend graphql</div>
        <h2 className="mb-8">This is what you see in X-Ray</h2>
        <div className="eyebrow mb-16">
          Click any <code style={{ fontFamily: 'var(--mono)' }}>GET</code> span → full URL, request headers, response code. That's how <code style={{ fontFamily: 'var(--mono)' }}>historical-estimates.api.zoopla.co.uk</code> was found.
        </div>

        {/* X-Ray table */}
        <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #d1d5da', fontSize: '0.78rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#16191f' }}>

          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 58px 46px 72px 1fr',
            background: '#f2f3f3', borderBottom: '1px solid #d5dbdb',
            padding: '6px 12px', fontWeight: 700, fontSize: '0.72rem',
            color: '#545b64', gap: 8, textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            <span>Segment / Subsegment</span>
            <span>Status</span>
            <span>HTTP</span>
            <span>Duration</span>
            <span style={{ paddingLeft: 4 }}>Timeline · 1.80s</span>
          </div>

          {rows.map((row, i) => (
            <div key={i}>
              {/* Service separator header */}
              {row.separator && (
                <div style={{ background: '#f8f8f8', borderTop: '1px solid #eaecef', borderBottom: '1px solid #eaecef', padding: '4px 12px', fontSize: '0.7rem', color: '#545b64', fontWeight: 600 }}>
                  ▾ &nbsp;{row.name} &nbsp;
                  <span style={{ background: '#e8f4fd', color: '#0073bb', border: '1px solid #a9d5f5', borderRadius: 3, padding: '1px 6px', fontSize: '0.65rem' }}>{row.resource}</span>
                </div>
              )}

              {!row.separator && (
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 58px 46px 72px 1fr',
                  padding: '5px 12px', borderBottom: i < rows.length - 1 ? '1px solid #edf0f0' : 'none',
                  alignItems: 'center', gap: 8,
                  background: row.hot ? '#fef9f0' : '#fff',
                }}>
                  {/* Name */}
                  <div style={{ paddingLeft: row.indent * 14, display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                    {row.indent > 0 && <span style={{ color: '#aab7b8', fontSize: '0.68rem', marginTop: 2, flexShrink: 0 }}>└─</span>}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: row.hot ? 700 : 500, color: '#16191f', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.name}</span>
                        {row.resource && !row.separator && (
                          <span style={{ background: '#e8f4fd', color: '#0073bb', border: '1px solid #a9d5f5', borderRadius: 3, padding: '1px 5px', fontSize: '0.65rem' }}>{row.resource}</span>
                        )}
                      </div>
                      {row.sub && (
                        <div style={{ fontSize: '0.68rem', color: row.hot ? '#d45b07' : '#687078', marginTop: 1, fontFamily: 'monospace' }}>{row.sub}</div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#1d8348', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', color: '#1d8348', fontWeight: 600 }}>OK</span>
                  </div>

                  {/* HTTP */}
                  <span style={{ fontSize: '0.75rem', color: '#545b64', fontFamily: 'monospace' }}>{row.http}</span>

                  {/* Duration */}
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: row.hot ? '#d45b07' : '#16191f', fontWeight: row.hot ? 700 : 400 }}>{row.dur}</span>

                  {/* Bar */}
                  <div style={{ position: 'relative', height: 16, background: '#f2f3f3', borderRadius: 2, overflow: 'visible' }}>
                    <div style={{
                      position: 'absolute',
                      left: `${row.barStart}%`,
                      width: `max(${row.barWidth}%, 2px)`,
                      height: '100%',
                      background: row.hot ? '#e07515' : AWS_BLUE,
                      borderRadius: 2,
                      opacity: 0.85,
                    }} />
                    {row.hot && (
                      <span style={{ position: 'absolute', left: `${row.barStart + row.barWidth + 0.5}%`, top: 1, fontSize: '0.65rem', color: '#d45b07', fontWeight: 700, whiteSpace: 'nowrap' }}>← 67% of request</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
